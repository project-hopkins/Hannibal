import { Component } from '@angular/core';
import { NavParams, IonicPage, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { UserService } from '../../services/userService';
import { ProfileModalPage } from '../profile-modal/profile-modal';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService]
})
export class ProfilePage {
  public user: Object;
  public informationSent: Object;
  public orders: Array<Object>;
  public ordersItems: Array<String>;

  constructor(
    public navParams: NavParams,
    public http: Http,    
    private storage: Storage,
    private userService: UserService,
    private modalCtrl : ModalController) {
    this.user = new Object();
    this.orders = new Array<Object>();
    this.ordersItems = new Array<String>();
   
  }

  // Will accept parameters of fields to be edited
  public openEditProfileModal(informationType: String){
    // Depending on the information. Im showing different things
    
    let editProfileModal = this.modalCtrl.create('ProfileModalPage', {informationType});
    editProfileModal.present();
  }

  async ionViewDidLoad() {
    //Gets the Users full details from local storage for use on page
    let count = 0;

    this.user = await this.storage.get('userFullDetails');

    // this.storage.get('userFullDetails').then((val) => {
    //   this.user = val;
    // });

    
    this.orders = await this.userService.getOrderHistory();

    this.orders.forEach((element, index) => {
      this.orders[index]['date'] = this.orders[index]['date'].toString().substring(0, 17);
      element['items'].forEach(async (itemObject, jindex) => {
        let itemid = itemObject['itemId']
        console.log(itemObject);
        let itemData = await this.http.get(`https://keanubackend.herokuapp.com/item/id/${itemid}/`).map(res => res.json()).toPromise();
        this.orders[index]['items'][jindex]['name'] = itemData.data.item.name;
      });
    });  
    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
      console.log(this.user);
    });
    this.userService.getOrderHistory();

  }

}