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
  public customer: Customer = new Customer();
  public errorMessage: string;
  public isEditMode: boolean;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _zzaRepository: ZzaRepositoryService) { }

  orders: Order[];

  ngOnInit() {
    if (this._route.routeConfig.path != "customer-add") {
      this.isEditMode = true;
      let id = this._route.snapshot.params['customerId'];
      this._zzaRepository.getCustomer(id).then(customer => {
        this.customer = customer;
        this._zzaRepository.getCustomerOrderHistory(id).then(orders => this.orders = orders);
      }, error => {
        this.errorMessage = error.message;
      });
    }else{
      this.customer = <Customer>this._zzaRepository.createEntity('Customer');
    }
  }

  onSave() {
    this._zzaRepository.saveChanges().then(() => {
      this._router.navigate(['customer-list']);
    }, error => {
      this.errorMessage = error.message;
    });
  }

}
