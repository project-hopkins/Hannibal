import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
@Injectable()
export class ItemService {
    public location: { longitude: String, latitude: String }
    public locations: Array<{ longitude: String, latitude: String }>

    constructor(private http: Http) {
        this.location = { longitude: "", latitude:""}
        this.locations = new Array<any>()
    }

//     public GetClosestRestaurant(location) {
    
//         this.storage.get('token').then((value: string) => {
//             console.log(value);
//             let link = 'https://keanubackend.herokuapp.com/admin/item/add'
//             let header = new Headers({ 'Content-Type': 'application/json', 'token': value })
//             let data =
//               {
//                 'name': this.name,
//                 'description': this.description,
//                 'imageURL': this.imageURL,
//                 'price': Number(this.price),
//                 'calories': Number(this.calories),
//                 'category': this.category,
//                 'tags': [this.tags],
      
//               };
//             this.http.post(link, data, { headers: header })
//               .subscribe(
//               data => { console.log(data) },
//               err => {
//                 console.log('error')
//                 console.log(err);
//               },
//               () => {
//                 console.log('posted registration done')
//                 this.alertCtrl.create({
//                   title: 'Item Added',
//                   subTitle: 'Congratulations, a menu item has been added!',
//                   buttons: ['OK']
//                 }).present();
//                 this.navCtrl.setRoot('AdminPage');
//               }
//               )
//     }
 }