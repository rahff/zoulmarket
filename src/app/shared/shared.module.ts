import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { CircleContainerComponent } from './components/circle-container/circle-container.component';
import { RouterModule } from '@angular/router';
import { ActiveDirective } from './directive/active.directive';
import { CardProductComponent } from './components/card-product/card-product.component';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    CardProductComponent,
    CircleContainerComponent,
    ActiveDirective,
    SubNavComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    CardProductComponent,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CircleContainerComponent,
    ActiveDirective,
    SubNavComponent,
    LoaderComponent
  ],
  
  
})
export class SharedModule { }
