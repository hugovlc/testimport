import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Customer } from '../model.zza/entity-model';
import { ZzaRepositoryService } from '../shared/zzarepository.service';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ZzaRepositoryTelerikService } from '../shared/zzarepository-telerik.service';

@Component({
  selector: 'zza-customers-list',
  templateUrl: './customers-list.component.html'
})

export class CustomersListComponent implements OnInit {
  private selectedCustomer: Customer;
  private searchField: string = 'name';
  private searchInput: string;
  private currentPage: number = 1;
  private pageCount: number;
  private _totalRecords: number;
  private _pageSize: number = 5;


  /* KENDO GRID */
  public view: Observable<GridDataResult>;
  public state: State = {
    skip: 0,
    take: 5
  };

  // public dataStateChange(state: DataStateChangeEvent): void {
  //   this.state = state;
  //   this._zzaRepository.query(state);
  // }
  // /* KENDO GRID */


  // constructor(private _zzaRepository: ZzaRepositoryTelerikService) {
  //   this.view = _zzaRepository;
  //   this._zzaRepository.query(this.state);

  //   // private elementRef: ElementRef) {
  //   // const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
  //   //   .map(() => this.searchInput)
  //   //   .debounceTime(500)
  //   //   .distinctUntilChanged();
  //   // eventStream.subscribe(input => this.search(input));
  // }

  // customers: Customer[];
  ngOnInit() {
    //this._zzaRepository.query(state);
  }

  // pageUp() {
  //   if (this.currentPage * this._pageSize >= this._totalRecords) return;
  //   let newPage = this.currentPage + 1;
  //   this._zzaRepository.getCustomers(newPage, this._pageSize).then(result => {
  //     this.customers = result.customers;
  //     this.currentPage = newPage;
  //   }, error => console.error(error));
  // }

  // pageDown() {
  //   if (this.currentPage == 1) return;
  //   let newPage = this.currentPage - 1;
  //   this._zzaRepository.getCustomers(newPage, this._pageSize).then(result => {
  //     this.customers = result.customers;
  //     this.currentPage = newPage;
  //   }, error => console.error(error));
  // }

  // save() {
  //   this._zzaRepository.saveChanges().then(() => {
  //     this.ngOnInit()
  //   }, error => console.error(error));
  // }

  // onSelect(customer: Customer) {
  //   this.selectedCustomer = customer;
  // }

  // search(value) {
  //   this._zzaRepository.searchAsync(value, this.searchField).then(customers => {
  //     this.customers = customers;
  //   });
  // }
}
