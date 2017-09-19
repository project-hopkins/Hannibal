import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import 'rxjs/Rx';
/*
  Class for the Login page.

*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public username: string;
  public password: string;  
  registerPage = RegisterPage  

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: Http,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  )
  {

    this.username='';
    this.password='';    
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  public login():void{
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    let headers = new Headers({ 'username': this.username, 'password': this.password });

    this.http.post("https://keanubackend.herokuapp.com/login", null,{ headers: headers })
        .subscribe(
            data => {
              console.log(data.json()['data']['token']);
              this.storage.set('token',data.json()['data']['token'])
              this.storage.set('adminRights',data.json()['data']['adminRights'])
            },
            err => {
              console.log("ERROR!: ", err);
            },
            ()=>{
              console.log('posted login done')
              loader.dismiss();
              this.alertCtrl.create({
                title: 'Login Confirmation',
                subTitle: 'Login Successful. Redirecting to homepage!',
                buttons: ['OK']
              }).present();
              this.navCtrl.setRoot(HomePage);
            }
        );
  }

}
