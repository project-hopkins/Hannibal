import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {
  public title = 'Hello';
  public informationType: string = this.navParams.get('informationType');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController) {
    console.log(this.informationType);
     
    // Get the user info and have it as a placeholder in the text fields
    
  }


  ionViewDidLoad() {
    //console.log(this.navParams.get('informationType'));
  }

  public updateInformation(){
    // Code to edit information.

    // Check Swagger to see call post call details
    // Token in header
    // Main in body

    this.closeModal();
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}
