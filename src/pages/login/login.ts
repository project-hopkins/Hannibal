import { UserService } from '../../services/userService';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { NavController, NavParams, LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';

import 'rxjs/Rx';
/*
  Class for the Login page.
*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public username: string;
  public password: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: Http,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private userService: UserService
  ) {
    this.username = '';
    this.password = '';
  }


  public login(): void {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    this.userService.login(this.username, this.password)
      .then(data => {
        console.log('**************');
        console.log(data);
        console.log('**************');
      })
      .catch(err => console.log(err))

    let headers = new Headers({ 'username': this.username, 'password': this.password });

    this.http.post("https://keanubackend.herokuapp.com/login", null, { headers: headers })
      .subscribe(
      data => {
        console.log(data.json()['data']['token']);
        this.storage.set('token', data.json()['data']['token'])
        this.storage.set('adminRights', data.json()['data']['adminRights'])
      },
      err => {
        console.log("ERROR!: ", err);
      },
      () => {
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


  public GoToRegisterPage() {

    this.navCtrl.push('RegisterPage');
  }
}