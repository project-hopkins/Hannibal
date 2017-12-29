import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartService } from '../../services/cartService';

@IonicPage()
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
    this.getRecommended();
  }

  /**
   * Method that goes to the Cart Page.
   * Is only accessible if the user is logged in.
   * 
   * @memberof CartPage
   */
  public GoOrderPage() {
    this.navCtrl.push('OrderPage');
  }

  /**
   * Method that goes to the login page
   * Is only accessible if the user is not logged in.
   * 
   * @memberof CartPage
   */
  public GoToLogin(){
    this.navCtrl.push('LoginPage');
  }
  
  /**
   * Method that increases the quantity of a item from the cart.
   * 
   * @param {Object} cartItem 
   * @memberof CartPage
   */
  public IncreaseQuantity(cartItem: Object): void {
    // console.log(cartItem);
    this.cartService.increaseQuantity(cartItem).then(value => {
      if (value) {
        this.cartService.getCartItems().then(itemsData => {
          this.cartItems = itemsData;
        });
      }
    });
  }

  /**
   * Method that decreases quantity of a item from the cart.
   * Will not work if quantity of the item is less than one.
   * 
   * @param {Object} cartItem 
   * @memberof CartPage
   */
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
   * Method that deletes the item from the cart.
   * 
   * @param {Object} cartItem 
   * @memberof CartPage
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

  public getRecommended(){
    
  }

  public addToCart(itemId: String){
    this.cartService.addToCart({ 'id': itemId, 'quantity': 1 });
    location.reload();
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

