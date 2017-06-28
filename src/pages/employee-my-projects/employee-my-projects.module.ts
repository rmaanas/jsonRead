import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeMyProjectsPage } from './employee-my-projects';

@NgModule({
  declarations: [
    EmployeeMyProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeMyProjectsPage),
  ],
  exports: [
    EmployeeMyProjectsPage
  ]
})
export class EmployeeMyProjectsPageModule {}
