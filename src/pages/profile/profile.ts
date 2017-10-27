import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { Http, RequestOptions, Headers, } from '@angular/http';
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
  public paymentInformation: Object
  public fullName: Object
  public user: Object;
  public userFullName: Object;
  public userAddress: Object;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public request: RequestOptions,
    private storage: Storage,
    private alertCtrl: AlertController,
    private userService: userService) {
    this.paymentInformation = new Object  
    this.user = new Object;
    this.userFullName = new Object;
    this.userAddress = new Object;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');  
    this.storage.get('fullName').then((val)=>{
    this.userFullName = val;
  });
  this.storage.get('userAddress').then((userAddress)=>{
    this.userAddress=userAddress;
  });
  this.storage.get('userFullDetails').then((val)=>{
    this.user = val;
  })
  this.storage.get('paymentInfo').then((val)=>{
    this.paymentInformation = val;
  })
    this.userService.GetOrderHistory();
  }
}