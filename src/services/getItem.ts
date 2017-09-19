import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ItemService {
    public orderItem: { name: String, price: any, imageURL: String, quantity: Number }
    public orderItems: Array<{ name: String, price: any, imageURL: String, quantity: Number }>

    constructor(private http: Http) {
        this.orderItem = { name: "", price: 0, imageURL: "", quantity: 0}
        this.orderItems = new Array<any>()
    }

    public GetItem(cartItem) {
        return new Promise<Array<any>>((resolve, reject) => {
            let index: number = 0;
            cartItem.forEach(element => {

                this.http.get(`https://keanubackend.herokuapp.com/item/id/${element.itemId}`).
                    map(res => res.json()).subscribe(
                    data => {
                        index++;
                        this.orderItem = { name: data.data.item.name, 
                        price: data.data.item.price * element.quantity, 
                        imageURL : data.data.item.imageURL, 
                        quantity : element.quantity }

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
}