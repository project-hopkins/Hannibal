import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers, } from '@angular/http';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../home/home';
import { CartService } from '../../services/cartService';
import { ItemService } from '../../services/getItem';

// TODO Create Service for Calculating ChangeMoney
// Create Service for getting cartItems
// Create Service for creating orderItemsSent

// I only post to the backend once the button is clicked on this page
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [CartService, ItemService]
})

export class OrderPage {
  
  public deliveryTgl : boolean;
  public cartItems: Array<any>
  public cartItem: { itemId: string, quantity: Number }
  public orderItem: { [key: string]: Number }
  public orderItemSent: Array<{ [key: string]: Number }>
  public orderItems: Array<{ name: String, price: any, imageURL: String, quantity: Number }>
  public totalPrice: { subTotal: number, tax: number; total: number }
  public paymentInformation: Object;
  public pushUserId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public request: RequestOptions,
    private storage: Storage,
    private cartService: CartService,
    private itemService: ItemService,
    private alertCtrl: AlertController,
    private oneSignal: OneSignal) {
      this.pushUserId = ""
      this.cartItems = new Array<any>()
      this.orderItems = new Array<any>()
      this.totalPrice = { subTotal: 0, tax: 0, total: 0 }
      this.orderItemSent = new Array<{ "": 0 }>()
      this.paymentInformation = new Object
      this.deliveryTgl = false;
  }

  public GetPaymentInfo(): void {

    this.storage.get('token').then(value => {
      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({ headers: headers });
      this.http.get('https://keanubackend.herokuapp.com/customer/payment', options).map(res => res.json()).subscribe(
        data => {
          this.paymentInformation = data.data.paymentInfo;
          console.log(this.paymentInformation);
        }, err => {
          console.log(err);
        },
      )
    })
  }

  public ConfirmOrder() {
    // Service GetDate
    let dateObj = new Date();
    let month = (dateObj.getUTCMonth() + 1).toString(); //months from 1-12
    // If month/day doesn't have two digits
    if (month != "10" || "11" || "12" ){
      month = "0" + month;
    }
    let day = (dateObj.getUTCDate()).toString();
    if (day == "1" || day == "2" || day == "3" || day == "4" || day == "5" || day == "6" || day == "7" || day == "8" || day == "9"){
      day = "0" + day;
    }
    let year = dateObj.getUTCFullYear();
    let newdate = day + ":" + month + ":" + year


    this.alertCtrl.create({
      title: 'Order Confirmation',
      subTitle: 'Your order is confirmed and on its way',
      buttons: ['Okay']
    }).present();

    this.storage.get('token').then(value => {

      this.cartItems.forEach(element => {
        this.orderItem = { [element.itemId]: element.quantity }
        this.orderItemSent.push(this.orderItem);
      });

      let confirmOrder = {
        "date": newdate,
        "delivery": this.deliveryTgl,
        "items": this.orderItemSent,
        "price": this.totalPrice.total,
        "pushUserId": this.pushUserId
      }

      console.log(JSON.stringify(confirmOrder));

      let headers = new Headers();
      headers.append('token', value)

      let options = new RequestOptions({
        headers: headers
      })

      let body = confirmOrder;

      this.http.post('https://keanubackend.herokuapp.com/order/add', body, options).map(res => res.json()).subscribe(
        data => {
          console.log(data);
        }, err => {
          console.log(err);
        },
        () => {
          this.storage.remove('cartItem');
          this.navCtrl.setRoot(HomePage);
        }
      )
    })
  }

  public ChangeMoney(){
    if(this.deliveryTgl.valueOf() == true){
      this.totalPrice.subTotal += 3;
      this.totalPrice.tax = Math.round((this.totalPrice.subTotal * .13) * 100) / 100
      this.totalPrice.total = Math.round((this.totalPrice.subTotal + this.totalPrice.tax) * 100) / 100
    }
    else{
      this.totalPrice.subTotal -= 3;
      this.totalPrice.tax = Math.round((this.totalPrice.subTotal * .13) * 100) / 100
      this.totalPrice.total = Math.round((this.totalPrice.subTotal + this.totalPrice.tax) * 100) / 100
    }
  }

  ionViewDidLoad() {
    console.log('In Order Page');

    console.log('*** Set User Id ***');
    this.oneSignal.getIds().then(userObj => {
      this.pushUserId = userObj.userId;
      console.log('userId: '+this.pushUserId);
      
    })

    this.cartService.getCartAsObject().then(itemsData => {
      this.cartItems = itemsData;

      // Now I'll want to pass in the cart into the method GetItem
      this.itemService.GetItem(this.cartItems).then((data) => {
        this.orderItems = data;

        // I can get the price and others inside a new method
        // Do this code refactor inside the next iteration

        // Create a http request with a header
        this.GetPaymentInfo();

        // Create a Service for getting these
        this.orderItems.forEach(element => {
          this.totalPrice.subTotal += element.price
          this.totalPrice.subTotal = Math.round(this.totalPrice.subTotal * 100) / 100
        });

        this.totalPrice.tax = Math.round((this.totalPrice.subTotal * .13) * 100) / 100
        this.totalPrice.total = Math.round((this.totalPrice.subTotal + this.totalPrice.tax) * 100) / 100
      });
    })
  }
}
