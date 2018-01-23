import { CanDeactivateGuard } from './shared/can-deactivate-guard';
import { InitGuard } from './shared/init-guard';
import { RequestsListComponent } from './requests/requests-list/requests-list.component';
import { NgModule } from '@angular/core';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CustomersListComponent } from './customers/customers-list.component';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  {
    path: '', canActivateChild: [InitGuard], children: [
      { path: '', component: CustomersListComponent },
      { path: 'requests', component: RequestsListComponent },
      { path: 'customer-list', component: CustomersListComponent },
      { path: 'customer-detail/:customerId', component: CustomerDetailComponent },
      { path: 'customer-add', component: CustomerDetailComponent },
      {path: 'order/:customerId', component: OrderComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
