import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeEventsPage } from './employee-events';

@NgModule({
  declarations: [
    EmployeeEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeEventsPage),
  ],
  exports: [
    EmployeeEventsPage
  ]
})
export class EmployeeEventsPageModule {}
