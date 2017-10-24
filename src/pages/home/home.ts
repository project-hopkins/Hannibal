import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { SubmenuPage } from '../submenu/submenu';
import { Http } from '@angular/http';
import { MenuCallService } from '../../services/getMenu';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MenuCallService]
})
export class HomePage {
  public menuItems;
  public itemsInSubmenu: Object;
  private menuCategories: Array<string> = ["Starter", "Salads", "Entrees", "Dessert"];
  private isAdmin: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private menuCall: MenuCallService,
    private storage: Storage,
    private loadingCtrl: LoadingController) {

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

    // Grabs the number of items in each menu category.
    this.menuCategories.forEach(element => {
      this.http.get(`https://keanubackend.herokuapp.com/item/category/${element}/count`).map(res => res.json()).subscribe(
        data => {
          this.itemsInSubmenu[element] = data.data.count;
          console.log(element + " " + data.data.count);
        });
    });
  }

  // The following method is already in a service. Althought it doesnt really need it. 
  /**
   * Method that activates when a menu item is clicked.
   * Sends the string of the menu item clicked (ie. starter) to the backend and retrieves the food items from that menu.
   * Sends this data to the next page.
   * 
   * @param {string} type 
   * @memberof HomePage
   */
  public launchSubMenuPage(type: string): void {
    let loading: Loading = this.loadingCtrl.create({})
    loading.present();

    this.menuCall.getMenu(type).then((menuItems: Array<any>) => {
      /* console.log('###### From HOME START ######')
      console.log(menuItems)
      console.log('###### From HOME END ######') */
      this.navCtrl.push('SubmenuPage', { data: menuItems }).then(() => loading.dismiss())
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.storage.get('token').then((value: string) => {
      console.log(value)
    });
    this.storage.get('adminRights').then(isAdmin => this.isAdmin = isAdmin);

  }
}
