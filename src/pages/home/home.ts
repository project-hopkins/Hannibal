import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { SubmenuPage } from '../submenu/submenu';
import { Http } from '@angular/http';
import { MenuCallService } from '../../services/getMenu';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { userService } from '../../services/userService';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MenuCallService, userService]
})
export class HomePage {
  public menuItems;
  public SubMenuPage = SubmenuPage;
  public itemsInSubmenu: Object
  public user: Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private menuCall: MenuCallService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private userService: userService
  ) {
    this.user = new Object;
    let loading: Loading = this.loadingCtrl.create({});
    loading.present();

    this.itemsInSubmenu = {
      'Starter': 0,
      'Salad': 0,
      'Entree': 0,
      'Dessert': 0
    };

    this.http.get(`https://keanubackend.herokuapp.com/item/category/Starter/count`).map(res => res.json()).subscribe(
      data => {
        this.itemsInSubmenu['Starter'] = data.data.count;
      });
    this.http.get(`https://keanubackend.herokuapp.com/item/category/Salads/count`).map(res => res.json()).subscribe(
      data => {
        this.itemsInSubmenu['Salad'] = data.data.count;
      });
    this.http.get(`https://keanubackend.herokuapp.com/item/category/Entrees/count`).map(res => res.json()).subscribe(
      data => {
        this.itemsInSubmenu['Entree'] = data.data.count;
      });
    this.http.get(`https://keanubackend.herokuapp.com/item/category/Dessert/count`).map(res => res.json()).subscribe(
      data => {
        this.itemsInSubmenu['Dessert'] = data.data.count;
      });

    this.http.get('https://keanubackend.herokuapp.com').subscribe(() => { }, () => { }, () => loading.dismiss());
  }

  public launchSubMenuPage(type: string): void {
    let loading: Loading = this.loadingCtrl.create({})
    loading.present();

    this.menuCall.getMenu(type).then((menuItems: Array<any>) => {
      this.navCtrl.push(this.SubMenuPage, { data: menuItems }).then(() => loading.dismiss())
    })

  }

  ionViewDidLoad() {
    //Calls the GetUserInfo() function so it will store all the users info locally for use throughout the project
    this.userService.GetUserInfo()
    this.storage.get('userFullDetails').then((val) => {
      this.user = val;
    });
    console.log('ionViewDidLoad HomePage');
    this.storage.get('token').then((value: string) => {
    })
  }
}