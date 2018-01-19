import { RequestContactsConcat } from './shared/request-contacts-concat.pipe';
import { CdtRepositoryService } from './shared/cdtRepository.service';
import { OrderItemsConcatProductsPipe } from './shared/order-items-concat-products.pipe';
import { AppRoutingModule } from './app-routing.module';
import { CustomersListComponent } from './customers/customers-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';

import { BreezeBridgeAngularModule } from 'breeze-bridge-angular';
import { NamingConvention } from 'breeze-client';

import { AppComponent } from './app.component';
import { ZzaRepositoryService } from './shared/zzarepository.service';
import { CustomersListItemComponent } from './customers/customers-list-item/customers-list-item.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { ZzaRepositoryTelerikService } from './shared/zzarepository-telerik.service';
import { HttpClientModule } from '@angular/common/http';
import { RequestsListComponent } from './requests/requests-list/requests-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    CustomersListItemComponent,
    CustomerDetailComponent,
    OrderItemsConcatProductsPipe,
    RequestContactsConcat,
    RequestsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    BreezeBridgeAngularModule,
    AppRoutingModule
  ],
  providers: [ZzaRepositoryService, CdtRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    NamingConvention.camelCase.setAsDefault();
  }
}
