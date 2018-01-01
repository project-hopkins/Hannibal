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
  public testUser: any;
  public userAdmin: boolean;
  public userNotAdmin: boolean;
  constructor(public navParams: NavParams,
    private storage: Storage,
    private userService: UserService) {
    this.user = new Object();
  }
  ionViewDidLoad() {
    //Gets the Users full details from local storage for use on page
    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
      console.log(this.user);
    });
    this.userService.getOrderHistory();
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