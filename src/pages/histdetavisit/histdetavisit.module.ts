import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistdetavisitPage } from './histdetavisit';

@NgModule({
  declarations: [
    HistdetavisitPage,
  ],
  imports: [
    IonicPageModule.forChild(HistdetavisitPage),
  ],
  exports: [
    HistdetavisitPage
  ]
})
export class HistdetavisitPageModule {}
