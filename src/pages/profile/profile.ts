import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers, } from '@angular/http';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public paymentInformation: Object
  public addressInformation: Object
  public personalInformation: Object
  public fullName: Object
  public orders : Array<Object>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public request: RequestOptions,
    private storage: Storage,
    private alertCtrl: AlertController) {
    this.paymentInformation = new Object
    this.addressInformation = new Object
    this.personalInformation = new Object
    this.fullName = new Object
    this.orders = new Array<Object>()
  }

  public GetAddressInfo(): void {

    this.storage.get('token').then(value => {
      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });
      this.http.get('https://keanubackend.herokuapp.com/customer/profile', options).map(res => res.json()).subscribe(
        data => {
          this.addressInformation = data.data.user.address;
          this.personalInformation = data.data.user;
          this.fullName = data.data.user.displayName;
          //console.log(this.personalInformation);
        }, err => {
          console.log(err);
        },
      )
    })
  }

  public GetPaymentInfo(): void {

    this.storage.get('token').then(value => {
      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });
      this.http.get('https://keanubackend.herokuapp.com/customer/payment', options).map(res => res.json()).subscribe(
        data => {
          this.paymentInformation = data.data.paymentInfo;
          //console.log(this.paymentInformation);
        }, err => {
          console.log(err);
        },
      )
    })
  }

  public GetOrderHistory(): void {
     this.storage.get('token').then(value => {
      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });
      this.http.get('https://keanubackend.herokuapp.com/order', options).map(res => res.json()).subscribe(
        data => {
          this.orders = data.data.orders;
          console.log(this.orders);
        }, err => {
          console.log(err);
        },
      )
    })
  }

  public ShowOrderDetails(order: Object):void{
    console.log(order); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.GetAddressInfo();
    this.GetPaymentInfo();
    this.GetOrderHistory();
  }

}