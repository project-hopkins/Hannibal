import { NgModule } from '@angular/core';
import { SubmenuPage} from './submenu';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [SubmenuPage],
  imports: [IonicPageModule.forChild(SubmenuPage)],
  entryComponents: [
    SubmenuPage
  ]
})
export class SubmenuPageModule { }