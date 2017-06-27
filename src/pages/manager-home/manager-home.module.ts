import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerHomePage } from './manager-home';

@NgModule({
  declarations: [
    ManagerHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerHomePage),
  ],
  exports: [
    ManagerHomePage
  ]
})
export class ManagerHomePageModule {}
