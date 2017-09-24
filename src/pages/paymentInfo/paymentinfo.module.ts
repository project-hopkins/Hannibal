import { NgModule } from '@angular/core';
import { PaymentInfoPage} from './paymentInfo';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [PaymentInfoPage],
  imports: [IonicPageModule.forChild(PaymentInfoPage)],
  entryComponents: [
    PaymentInfoPage
  ]
})
export class PaymentInfoPageModule { }