import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the Edititem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edititem',
  templateUrl: 'edititem.html'
})
export class EdititemPage {


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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdititemPage');
  }

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

}
