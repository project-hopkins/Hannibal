import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
declare var google: any;
@IonicPage()
@Component({
	selector: 'page-location',
	templateUrl: 'location.html',
	providers: [
		Geolocation
	]
})

export class ChooseLocation {
	lat: any;
	lng: any;
	map: any;
	geocoder: any;
	restaurantItems=[];
        //geolocation: any;
	@ViewChild('map') mapElement: ElementRef;
	constructor(
		public navCtrl: NavController,
		private geolocation: Geolocation,
		public toastCtrl: ToastController,private http: Http,private storage: Storage) {
		this.accessLocation();
	}

	simpleToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}
	
	accessLocation() {

     this.geolocation.getCurrentPosition().then((resp) => {
			this.lat = resp.coords.latitude
			this.lng = resp.coords.longitude
			console.log(this.lat, this.lng)
			
			let latLng = new google.maps.LatLng(this.lat, this.lng);
			
			let mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP //ROADMAP
			};
			
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			this.addMarker(43.797678,-79.213331,"fixed");

			}).catch((error) => {
			console.log('Error getting location', error);
			this.simpleToast(error);
			});
		
			this.getClosestRestaurant();
			
		
	}
	// Function for adding a marker to the page.
    addMarker(lat,lng, desc){
		  
		   let marker = new google.maps.Marker({
		     map: this.map,
		     animation: google.maps.Animation.DROP,
		     position: new google.maps.LatLng(lat,lng)
		   });
		  
		   let content = "<h4>"+desc+"</h4>";          
		  console.log("lat lng value in function >>> "+lat+" , "+lng);
		  this.addInfoWindow(marker, content);
	  
		 }
		 addInfoWindow(marker, content){
			  
			   let infoWindow = new google.maps.InfoWindow({
			     content: content
			   });
			  
			   google.maps.event.addListener(marker, 'click', () => {
			     infoWindow.open(this.map, marker);
			   });
			  
		 }
    // Testing the addMarker function
    // function TestMarker() {
    //        CentralPark = new google.maps.LatLng(37.7699298, -122.4469157);
    //        addMarker(CentralPark);
    // }
	public getClosestRestaurant(): void {
		this.storage.get('token').then((value: string) => {
		  console.log(value);
		  let link = 'https://keanubackend.herokuapp.com/restaurant/closest'
		  let header = new Headers({ 'Content-Type': 'application/json', 'token': value })
		  let dataa =
			{
			//	'longitude': 45,
				//'latitude': -60,
			  'longitude': this.lng,
			  'latitude': this.lat,
			  
	
			};
			this.http.post(link, dataa, { headers: header }) .map(res => res.json())
		  .subscribe(
				data => {
					console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
					console.log(data);
					console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
					var obj =data.data.restaurants;
					for(var i=0; i<obj.length;i++)
					{
						console.log(obj[i].address.streetName+"   #########");
						var longg = obj[i].location.latitude;
						var latt = obj[i].location.longitude;
						var markers = new google.maps.LatLng(latt,longg);
						console.log(i+" from web service >>> "+latt+","+longg);
						this.addMarker(latt,longg,obj[i].address.streetName);
						
					}
					//restaurantItems.push(data.data.restaurants)
					console.log("restaurants are :: "+data.data.restaurants);
						//After receiving the data we will set the users data to the local storage
						//this.storage.set('userFullDetails', data.data.restaurants)
				}, err => {
						console.log(err);
				},
		)
})
		
			
		//   this.http.post(link, dataa, { headers: header })
		// 	.subscribe(
		// 	data => { 
		// 	//	var a = JSON.parse(data.toString());
		// 	//	console.log(data.data.restaurants +" >>>>>>  ");
		// 		// this.restaurantItems.push({
		// 		// 	'item': data.data.item,
		// 		// 	'quantity': quantity
		// 		// })
		// 	},
		// 	err => {
		// 	  console.log('error')
		// 	  console.log(err);
		// 	},
		// 	() => {
		// 		console.log('getting response')
				
		// //		this.menuItems = this.navParams.get('data');
		// 	 // this.navCtrl.setRoot('AdminPage');
		// 	}
		// 	)
	
		
	  }

}
