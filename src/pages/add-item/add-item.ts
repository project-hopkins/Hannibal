import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { concat } from 'rxjs/observable/concat';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {
  public name: string;
  public description: string;
  public menuImage: string;
  public price: number;
  public calories: number;
  public category: string;
  public tags: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private alertCtrl: AlertController,
    private storage: Storage) {

    this.name = '';
    this.description = '';
   // this.menuImage = '';
    this.price = null;
    this.calories = null;
    this.category = '';
    this.tags = '';
  }

  public addItem(): void {
    this.storage.get('token').then((value: string) => {
      console.log(value);
      let link = 'https://keanubackend.herokuapp.com/admin/item/add'
      let header = new Headers({ 'Content-Type': 'application/json', 'token': value })
      let data =
        {
          'name': this.name,
          'description': this.description,
          'imageURL': this.menuImage,
          'price': Number(this.price),
          'calories': Number(this.calories),
          'category': this.category,
          'tags': [this.tags],

        };
      this.http.post(link, data, { headers: header })
        .subscribe(
        data => { console.log(data) },
        err => {
          console.log('error')
          console.log(err);
        },
        () => {
          console.log('posted registration done')
          this.alertCtrl.create({
            title: 'Item Added',
            subTitle: 'Congratulations, a menu item has been added!' + this.menuImage,
            buttons: ['OK']
          }).present();
          this.navCtrl.setRoot('AdminPage');
        }
        )

    })
  }
  //Uses the camera to select take a photo for the menu item
  useCamera(){
    // tells the method to use the camera to get the image
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetHeight: 400,
      targetWidth: 600
      }).then((imageData) => {
        // sets the data to the menuImage variable to be stored
        this.menuImage = "data:image/jpeg;base64, " + imageData;
      }, (err) => {
        console.log(err);
      })
  }
  // Uses the phones native photoalbum to select an image to upload
  selectImage(){
    Camera.getPicture({
      // tells the method to use the photo album to get the image
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      // allows for the user to only select images to uplaod
      mediaType: Camera.MediaType.PICTURE,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      // sets the data to the menuImage property
      this.menuImage = 'data: image/jpeg;base64, ' + imageData;
    }, (err) => {
      console.log(err);
    })
  }
}
