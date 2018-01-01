import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Restaurantinfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-restaurantinfo',
  templateUrl: 'restaurantinfo.html'
})
export class RestaurantinfoPage {
  public user: Object;
  public testUser: any;
  public userAdmin: boolean;
  public userNotAdmin: boolean;
//private storage: any;
  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantinfoPage');

    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
    });
    this.checkAdminRights();
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
