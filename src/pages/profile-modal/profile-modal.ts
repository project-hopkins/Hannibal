import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/userService';


@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
  providers: [UserService]  
})
export class ProfileModalPage {
  public user: Object;  
  public title = 'Hello';
  public informationType: string = this.navParams.get('informationType');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,    
    public viewCtrl: ViewController,
    private userService: UserService) {
    console.log(this.informationType);
    // Get the user info and have it as a placeholder in the text fields
  }


  ionViewDidLoad() {  
    //customer/profile/edit
    
    this.userService.getUserInfo()
    console.log('ionViewDidLoad HomePage');
    this.storage.get('token').then((value: string) => {
      console.log("STARTED");
      console.log(value)
    })
    
  }

  public updateInformation(){
    // Code to edit information.

    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
      console.log(this.user);
      // Have to do it in here
      // Example of how to get invidual values from it
      console.log(this.user['address'].name);
    });



    // Check Swagger to see call post call details
    // Token in header
    // Main in body

    this.closeModal();
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}
