import { Component } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/userService';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService]
})
export class ProfilePage {
  public user: Object;
  constructor(public navParams: NavParams,
    private storage: Storage,
    private userService: UserService) {
    this.user = new Object();
  }
  ionViewDidLoad() {
    //Gets the Users full details from local storage for use on page
    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
    });
    this.userService.getOrderHistory();
  }
}
