//home.module.ts
import { NgModule } from '@angular/core';
import { AdminPage } from './admin';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [AdminPage],
  imports: [
    IonicPageModule.forChild(AdminPage)
  ],
  entryComponents: [
    AdminPage
  ]
})
export class AdminPageModule { }