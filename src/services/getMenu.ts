import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MenuCallService {
    public menuItems: any;

    constructor(private http: Http) {}

    public getMenu(category) {
        return new Promise<Object>((resolve, reject) => {
            this.http.get(`https://keanubackend.herokuapp.com/item/category/${category}`).map(res => res.json()).subscribe(
                data => {
                    this.menuItems = data.data.items
                },
                err => {
                    console.log("Oops!");
                    reject(null)
                },
                () => {
                    resolve(this.menuItems);
                }
            );
        })
        //console.log("From GetMenu.ts " + this.menuItems);
    }
}