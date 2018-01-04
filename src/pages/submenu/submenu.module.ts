import { NgModule } from '@angular/core';
import { SubmenuPage } from './submenu';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [SubmenuPage],
  imports: [
    IonicPageModule.forChild(SubmenuPage),
    Ionic2RatingModule
  ],
  entryComponents: [
    SubmenuPage
  ]
})
export class SubmenuPageModule { }