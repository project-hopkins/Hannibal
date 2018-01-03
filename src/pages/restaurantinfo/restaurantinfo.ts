import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-restaurantinfo',
  templateUrl: 'restaurantinfo.html'
})
export class RestaurantinfoPage {
  public user: Object;

  public userNotAdmin: boolean;
//private storage: any;
  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantinfoPage');

    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
    });
  }

}
