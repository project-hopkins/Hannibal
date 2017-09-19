import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { CartService } from '../../services/cartService';
import { Http, Headers, RequestOptions } from '@angular/http';
import { EdititemPage } from '../edititem/edititem';


@Component({
  selector: 'page-submenu',
  templateUrl: 'submenu.html',
  providers: [CartService]
})
export class SubmenuPage {
  public menuItems: Array<Object>;
  public cartItem: Object;
  public isAdmin: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private cartService: CartService,
    private http: Http,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {

    this.menuItems = this.navParams.get('data');
    this.storage.get('adminRights').then(value => {
      this.isAdmin = value
    })
  }

  // Edit Items Event

  public editItemClick(item): void {

    let loader: Loading = this.loadingCtrl.create({ content: 'loading item to edit' })

    this.navCtrl.push(EdititemPage, { data: item }).then(() => loader.dismiss())

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


  ionViewDidLoad() { }

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

}
