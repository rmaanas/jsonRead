import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { History1Page } from './history1';

@NgModule({
  declarations: [
    History1Page,
  ],
  imports: [
    IonicPageModule.forChild(History1Page),
  ],
  exports: [
    History1Page
  ]
})
export class History1PageModule {}
