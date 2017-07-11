import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Visit1Page } from './visit1';

@NgModule({
  declarations: [
    Visit1Page,
  ],
  imports: [
    IonicPageModule.forChild(Visit1Page),
  ],
  exports: [
    Visit1Page
  ]
})
export class Visit1PageModule {}
