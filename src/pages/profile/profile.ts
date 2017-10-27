import { Component } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { userService } from '../../services/userService';
import 'rxjs/add/operator/map';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [userService]
})
export class ProfilePage {
  public user: Object;
  constructor(public navParams: NavParams,
    private storage: Storage,
    private userService: userService) {
    this.user = new Object;
  }
  ionViewDidLoad() {
    //Gets the Users full details from local storage for use on page
    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
    });
    this.userService.GetOrderHistory();
  }
}