import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

@Injectable()
export class MenuCallService {
    public menuItems: any;

    constructor(private http: Http) { }

    public async getMenu(category) {

        return await this.http.get(`https://keanubackend.herokuapp.com/item/category/${category}`).map(res => res.json().data.items).toPromise();
    }
}
