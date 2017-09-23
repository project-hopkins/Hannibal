import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html',
  providers: [OneSignal]
})
export class MyApp {
  rootPage: any = 'HomePage';
  @ViewChild(Nav) nav: Nav;
  public index : any;
  // Setting the root page to HomePage


  pages: Array<{ title: string, component: any }>;


  constructor(
    public events: Events,
    public platform: Platform,
    public storage: Storage,
    public oneSignal: OneSignal,
    private alertCtrl: AlertController,
    splashScreen: SplashScreen,
    statusBar: StatusBar
  ) {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        
        //TODO: Figure out why I had to comment the below! 
        statusBar.styleDefault();
        statusBar.backgroundColorByHexString('#165cd3');
        splashScreen.hide();
        
  
        if (this.oneSignal) {
          this.oneSignal.startInit('0c73a76c-be9a-4c17-ab9e-0ad31cbaa349', '1031321310203');
          this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
          this.oneSignal.setSubscription(true);
          this.oneSignal.handleNotificationReceived().subscribe(() => { });
          this.oneSignal.handleNotificationOpened().subscribe(() => { });
          this.oneSignal.endInit();
        }
  
      });
    
    this.index = 0;
    // Title + Routes for the Menu
    this.pages = [
      { title: 'Home', component: 'HomePage' }, // Added Home as the first menu option 
      //Restaurant infomation page
      { title: 'About Us', component: 'RestaurantinfoPage' },
      { title: 'Cart', component: 'CartPage' },
      { title: 'Search', component: 'SearchPage' }

    ];

    // push admin page if user is an admin
    this.storage.get('adminRights').then((isAdmin: boolean) => {
      if (isAdmin) { this.pages.push({ title: 'Admin', component: 'AdminPage' }) }
    })

    // if token is available show login page
    this.storage.get('token').then((value: string) => {
      if (value == null || value == "") {
        this.index = 1;
        this.pages.push({ title: 'Login', component: 'LoginPage' });
      }
      else {
        this.pages.push({ title: 'Profile', component: 'ProfilePage' });
        this.pages.push({ title: 'Logout', component: 'LoginPage' });
      }
    });
  }

  openPage(page) {
    if (page.title == "Logout") {
      this.index = 1;
      this.storage.remove('token');
      this.storage.remove('cartItem');
      this.pages.pop();
      this.pages.pop();
      this.pages.push({ title: 'Login', component: 'LoginPage' })
      this.alertCtrl.create({
        title: 'Logout Confirmation',
        subTitle: 'You have Successfully logged out',
        buttons: ['Okay']
      }).present();
      this.nav.setRoot('HomePage');
    }

    

    this.storage.get('token').then((value: string) => {
      if (value != "" && value != null) {
        this.pages.pop();
        this.pages.pop();
        if(this.index == 1){
          this.pages.push({title:'Search',component: 'SearchPage'})
          this.index = 0;
        }
        this.pages.push({ title: 'Profile', component: 'ProfilePage' })
        this.pages.push({ title: 'Logout', component: 'LoginPage' })
      }

      this.nav.setRoot(page.component)
    });
  }
}
