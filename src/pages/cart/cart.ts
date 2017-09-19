import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartService } from '../../services/cartService';
import { OrderPage } from '../order/order'

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [CartService]
})
export class CartPage {
  public cartItemsIncrease: Map<String, number>;
  public cartItems: Array<Object>
  public delivery: boolean;
  public token: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    private cartService: CartService,
    private alertController: AlertController
  ) {
    this.cartItemsIncrease = new Map<String, number>();
    this.cartItems = new Array<Object>();
    this.delivery = false;
  }

  public GoOrderPage() {

    this.navCtrl.push(OrderPage);
  }

  public IncreaseQuantity(cartItem: Object): void {
    //console.log(cartItem);
    console.log(cartItem);
    this.cartService.increaseQuantity(cartItem).then(value => {
      if (value) {
        this.cartService.getCartItems().then(itemsData => {
          this.cartItems = itemsData;
        });
      }
    });

  }

  public DecreaseQuantity(cartItem: Object) {
    this.cartService.decreaseQuantity(cartItem).then(value => {
      if (value) {
        this.cartService.getCartItems().then(itemsData => {
          this.cartItems = itemsData;
        })
      }
    });


  }

  /**
   * DeleteItem
   */
  public DeleteItem(cartItem: Object) {

    let delFunction = () => {
      this.cartService.deleteFromCart(cartItem['item']['_id']).then(value => {
        if (value) {
          this.cartService.getCartItems().then(itemsData => {
            this.cartItems = itemsData;
          });
        }
        else {
          this.cartItems = [];
        }
      });
    }

    let confirm: Alert = this.alertController.create({
      title: 'Remove item',
      message: 'Remove ' + cartItem['item']['name'] + ' from cart?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: delFunction
        }
      ]
    });

    confirm.present();

  }

  ionViewDidLoad() {

    console.log('in cart loading');

    this.cartService.getCartItems().then(itemsData => {
      this.cartItems = itemsData;
    })
    this.storage.get('token').then((value: string) => {
      this.token = value;
    })
  }
}

