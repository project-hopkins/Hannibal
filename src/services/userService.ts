import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class userService {
    public paymentInformation: Object
    public addressInformation: Object
    public personalInformation: Object
    public fullName: Object
    public orders: Array<Object>


    constructor(
        private http: Http,
        public request: RequestOptions,
        public storage: Storage,
        //public headers: Headers
    ) {
        this.paymentInformation = new Object
        this.addressInformation = new Object
        this.personalInformation = new Object
        this.fullName = new Object
        this.orders = new Array<Object>()

    }
    public GetUserInfo(): void {
        this.storage.get('token').then((value: string) => {
            console.log(value)
        })
        this.storage.get('token').then(value => {
            let headers = new Headers();
            headers.append('token', value)

            let options = new RequestOptions({ headers: headers });
            this.http.get('https://keanubackend.herokuapp.com/customer/profile', options).map(res => res.json()).subscribe(
                data => {
                    this.storage.set('userAddress', data.data.user.address)
                    this.storage.set('fullName', data.data.user.displayName)
                    this.storage.set('userFullDetails', data.data.user)
                    this.storage.set('paymentInfo', data.data.user.paymentInfo)
                }, err => {
                    console.log(err);
                },
            )
        })
    }
        public GetOrderHistory(): void {
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