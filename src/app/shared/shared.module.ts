import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './components/card-product/card-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CardProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    CardProductComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
