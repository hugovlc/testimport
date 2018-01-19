import { Customer } from './../../model.zza/customer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'zza-customers-list-item',
  templateUrl: './customers-list-item.component.html',
  styleUrls: ['./customers-list-item.component.scss']
})
export class CustomersListItemComponent implements OnInit {
  private isSelected: boolean;

  constructor() { }

  @Input()
  public customer: Customer;

  @Input()
  public set selectedCustomer(value: Customer) {
    if (value === this.customer) {
      this.isSelected = true;
    }
    else {
      this.isSelected = false;
    }
  }

  ngOnInit() {
  }

}
