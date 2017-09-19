import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';

import { CartService } from "../../services/cartService";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [CartService]
})
export class SearchPage {

  private _searchUrl: string;
  public results: Array<Object>;

  /**
   * Constructor
   * @param http 
   * @param cartService 
   * @param loadingCtrl 
   * @param alertController 
   */
  constructor(
    private http: Http,
    private cartService: CartService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {
    this._searchUrl = 'https://keanubackend.herokuapp.com/item/search?q=';
    this.results = new Array<Object>();
  }


  /**
   * load page function
   */
  public ionViewDidLoad(): void {
    console.log('ionViewDidLoad SearchPage');
  }


  /**
   * get items 
   * @param event 
   */
  public getItems(event): void {
    let query = event.target.value

    if (query !== '') {

      this.http.get(this._searchUrl + query).map(res => res.json()).subscribe(
        data => {
          if (typeof data['data']['items'] !== 'undefined') {
            this.results = data['data']['items'];
            console.log(this.results);
          }
        },
        err => console.log(err),
        () => { }
      )
    }
  }


  /**
   * Add search item to cart
   * @param item 
   */
  public addToCart(item) {
    let loading = this.loadingCtrl.create();
    loading.present();
    console.log('ID is ' + item);
    item['id'] = item['_id'];
    this.cartService.addToCart(item);
    loading.dismiss();
    this.alertController.create({title: item['name'], message: 'Added to cart', buttons: ['OK']}).present();
  }

}
