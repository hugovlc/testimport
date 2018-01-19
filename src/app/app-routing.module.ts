import { RequestsListComponent } from './requests/requests-list/requests-list.component';
import { NgModule } from '@angular/core';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CustomersListComponent } from './customers/customers-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CustomersListComponent },
  { path: 'requests', component: RequestsListComponent },
  { path: 'customer-list', component: CustomersListComponent },
  { path: 'customer-detail/:customerId', component: CustomerDetailComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
