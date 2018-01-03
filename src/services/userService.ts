import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs/Rx';


@Injectable()
export class UserService {

    public orders: Array<Object>;

    public isAdmin: Subject<boolean>;
    public isLoggedIn: Subject<boolean>;

    /**
     * Creates an instance of UserService.
     * @param {Http} http 
     * @param {RequestOptions} request 
     * @param {Storage} storage 
     * @memberof UserService
     */
    constructor(private http: Http, public request: RequestOptions, public storage: Storage) {
        this.orders = new Array<Object>();
        this.isAdmin = new Subject<boolean>();
        this.isLoggedIn = new Subject<boolean>();

        this.isLoggedIn.next(false);
        this.isAdmin.next(false);

        this._checkLoggedIn();
    }

    /**
     * 
     * Check if the user is already logged in
     * 
     * @private
     * @returns {Promise<any>} 
     * @memberof UserService
     */
    private async _checkLoggedIn(): Promise<any> {
        let token = await this.storage.get('token');
        let admin = await this.storage.get('adminRights');

        if (token) { this.isLoggedIn.next(true); }
        admin ? this.isAdmin.next(true) : this.isAdmin.next(false);
    }

    public getIsAdminObservable(){
        return this.isAdmin.asObservable();
    }

    /**
     * Login in a user and set the users token
     * and if they are an admin
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {Observable<any>} 
     * @memberof UserService
     */
    public login(username: string, password: string): Observable<any> {
        let headers = new Headers({ 'username': username, 'password': password });
        return this.http.post('https://keanubackend.herokuapp.com/login', null, { headers: headers })
            .map(res => res.json().data)
            .do(
            async (data) => {
                await this.storage.set('token', data.token);
                await this.storage.set('adminRights', data.adminRights);
                this.isLoggedIn.next(true);
                this.isAdmin.next(data.adminRights);
            }
            );
    }

    /**
     * Removes stored user info
     * 
     * @returns {Promise<any>} 
     * @memberof UserService
     */
    public async logout(): Promise<any> {
        await this.storage.remove('token');
        await this.storage.remove('adminRights');
        await this.storage.remove('userFullDetails');
        this.isLoggedIn.next(false);
        this.isAdmin.next(false);
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
    public async getOrderHistory(): Promise<any> {
        let token = await this.storage.get('token');
        let headers = new Headers();
        headers.append('token', token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get('https://keanubackend.herokuapp.com/order', options).map(res => res.json().data.orders).toPromise();
        // this.storage.get('token').then(value => {
        //     let headers = new Headers();
        //     headers.append('token', value)
        //     let options = new RequestOptions({ headers: headers });
        //     this.http.get('https://keanubackend.herokuapp.com/order', options).map(res => res.json()).subscribe(
        //         data => {
        //             this.storage.set('orders', data.data.orders)
        //         }, err => {
        //             console.log(err);
        //         },
        //     )
        // })
    }
}
