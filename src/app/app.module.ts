import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { UserService } from '../services/userService';
import { MyApp } from './app.component';
import { LocationService } from '../services/chooseLocationService';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [{provide: ErrorHandler, 
    useClass: IonicErrorHandler}, 
    OneSignal,
    UserService,
    StatusBar,
    SplashScreen,
    Geolocation,LocationService
  ]
})
export class AppModule {}
