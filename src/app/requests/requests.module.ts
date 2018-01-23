import { DropDownListModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestContactsConcat } from './../shared/request-contacts-concat.pipe';
import { FormsModule } from '@angular/forms';
import { GridHelpersModule } from '../shared/grid-helpers/grid-helpers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridHelpersModule,
    // GridModule,
    // DropDownListModule,
    // DropDownsModule,
    // PDFModule,
    // ExcelModule
  ],
  declarations: [
    RequestsListComponent,
    RequestContactsConcat
  ]
})
export class RequestsModule { }
