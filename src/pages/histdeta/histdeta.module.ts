import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistdetaPage } from './histdeta';

@NgModule({
  declarations: [
    HistdetaPage,
  ],
  imports: [
    IonicPageModule.forChild(HistdetaPage),
  ],
  exports: [
    HistdetaPage
  ]
})
export class HistdetaPageModule {}
