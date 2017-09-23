import { NgModule } from '@angular/core';
import { EdititemPage} from './edititem';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [EdititemPage],
  imports: [IonicPageModule.forChild(EdititemPage)],
  entryComponents: [
    EdititemPage
  ]
})
export class EdititemPageModule { }