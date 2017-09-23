import { NgModule } from '@angular/core';
import { PaymentInfoPage} from './paymentinfo';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [PaymentInfoPage],
  imports: [IonicPageModule.forChild(PaymentInfoPage)],
  entryComponents: [
    PaymentInfoPage
  ]
})
export class PaymentInfoPageModule { }