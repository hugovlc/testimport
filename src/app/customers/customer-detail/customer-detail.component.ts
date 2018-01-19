import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../model.zza/entity-model';
import { ZzaRepositoryService } from '../../shared/zzarepository.service';
import { Order } from '../../model.zza/order';

@Component({
  selector: 'zza-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  private customer: Customer = new Customer();
  private errorMessage: string;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _zzaRepository: ZzaRepositoryService) { }

    orders: Order[];

  ngOnInit() {
    let id = this._route.snapshot.params['customerId'];
    this._zzaRepository.getCustomer(id).then(customer => {
      this.customer = customer;
      this._zzaRepository.getCustomerOrderHistory(id).then(orders => this.orders = orders);
    }, error => {
      this.errorMessage = error.message;
    });
  }

  onSave(){
    this._zzaRepository.saveChanges().then(() =>{
      this._router.navigate(['customer-list']);
    }, error => {
      this.errorMessage = error.message;
    });
  }

}
