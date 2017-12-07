import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  @ViewChild(Nav) nav: Nav;
  item: Array<{ title: string, component: any }>;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.item =
      [
        { title: 'Add Menu Item', component: 'AddItemPage' }
      ];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
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

}
