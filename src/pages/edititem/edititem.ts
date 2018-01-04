import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController, Loading } from 'ionic-angular';

@IonicPage()
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
    
    console.log(this.item['isRecommended']);

    if(this.item['isRecommended'] == false || this.item['isRecommended'] == null || this.item['isRecommended'] == "false"){
      this.item['isRecommended'] = false;
      console.log('is now false');
    }
    else {
      this.item['isRecommended'] = true;
      console.log('is now true');
    }
    //console.log(this.item);
  }

  ionViewDidLoad() {}

  //Accept Change Button Event Handler

  public editItemClick() {

    let link = 'https://keanubackend.herokuapp.com/admin/item/update';
    let loader: Loading = this.loadingCtrl.create({ content: 'loading' })
    loader.present();

    if(this.item['isRecommended'] == false) {
      this.item['isRecommended'] = "false";
    }
    
    else {
      this.item['isRecommended'] = "true";
    }


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
          this.navCtrl.pop();
        });

    });
  }

}
