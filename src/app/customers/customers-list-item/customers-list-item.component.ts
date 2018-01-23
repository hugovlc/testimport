import { ZzaRepositoryService } from './../../shared/zzarepository.service';
import { Customer } from './../../model.zza/customer';
import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'zza-customers-list-item',
  templateUrl: './customers-list-item.component.html',
  styleUrls: ['./customers-list-item.component.scss']
})
export class CustomersListItemComponent implements OnInit {
  private isSelected: boolean;

  constructor(private _zzaRepository: ZzaRepositoryService) { }

  @ViewChild('deleteModal')
  public deleteModal: ModalDirective

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

  @Output()
  public deleted = new EventEmitter<void>();

  ngOnInit() {
  }

  deleteCustomer() {
    this.deleteModal.show();
  }

  confirmDeleteCustomer() {
    this.deleteModal.hide();
    this._zzaRepository.deleteCustomer(this.customer).then(_ => {
      this._zzaRepository.saveChanges().then(_ => this.deleted.emit(), error => console.error(error));
    });
  }
}
