import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateVisitPage } from './update-visit';

@NgModule({
  declarations: [
    UpdateVisitPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateVisitPage),
  ],
  exports: [
    UpdateVisitPage
  ]
})
export class UpdateVisitPageModule {}
