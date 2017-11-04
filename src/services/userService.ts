import { Subject } from 'rxjs/Rx';
import { async } from '@angular/core/testing';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    public orders: Array<Object>;
    private _isAdmin: Subject<boolean>;

    constructor(
        private http: Http,
        public request: RequestOptions,
        public storage: Storage
    ) {
        this.orders = new Array<Object>();
        this._isAdmin = new Subject<boolean>();
    }


    public async login(username: string, password: string): Promise<any> {
        let headers = new Headers({ 'username': username, 'password': password });
        return this.http.post('https://keanubackend.herokuapp.com/login', null, { headers: headers })
            .map(res => {
                // this._isAdmin
                this._isAdmin.next(res.json().data.adminRights);
                return res.json().data
            })
            .toPromise();
    }

    /**
     * Gets Users info and stores it locally so the information can be used throughout the app
     * 
     * @memberof userService
     */
    public getUserInfo(): void {
        //This is where we get the token for the backend validation
        this.storage.get('token').then(value => {
            //Creates a header for the get request
            let headers = new Headers();
            //Adds the token to the header with the key being token
            headers.append('token', value)
            let options = new RequestOptions({ headers: headers });
            //This actually does the get request with the header/options 
            this.http.get('https://keanubackend.herokuapp.com/customer/profile', options).map(res => res.json()).subscribe(
                data => {
                    //After receiving the data we will set the users data to the local storage
                    this.storage.set('userFullDetails', data.data.user)
                }, err => {
                    console.log(err);
                },
            )
        })
    }


    /**
     * Returns a users order history 
     * 
     * @memberof userService
     */
    public getOrderHistory(): void {
        this.storage.get('token').then(value => {
            let headers = new Headers();
            headers.append('token', value)
            let options = new RequestOptions({ headers: headers });
            this.http.get('https://keanubackend.herokuapp.com/order', options).map(res => res.json()).subscribe(
                data => {
                    this.orders = data.data.orders;
                }, err => {
                    console.log(err);
                },
            )
        })
    }
}