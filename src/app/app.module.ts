import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ProfileModalPage } from '../pages/profile-modal/profile-modal';

import { UserService } from '../services/userService';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    ProfileModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfileModalPage
  ],
  providers: [{provide: ErrorHandler, 
    useClass: IonicErrorHandler}, 
    OneSignal,
    UserService,
    StatusBar,
    SplashScreen
  ]
})
export class AppModule {}
