import { Component } from '@angular/core';
import { NavParams, IonicPage, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/userService';
import { ProfileModalPage } from '../profile-modal/profile-modal';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService]
})
export class ProfilePage {
  public user: Object;
  public informationSent: Object;

  constructor(
    public navParams: NavParams,
    private storage: Storage,
    private userService: UserService,
    private modalCtrl : ModalController) {
    this.user = new Object();
  }

  // Will accept parameters of fields to be edited
  public openEditProfileModal(informationType: String){
    // Depending on the information. Im showing different things
    
    let editProfileModal = this.modalCtrl.create('ProfileModalPage', {informationType});
    editProfileModal.present();
  }


  ionViewDidLoad() {
    //Gets the Users full details from local storage for use on page
    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
    });
    this.userService.getOrderHistory();
  }
}
