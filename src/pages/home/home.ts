import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { SubmenuPage } from '../submenu/submenu';
import { Http } from '@angular/http';
import { MenuCallService } from '../../services/getMenu';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/userService';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public user: Object;
  public testUser: any;
  public userAdmin: boolean;
  public userNotAdmin: boolean;
  public menuItems;
  public itemsInSubmenu: Object;
  private menuCategories: Array<string> = ["Starter", "Salads", "Entrees", "Dessert"];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private menuCall: MenuCallService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private userService: UserService) {

    let loading: Loading = this.loadingCtrl.create({});
    loading.present();

    // Instantiate the itemsInSubMenu object with 0 for each item
    this.itemsInSubmenu = {
      'Starter': 0,
      'Salads': 0,
      'Entrees': 0,
      'Dessert': 0
    }

    this.http.get('https://keanubackend.herokuapp.com').subscribe(() => { }, () => { }, () => loading.dismiss());
    this._getCategoriesCount();
    
  }


  /**
   * The following method is already in a service. Althought it doesnt really need it. 
   * 
   * Method that activates when a menu item is clicked.
   * Sends the string of the menu item clicked (ie. starter) to the backend and retrieves the food items from that menu.
   * Sends this data to the next page.
   * @param {string} type 
   * @returns {Promise<any>} 
   * @memberof HomePage
   */
  public async launchSubMenuPage(type: string): Promise<any> {
    let menuItems=  await this.menuCall.getMenu(type);
    this.navCtrl.push('SubmenuPage', { data: menuItems });
  }

  ionViewDidLoad() {
    this.userService.getUserInfo()
    console.log('ionViewDidLoad HomePage');
    this.storage.get('token').then((value: string) => {
      console.log(value)
    })

    this.checkAdminRights();
  }


  /**
   * Grabs the number of items in each menu category.
   * 
   * @private
   * @memberof HomePage
   */
  private _getCategoriesCount():void{
    this.menuCategories.forEach(element => {
      this.http.get(`https://keanubackend.herokuapp.com/item/category/${element}/count`).map(res => res.json()).subscribe(
        data => {
          this.itemsInSubmenu[element] = data.data.count;
          console.log(element + " " + data.data.count);
        });
    });
  }
  public checkAdminRights() {
    this.storage.get('adminRights').then((val) => {
      this.testUser = val;
      if (this.testUser == true) {
         this.userAdmin = true;
         this.userNotAdmin = false;
      } else {
        this.userAdmin = false;
        this.userNotAdmin = true;
      }
    });
  }
}
