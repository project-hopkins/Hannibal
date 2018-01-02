import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the Edititem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edititem',
  templateUrl: 'edititem.html'
})
export class EdititemPage {
  public user: Object;
  public testUser: any;
  public userAdmin: boolean;
  public userNotAdmin: boolean;

  public item: Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private http: Http,
    public loadingCtrl: LoadingController) {
    this.item = this.navParams.get('data')

    console.log(this.item);

  }

  ionViewDidLoad() { this.checkAdminRights();}

  //Accept Change Button Event Handler

  public editItemClick() {

    let link = 'https://keanubackend.herokuapp.com/admin/item/update';
    let loader: Loading = this.loadingCtrl.create({ content: 'loading' })
    loader.present();

    this.storage.get('token').then(value => {

      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });

      this.http.post(link, this.item, options)
        .subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log('error')
          console.log(err);
        },
        () => {
          loader.dismiss();

        });



    });
  }
  public checkAdminRights() {
    this.storage.get('adminRights').then((val) => {
      this.testUser = val;
      if (this.testUser == true) {
         this.userAdmin = true;
         this.userNotAdmin = false;
      } else {
        this.userAdmin = false;
        this.userNotAdmin = true;
      }
    });
  }

}
