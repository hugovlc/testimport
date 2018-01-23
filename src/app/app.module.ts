import { RequestsModule } from './requests/requests.module';
import { CanDeactivateGuard } from './shared/can-deactivate-guard';
import { InitGuard } from './shared/init-guard';
import { CdtRepositoryService } from './shared/cdtRepository.service';
import { OrderItemsConcatProductsPipe } from './shared/order-items-concat-products.pipe';
import { AppRoutingModule } from './app-routing.module';
import { CustomersListComponent } from './customers/customers-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from 'ngx-bootstrap';
import { BreezeBridgeAngularModule } from 'breeze-bridge-angular';
import { NamingConvention } from 'breeze-client';

import { AppComponent } from './app.component';
import { ZzaRepositoryService } from './shared/zzarepository.service';
import { CustomersListItemComponent } from './customers/customers-list-item/customers-list-item.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { ZzaRepositoryTelerikService } from './shared/zzarepository-telerik.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './orders/order/order.component';
import { ProductListComponent } from './orders/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    CustomersListItemComponent,
    CustomerDetailComponent,
    OrderItemsConcatProductsPipe,
    OrderComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BreezeBridgeAngularModule,
    RequestsModule,
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ZzaRepositoryService, CdtRepositoryService, InitGuard, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    NamingConvention.camelCase.setAsDefault();
  }
}
