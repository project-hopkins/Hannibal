import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/userService';
import { Http, RequestOptions, Headers, } from '@angular/http';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
  providers: [UserService]  
})
export class ProfileModalPage {
  public user: Object;  
  public informationType: string = this.navParams.get('informationType');
  public personal: any;
  public payment: any;
  public address: any;
  public password: any;
  public token: any;  
  public headers : Headers;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,    
    public viewCtrl: ViewController,
    private userService: UserService,
    public http: Http
    ) {

    this.personal = {
      firstName: "",
      lastName: ""
    }

    this.payment = {
      fullName: "",
      number: "",
      cardType: ""
    }

    this.address = {
      streetNumber: "",
      streetName: "",
      streetType: "",
      postalCode: ""
    }

    this.password = {
      currentPassword: "",
      newPassword: "",
      newPasswordAgain: ""
    }

    this.user = new Object();

    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
      console.log("***************");
      console.log(this.user);
      console.log("***************");
    });

    console.log(this.informationType);
  } 


  ionViewDidLoad() {      
    this.userService.getUserInfo()
    console.log('ionViewDidLoad HomePage');

    this.storage.get('token').then((value: string) => {
      this.token = value;
    })
  }

  public updateInformation(){
    
    let check = false;
      this.storage.get('token').then((value: string) => {
        this.token = value;

        this.headers = new Headers();
        this.headers.append('token', value)

        let options = new RequestOptions({
          headers: this.headers
        })

        if(this.password['currentPassword'] != "" ){
          console.log("Password Section");
          console.log(this.token);
          
          // If newpass = new pass again
          if(this.password['newPassword'] == this.password['newPasswordAgain']
            && this.password['newPassword'] != "" && this.password['newPasswordPassword'] != ""){

            let body = {"newpass": this.password['newPassword'], "oldpass" : this.password['currentPassword']};
  
            this.http.post('https://keanubackend.herokuapp.com/customer/password/edit', body, options).map(res => res.json()).subscribe(
              data => {
                console.log(data);
              }, err => {
                console.log(err);
                alert("Incorrect current password");
              },
              () => {
                alert("Password changed");
                this.closeModal();       
              }
            )
          }
          else{
            alert("Passwords do not match");
          }
        }
    
        else {
          console.log("Account section;")
          //console.log(this.user);

          let body = this.user;

          if(!(parseInt(this.user['paymentInfo']['num'].toString(), 10))){
            this.user['paymentInfo']['num'] = "";
          }
          else{
            
          }

          var obj = {"adminRights": false };
          this.user = Object.assign(this.user, obj);

          this.http.post('https://keanubackend.herokuapp.com/customer/profile/edit', body, options).map(res => res.json()).subscribe(
            data => {
              console.log(data);
            }, err => {
              console.log(err);
            },
            () => {
              alert("Information saved");
              this.closeModal();       
            }
          )

          console.log(this.user);
          this.navCtrl.getPrevious();
        }
      })
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}