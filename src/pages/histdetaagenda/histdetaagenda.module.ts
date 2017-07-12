import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistdetaagendaPage } from './histdetaagenda';

@NgModule({
  declarations: [
    HistdetaagendaPage,
  ],
  imports: [
    IonicPageModule.forChild(HistdetaagendaPage),
  ],
  exports: [
    HistdetaagendaPage
  ]
})
export class HistdetaagendaPageModule {}
