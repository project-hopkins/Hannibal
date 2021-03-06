import { Component, ViewChild } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { AlertController, Events, Nav, Platform } from 'ionic-angular';

import { UserService } from '../services/userService';

@Component({
  templateUrl: 'app.html',
  providers: [OneSignal]
})
export class MyApp {

  rootPage: any = 'HomePage';
  @ViewChild(Nav) nav: Nav;
  public index: any;

  public selectedTheme: String = 'light-theme';

  // set default stat as LoggedOut
  public loginState: LoginState = LoginState.LoggedOut;

  pages: Array<{ title: string, component: string, access: number }>;


  constructor(
    public events: Events,
    public platform: Platform,
    public storage: Storage,
    public oneSignal: OneSignal,
    private _alertCtrl: AlertController,
    private _splashScreen: SplashScreen,
    private _statusBar: StatusBar,
    private _userService: UserService
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // this.selectedTheme
      this._userService.getIsAdminObservable().subscribe(
        data => {
          if (data) {
            this.selectedTheme = 'dark-theme';
            this.loginState = LoginState.LoggedInAndAdmin;
          }
          else {
            this.selectedTheme = 'light-theme';
          }
        }
      )


      if (this.platform.is('cordova')) {
        _statusBar.styleDefault();
        _statusBar.backgroundColorByHexString('#165cd3');
        _splashScreen.hide();


        if (this.oneSignal) {
          this.oneSignal.startInit('0c73a76c-be9a-4c17-ab9e-0ad31cbaa349', '1031321310203');
          this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
          this.oneSignal.setSubscription(true);
          this.oneSignal.handleNotificationReceived().subscribe(() => { });
          this.oneSignal.handleNotificationOpened().subscribe(() => { });
          this.oneSignal.endInit();
        }
      }

    });

    this.index = 0;
    // Title + Routes for the Menu
    this.pages = [
      { title: 'Home', component: 'HomePage', access: LoginState.LoggedOut }, // Added Home as the first menu option 
      { title: 'About Us', component: 'RestaurantinfoPage', access: LoginState.LoggedOut }, //Restaurant infomation page
      { title: 'Cart', component: 'CartPage', access: LoginState.LoggedOut },
      { title: 'Search', component: 'SearchPage', access: LoginState.LoggedOut },
      { title: 'Profile', component: 'ProfilePage', access: LoginState.LoggedIn },
      { title: 'Admin', component: 'AdminPage', access: LoginState.LoggedInAndAdmin },
      { title: 'Logout', component: '', access: LoginState.LoggedIn },
      { title: 'Login', component: 'LoginPage', access: LoginState.LoggedOut }
    ];

    this._userService.isLoggedIn.subscribe((value: boolean) => {
      if (value) {
        console.log('loggedIN');
        this.loginState = LoginState.LoggedIn;
      }
      else {
        console.log('not logged in');
        this.loginState = LoginState.LoggedOut;
      }
    });

  }

  openPage(page) {
    if (page.title === 'Logout') {
      this._userService.logout();
      this.nav.setRoot('HomePage');
    } else {
      this.nav.setRoot(page.component);
    }
  }
}

enum LoginState {
  LoggedOut = 0,
  LoggedIn,
  LoggedInAndAdmin
}
