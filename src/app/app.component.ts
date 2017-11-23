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

<<<<<<< HEAD
  rootPage: any = 'HomePage';
  @ViewChild(Nav) nav: Nav;
  public index: any;
=======
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'HomePage';
  public index: any;
  public isAdmin: boolean;
  // Setting the root page to HomePage
>>>>>>> 937f02427585b418c189d07c6ac0aa9334294b7f

  // set default stat as LoggedOut
  public loginState: LoginState = LoginState.LoggedOut;

  pages: Array<{ title: string, component: string, access: number }>;


  constructor(
    public events: Events,
    public platform: Platform,
    public storage: Storage,
    public oneSignal: OneSignal,
<<<<<<< HEAD
    private _alertCtrl: AlertController,
    private _splashScreen: SplashScreen,
    private _statusBar: StatusBar,
    private _userService: UserService
  ) {    
=======
    private alertCtrl: AlertController,
    splashScreen: SplashScreen,
    statusBar: StatusBar
  ) {
>>>>>>> 937f02427585b418c189d07c6ac0aa9334294b7f
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

<<<<<<< HEAD
      if (this.platform.is('cordova')) {
        _statusBar.styleDefault();
        _statusBar.backgroundColorByHexString('#165cd3');
        _splashScreen.hide();
=======
      if ((<any>window).cordova) {
        //TODO: Figure out why I had to comment the below! 
        statusBar.styleDefault();
        statusBar.backgroundColorByHexString('#165cd3');
        splashScreen.hide();
>>>>>>> 937f02427585b418c189d07c6ac0aa9334294b7f


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
<<<<<<< HEAD
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

    this._userService.isLoggedIn.subscribe((value:boolean)=> {
      if (value) {
        console.log('loggedIN');
        this.loginState = LoginState.LoggedIn;
=======

    this.storage.get('adminRights').then((isAdmin: boolean) => {
      if (isAdmin) {
        this.pages = [

          { title: 'Home', component: 'HomePage' },
          { title: 'Search', component: 'SearchPage' }
        ];

      } else {
        this.pages = [
          { title: 'Home', component: 'HomePage' }, // Added Home as the first menu option 
          //Restaurant infomation page
          { title: 'About Us', component: 'RestaurantinfoPage' },
          { title: 'Cart', component: 'CartPage' },
          { title: 'Search', component: 'SearchPage' }

        ];

      }
    })



    // push admin page if user is an admin
    this.storage.get('adminRights').then((isAdmin: boolean) => {
      if (isAdmin) { this.pages.push({ title: 'Admin', component: 'AdminPage' }) }
      this.isAdmin = isAdmin;
    })

    // if token is available show login page
    this.storage.get('token').then((value: string) => {
      if (value == null || value == "") {
        this.index = 1;
        this.pages.push({ title: 'Login', component: 'LoginPage' });
>>>>>>> 937f02427585b418c189d07c6ac0aa9334294b7f
      }
      else{
        console.log('not logged in');
        this.loginState = LoginState.LoggedOut;
      }
    });

    this._userService.isAdmin.subscribe((value: boolean) =>{
      if (value) {
        this.loginState = LoginState.LoggedInAndAdmin;;
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
<<<<<<< HEAD
=======



    this.storage.get('token').then((value: string) => {
      if (value != "" && value != null) {
        this.pages.pop();
        this.pages.pop();
        if (this.index == 1) {
          this.pages.push({ title: 'Search', component: 'SearchPage' })
          this.index = 0;
        }
        this.pages.push({ title: 'Profile', component: 'ProfilePage' })
        this.pages.push({ title: 'Logout', component: 'LoginPage' })
      }

      this.nav.setRoot(page.component)
    });
>>>>>>> 937f02427585b418c189d07c6ac0aa9334294b7f
  }
}

enum LoginState {
  LoggedOut =0,
  LoggedIn,
  LoggedInAndAdmin
}
