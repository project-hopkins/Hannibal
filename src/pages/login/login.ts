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
    let loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();

    this.userService.login(this.username, this.password).subscribe(
      data => this.navCtrl.setRoot('HomePage'),
      (err) => {
        loader.dismiss().then(data => {
          if (err.status == 403) {
            this.alertCtrl.create({
              title: 'Login Error',
              message: err.json().error,
              buttons: ['OK']
            }).present();
          }
        })

      },
      () => loader.dismiss()
    );
  }


  public GoToRegisterPage() {

    this.navCtrl.push('RegisterPage');
  }
}