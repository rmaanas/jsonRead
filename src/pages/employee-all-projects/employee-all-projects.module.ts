import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeAllProjectsPage } from './employee-all-projects';

@NgModule({
  declarations: [
    EmployeeAllProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeAllProjectsPage),
  ],
  exports: [
    EmployeeAllProjectsPage
  ]
})
export class EmployeeAllProjectsPageModule {}
