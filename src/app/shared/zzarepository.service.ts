import { Order } from './../model.zza/order';
import { Customer } from './../model.zza/entity-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EntityManager, EntityQuery, Predicate, FilterQueryOp } from 'breeze-client';
import { RegistrationHelper } from '../model/registration-helper';



@Injectable()
 export class ZzaRepositoryService {
  //  private _em: EntityManager = new EntityManager('http://localhost:2113/breeze/zza');
  private _em: EntityManager = new EntityManager('http://zzaapi.azurewebsites.net/breeze/zza');

  constructor() {
    RegistrationHelper.register(this._em.metadataStore);
  }

  getCustomers(page: number, pageSize: number): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
      // let customers = this.getCustomerDummyData();
      // resolve(customers);
      let query = EntityQuery.from('Customers')
        .orderBy(['state', 'lastName'])
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .inlineCount();

      this._em.executeQuery(query).then(queryResult => {
        resolve({ customers: queryResult.results, totalRecords: queryResult.inlineCount })
      },
        error => reject(error));
    });
    return promise;
  }

  getCustomer(id: string): Promise<Customer> {
    let promise = new Promise((resolve, reject) => {
      let query = EntityQuery.from('Customers').where('id', '==', id);
      if (!this._em.metadataStore.isEmpty()) {
        let customers = this._em.executeQueryLocally(query);
        if (customers && customers.length == 1) {
          resolve(customers[0]);
          return;
        }
      }
      this._em.executeQuery(query).then(response => {
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
        .expand(['items', 'items.product']);
      this._em.executeQuery(query).then(queryResults => {
        resolve(queryResults.results);
      }, error => reject(error));
    });
    return promise as Promise<Order[]>;
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
