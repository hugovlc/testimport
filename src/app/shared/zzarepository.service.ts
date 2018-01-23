import { Order } from './../model.zza/order';
import { Customer } from './../model.zza/entity-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EntityManager, EntityQuery, Predicate, FilterQueryOp, FetchStrategySymbol, FetchStrategy, Entity, core } from 'breeze-client';
import { RegistrationHelper } from '../model/registration-helper';
import { OrderStatus } from '../model.zza/order-status';
import { Product } from '../model.zza/product';
import { ProductSize } from '../model.zza/product-size';

@Injectable()
export class ZzaRepositoryService {
  //  private _em: EntityManager = new EntityManager('http://localhost:2113/breeze/zza');
  private _em: EntityManager = new EntityManager('http://zzaapi.azurewebsites.net/breeze/zza');
  private _customerCached: boolean;
  private _initialized: boolean;

  constructor() {
    RegistrationHelper.register(this._em.metadataStore);
    this._em.entityChanged.subscribe(args => {
      let changes = this._em.getChanges();
      let chStr = this._em.exportEntities(changes);
      localStorage['changeCache'] = chStr;
    });
  }

  initialize() {
    let promise = new Promise<boolean>((resolve, reject) => {
      if (this._initialized) {
        resolve(true);
      } else {
        this._initialized = true;
        let existingChanges = localStorage['changeCache'];
        if (existingChanges){
          this._em.importEntities(existingChanges);
          localStorage.removeItem('changeCache');
        }
        // this._em.fetchMetadata().then(_ => {
        //   resolve(true);
        // }, error => console.error(error));
        this._em.executeQuery(EntityQuery.from('Lookups')).then(lookupsResponse => {
          resolve(true);
        }, error => console.error(error));
      }
    });
    return promise;
  }

  getOrderStatuses(): OrderStatus[] {
    return this._em.executeQueryLocally(EntityQuery.from("OrderStatuses")) as OrderStatus[];
  }
  getProductSizes(productType: string): ProductSize[] {
    return this._em.executeQueryLocally(EntityQuery.from("ProductSizes").where("type", "equals", productType)) as ProductSize[];
  }

  getProducts(): Promise<Product[]> {
    let promise = new Promise<Product[]>((resolve, reject) => {
      let query = EntityQuery.from("Products");
      let products = this._em.executeQueryLocally(query) as Product[];
      if (products && products.length > 0) {
        resolve(products);
        return;
      }
      this._em.executeQuery(query).then(response => {
        resolve(response.results as Product[]);
      }, error => reject(error));
    });
    return promise;
  }

  createEntity(entityType: string): Entity {
    let options: any = {};
    if (entityType === 'Customer') {
      options.id = core.getUuid();
      console.log(options.id);
    }
    return this._em.createEntity(entityType, options);
  }

  getCustomers(page: number, pageSize: number): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
      // resolve(customers);
      let query = EntityQuery.from('Customers')
        .orderBy(['state', 'lastName'])
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .inlineCount();

      this._em.executeQuery(query).then(queryResult => {
        this._customerCached = true;
        resolve({ customers: queryResult.results, totalRecords: queryResult.inlineCount })
      },
        error => reject(error));
    });
    return promise;
  }

  getCustomer(id: string): Promise<Customer> {
    let promise = new Promise((resolve, reject) => {
      let query = EntityQuery.from('Customers').where('id', '==', id);
      let strategy: FetchStrategySymbol;
      if (!this._customerCached) {
        strategy = FetchStrategy.FromServer;
      } else {
        strategy = FetchStrategy.FromLocalCache;
      }
      this._em.executeQuery(query.using(strategy)).then(response => {
        if (response.results && response.results.length == 1) {
          resolve(response.results[0]);
        } else {
          resolve(null);
        }
      }, error => reject(error));
    });
    return promise as Promise<Customer>;
  }

  getCustomerOrderHistory(customerId: string): Promise<Order[]> {
    let promise = new Promise((resolve, reject) => {
      let query = EntityQuery.from('Orders')
        .where('customerId', FilterQueryOp.Equals, customerId)
        .expand(['items', 'items.product', 'items.options']);
      this._em.executeQuery(query).then(queryResults => {
        resolve(queryResults.results);
      }, error => reject(error));
    });
    return promise as Promise<Order[]>;
  }

  deleteCustomer(customer: Customer): Promise<void> {
    return this.getCustomerOrderHistory(customer.id).then(orders => {
      orders.slice().forEach(o => {
        o.items.slice().forEach(oi => {
          oi.options.slice().forEach(opt => opt.entityAspect.setDeleted());
        });
        o.entityAspect.setDeleted();
      });
      customer.entityAspect.setDeleted();
    });
  }

  saveChanges() {
    let promise = new Promise((resolve, reject) => {
      this._em.saveChanges().then(() => resolve(),
        error => reject(error));
    });
    return promise;
  }

  search(searchTerm: string, field: string) {
    let pred: Predicate;
    if (field === 'name') {
      pred = new Predicate('firstName', FilterQueryOp.Contains, searchTerm)
        .or(new Predicate('lastName', FilterQueryOp.Contains, searchTerm));
    } else {
      pred = new Predicate(field, FilterQueryOp.Contains, searchTerm);
      let query = EntityQuery.from('Customers').where(pred);

      return this._em.executeQueryLocally(query);
    }
  }

  searchAsync(searchTerm: string, field: string): Promise<Customer[]> {
    let promise = new Promise((resolve, reject) => {
      let pred: Predicate;
      if (field === 'name') {
        pred = new Predicate('firstName', FilterQueryOp.Contains, searchTerm)
          .or(new Predicate('lastName', FilterQueryOp.Contains, searchTerm));
      } else {
        pred = new Predicate(field, FilterQueryOp.Contains, searchTerm);
      }
      let query = EntityQuery.from('Customers').where(pred);
      this._em.executeQuery(query)
        .then(queryResult => resolve(queryResult.results),
        error => reject(error));
    });
    return promise as Promise<Customer[]>;
  }

  submitOrder(order: Order): Promise<void> {
    let  promise = new Promise<void>((resolve, reject) => {
      let  items: Array<any> = [order];
      order.items.forEach(oi => items.push(oi));
      this._em.saveChanges(items).then(_ => resolve(), error => console.error(error));
    });
    return promise;
  }

  private getCustomerDummyData(): Customer[] {
    let cust1 = new Customer();
    cust1.firstName = 'Fred';
    cust1.lastName = 'Flintstone';
    let cust2 = new Customer();
    cust2.firstName = 'Barney';
    cust2.lastName = 'Rubble';
    let customers: Customer[] = [cust1, cust2];
    return customers;
  }
}
