import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewHistoryPage } from './view-history';

@NgModule({
  declarations: [
    ViewHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewHistoryPage),
  ],
  exports: [
    ViewHistoryPage
  ]
})
export class ViewHistoryPageModule {}
