import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoggerRoutingModule } from './logger-routing.module';


@NgModule({
  declarations: LoggerRoutingModule.components,
  imports: [
    SharedModule,
    LoggerRoutingModule
  ],
  providers: [
  ]
})
export class LoggerModule { }
