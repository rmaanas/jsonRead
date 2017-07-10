import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProjectPage } from './edit-project';

@NgModule({
  declarations: [
    EditProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProjectPage),
  ],
  exports: [
    EditProjectPage
  ]
})
export class EditProjectPageModule {}
