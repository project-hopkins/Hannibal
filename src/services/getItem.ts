import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Validators } from '@angular/forms/src/validators';

@Injectable()
export class ItemService {
    public orderItem: { name: String, price: any, imageURL: String, quantity: Number }
    public orderItems: Array<{ name: String, price: any, imageURL: String, quantity: Number }>
    public itemRating: string;
    public rating: any;
    public item: string;
    public options: any;

    constructor(private http: Http, public storage: Storage) {
        this.orderItem = { name: "", price: 0, imageURL: "", quantity: 0 }
        this.orderItems = new Array<any>()
        this.item = '';
    }

    public GetItem(cartItem) {
        return new Promise<Array<any>>((resolve, reject) => {
            let index: number = 0;
            cartItem.forEach(element => {

                this.http.get(`https://keanubackend.herokuapp.com/item/id/${element.itemId}`).
                    map(res => res.json()).subscribe(
                    data => {
                        index++;
                        this.orderItem = {
                            name: data.data.item.name,
                            price: data.data.item.price * element.quantity,
                            imageURL: data.data.item.imageURL,
                            quantity: element.quantity
                        }

                        this.orderItems.push(this.orderItem);
                    },
                    err => console.log(err),
                    () => {
                        if (index == cartItem.length) {
                            resolve(this.orderItems)
                        }
                    })
            });
        })
    }

    public getItemRating(item: string) {
            this.storage.get('token').then(value => {
            let headers = new Headers();
            headers.append('token', value)
            let options = new RequestOptions({ headers: headers });
            return this.http.get('https://keanubackend.herokuapp.com/rate/item/' + item, options).map(
                res => res.json().data).toPromise();
        })
    }

    public postItemRating(): void {
        this.storage.get('token').then((value: string) => {
            let link = 'https://keanubackend.herokuapp.com/rate/item';
            let header = new Headers({ 'Content-Type': 'application/json', 'token': value });
            let body =
                {
                    'itemid': this.item,
                    'rating': this.rating
                };
            this.http.post(link, body, { headers: header })
                .subscribe(
                (data) => { console.log(data) },
                (err) => {
                    console.log('error');
                    console.log(err);
                }
                )
        }
        )
    }
}