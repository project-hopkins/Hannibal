import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, Loading, AlertController, IonicPage } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { CartService } from '../../services/cartService';
import { ItemService } from '../../services/getItem';


@IonicPage()
@Component({
  selector: 'page-submenu',
  templateUrl: 'submenu.html',
  providers: [CartService, ItemService]
})
export class SubmenuPage {
  public menuItems: Array<any>;
  public cartItem: Object;
  public isAdmin: boolean;
  public ratingsItem: any;
  public ratingsArr: any[] = [];
  public rate: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private cartService: CartService,
    private http: Http,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private itemService: ItemService
  ) {
    //  this.ratingsItem = new Array<Object>();
    this.rate = ['5', '2', '3'];

    this.menuItems = this.navParams.get('data');
    console.log(this.menuItems);
    this.storage.get('adminRights').then(value => {
      this.isAdmin = value
    })

  }
 public async getRatings() {
    for (let i of this.menuItems) {
     await this.getItemRating(i._id);
    }
  }
  // Edit Items Event
  public editItemClick(item): void {

    let loader: Loading = this.loadingCtrl.create({ content: 'loading item to edit' })

    this.navCtrl.push('EdititemPage', { data: item }).then(() => loader.dismiss())

  }
  // Delete Button Event - neil
  public deleteClick(id: String): void {
    let link = 'https://keanubackend.herokuapp.com/admin/item/delete/' + id;
    let loader: Loading = this.loadingCtrl.create({ content: 'Deleting item' })
    loader.present();

    this.storage.get('token').then(value => {

      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });

      this.http.post(link, '', options)
        .subscribe(
        data => { },
        err => {
          console.log('error')
          console.log(err);
        },
        () => {
          loader.dismiss()
          for (let i = 0; i < this.menuItems.length; i++) {
            if (this.menuItems[i]['_id'] === id) {
              this.menuItems.splice(i, 1);
            }
          }
        }
        )

    })

  }


  ionViewDidLoad() {
    this.getRatings();
  }
  public onModelChange(item: any, rate: number) {
    console.log(item + ' ' + rate)
    this.itemService.postItemRating(item, rate);
  }

  /**
   * Add item to cart
   * 
   * @param {Item} item 
   * 
   * @memberOf SubmenuPage
   */
  public addItem(itemId: String): void {
    console.log('itemID is : ' + itemId);

    this.cartService.addToCart({ 'id': itemId, 'quantity': 1 });

    this.alertCtrl.create({
      title: 'Cart Confirmation',
      subTitle: 'This item has been added to the cart',
      buttons: ['Okay']
    }).present();
  }

  public getItemRating(item: string) {
    this.storage.get('token').then(value => {

      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });

      this.http.get('https://keanubackend.herokuapp.com/rate/item/' + item, options).map(res => res.json()).subscribe(
        data => {
          this.ratingsItem = data;
          console.log(this.ratingsItem);
          let err = 'error';
          if (err in this.ratingsItem) {
            this.ratingsArr.push(0)
          } else {
            this.ratingsArr.push(this.ratingsItem.data.rating.rating)
          }
          console.log(this.ratingsArr);
        });
    });
  }
}
