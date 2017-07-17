import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecteventsPage } from './selectevents';

@NgModule({
  declarations: [
    SelecteventsPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecteventsPage),
  ],
  exports: [
    SelecteventsPage
  ]
})
export class SelecteventsPageModule {}
