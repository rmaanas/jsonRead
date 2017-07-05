import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRolePage } from './add-role';

@NgModule({
  declarations: [
    AddRolePage,
  ],
  imports: [
    IonicPageModule.forChild(AddRolePage),
  ],
  exports: [
    AddRolePage
  ]
})
export class AddRolePageModule {}
