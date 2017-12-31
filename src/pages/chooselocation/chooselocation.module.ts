import { NgModule } from '@angular/core';
import { ChooseLocation} from './chooselocation';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ChooseLocation],
  imports: [IonicPageModule.forChild(ChooseLocation)],
  entryComponents: [
    ChooseLocation
  ]
})
export class ChooseLocationModule { }