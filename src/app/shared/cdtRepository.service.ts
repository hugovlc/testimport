import { Status } from './../model/status';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Request } from './../model/entity-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EntityManager, EntityQuery, Predicate, FilterQueryOp } from 'breeze-client';
import { RegistrationHelper } from '../model/registration-helper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client';


export abstract class BaseRepositoryService extends BehaviorSubject<GridDataResult> {
  protected _em: EntityManager = new EntityManager('https://localhost/webapi/breeze/eai/');
  private _initialized: boolean;

  constructor(
    private http: HttpClient,
    protected tableName: string
  ) {
    super(null);
    RegistrationHelper.register(this._em.metadataStore);
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

  public query(state: any): void {
    this.fetch(this.tableName, state)
      .subscribe(x => super.next(x));
  }

  protected fetch(tableName: string, state: any): Observable<GridDataResult> {
    let promise = new Promise<any>((resolve, reject) => {
      let query = EntityQuery.from('Requests');
      let orderBy = '';
      //query = query.orderBy('lastName desc, firstName');

      if (state.filter) {
        var p: Predicate[] = new Array();

        state.filter.filters.forEach((f) => {
          p.push(Predicate.and(new Predicate(f.field, f.operator, f.value)));
        });

        query = query.where(p);
      }

      query = query.expand('status, department, client, sourceMaterials.jobs.priority, sourceMaterials.jobs.service.unit,  sourceMaterials.jobs.jobStatus,  purpose, referenceSet.references, requestContacts.contact');

      query = query.skip(state.skip).take(state.take).inlineCount();

      this._em.executeQuery(query).then(queryResult => {
        resolve({ requests: queryResult.results, totalRecords: queryResult.inlineCount })
      },
        error => reject(error));
    });
    return Observable.fromPromise(promise).map(response => (<GridDataResult>{
      data: response['requests'],
      total: response['totalRecords']
    }));
  }
}

@Injectable()
export class CdtRepositoryService extends BaseRepositoryService {

  constructor(http: HttpClient) {
    super(http, 'Requests');
  }

  getStatuses(): Status[] {
    return this._em.executeQueryLocally(EntityQuery.from("Statuss")) as Status[];
  }

  getClients(): Client[] {
    return this._em.executeQueryLocally(EntityQuery.from("Clients")) as Client[];
  }
}
