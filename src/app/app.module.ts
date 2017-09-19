import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {OneSignal} from '@ionic-native/onesignal';

import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { PaymentInfoPage } from '../pages/paymentInfo/paymentInfo';
import { CartPage } from '../pages/cart/cart';
import { SubmenuPage } from '../pages/submenu/submenu';
import { OrderPage } from '../pages/order/order'
import { RestaurantinfoPage } from '../pages/restaurantinfo/restaurantinfo';
import { AdminPage } from '../pages/admin/admin';
import { AddItemPage } from '../pages/add-item/add-item';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { EdititemPage } from '../pages/edititem/edititem';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    PaymentInfoPage,
    SubmenuPage,
    OrderPage,
    RestaurantinfoPage,  
    CartPage,
    AdminPage,
    AddItemPage,
    ProfilePage,
    SearchPage,
    EdititemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    LoginPage,
    HomePage,
    PaymentInfoPage,
    SubmenuPage,
    OrderPage,
    RestaurantinfoPage,
    CartPage,
    AdminPage,
    AddItemPage,
    ProfilePage,
    SearchPage,
    EdititemPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, OneSignal]
})
export class AppModule {}
