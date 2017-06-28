import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectpagePage } from './projectpage';

@NgModule({
  declarations: [
    ProjectpagePage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectpagePage),
  ],
  exports: [
    ProjectpagePage
  ]
})
export class ProjectpagePageModule {}
