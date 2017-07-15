import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditChecklistEventPage } from './edit-checklist-event';

@NgModule({
  declarations: [
    EditChecklistEventPage,
  ],
  imports: [
    IonicPageModule.forChild(EditChecklistEventPage),
  ],
  exports: [
    EditChecklistEventPage
  ]
})
export class EditChecklistEventPageModule {}
