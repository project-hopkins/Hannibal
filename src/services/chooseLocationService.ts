import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
@Injectable()
export class LocationService {
	
   
    constructor(private http: Http) {
   
    }

   
	
	public getClosestRestaurant(lat,lng): Promise<Array<Object>> {
		//	this.storage.get('token').then((value: string) => {
		//	  console.log(value);
		let restaurants=[];
		return new Promise<Array<Object>>((resolve, request) => {
			  let link = 'https://keanubackend.herokuapp.com/restaurant/closest'
			  let header = new Headers({ 'Content-Type': 'application/json' })
			  let dataa =
				{
				
				  'longitude': lng,
				  'latitude': lat,
				  
		
				};
				let headers = new Headers();
				//Adds the token to the header with the key being token
				headers.append('Content-Type', 'application/json')
				let options = new RequestOptions({ headers: headers });
				this.http.post(link, dataa, options) .map(res => res.json())
			  .subscribe(
					data => {
									
						var obj =data.data.restaurants;
						for(var i=0; i<obj.length;i++)
						{
							var longg = obj[i].location.latitude;
							var latt = obj[i].location.longitude;					
							
							restaurants.push({
								title: obj[i].address.streetNumber+" "+obj[i].address.streetName,
								fullAddress: obj[i].address.city+", "+obj[i].address.province+" "+obj[i].address.postalCode,
								id:obj[i]._id.$oid,
								longitude:longg,
								latitude:latt
								
							});
							
						}
							return data;
					}, err => {
							console.log(err);
					},
					() => {
						resolve(restaurants)
						}
					
			)
		})
		}
 }