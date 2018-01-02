import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  public user: Object;
  public testUser: any;
  public userAdmin: boolean;
  public userNotAdmin: boolean;
  @ViewChild(Nav) nav: Nav;
  item: Array<{ title: string, component: any }>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.item =
      [
        { title: 'Add Menu Item', component: 'AddItemPage' }
      ];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
    this.checkAdminRights();
  }


  /**
   * Reset the content nav to have just this page 
   * we wouldn't want the back button to show in this scenario  
   * 
   * @param {any} page 
   * 
   * @memberOf AdminPage
   */
  public openPage(page):void {
    console.log(page.component);
    this.navCtrl.push(page.component);
  }
  public checkAdminRights() {
    this.storage.get('adminRights').then((val) => {
      this.testUser = val;
      if (this.testUser == true) {
         this.userAdmin = true;
         this.userNotAdmin = false;
      } else {
        this.userAdmin = false;
        this.userNotAdmin = true;
      }
    });
  }
}
