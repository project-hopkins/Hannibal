import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentInfoPage } from '../paymentInfo/paymentInfo';

/*
  Generated class for the Login page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {  
  public username: string;
  public password: string;
  public email: string;
  public DisplayName: any;
  //paymentInfo = PaymentInfoPage
  constructor(private navCtrl: NavController, private navParams: NavParams, private http: Http) {   
    this.DisplayName={
      firstName: '',
      lastName: ''
    }
    this.username='';
    this.password='';
    this.email='';
    }
    public next():void{
    this.navCtrl.push(PaymentInfoPage, {
      DisplayNameParam: this.DisplayName,
      emailparam: this.email,
      usernameParam: this.username,
      passwordParam: this.password

  });
  }
}