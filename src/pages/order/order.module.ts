import { NgModule } from '@angular/core';
import { OrderPage} from './order';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [OrderPage],
  imports: [IonicPageModule.forChild(OrderPage)],
  entryComponents: [
    OrderPage
  ]
})
export class OrderPageModule { }