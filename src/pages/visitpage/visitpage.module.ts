import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitpagePage } from './visitpage';

@NgModule({
  declarations: [
    VisitpagePage,
  ],
  imports: [
    IonicPageModule.forChild(VisitpagePage),
  ],
  exports: [
    VisitpagePage
  ]
})
export class VisitpagePageModule {}
