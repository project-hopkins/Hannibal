import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LocationService } from '../../services/chooseLocationService';
declare var google: any;
@IonicPage()
@Component({
	selector: 'page-location',
	templateUrl: 'location.html',
	providers: [
		Geolocation, LocationService
	]
})

export class ChooseLocation {
	lat: any;
	lng: any;
	map: any;
	geocoder: any;
	groceries: any;
	restaurantItems = [];

	//geolocation: any;
	@ViewChild('map') mapElement: ElementRef;
	constructor(
		public navCtrl: NavController,
		private geolocation: Geolocation,
		public toastCtrl: ToastController,
		private locationService: LocationService,
		private http: Http, private storage: Storage) {
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
	public GoToOrderPage() {
		this.navCtrl.push('OrderPage');
	}
	accessLocation() {

		this.geolocation.getCurrentPosition().then((resp) => {
			this.lat = resp.coords.latitude
			this.lng = resp.coords.longitude
			console.log(this.lat, this.lng)

			let latLng = new google.maps.LatLng(this.lat, this.lng);
			let mapOptions = {
				center: latLng,
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP //ROADMAP
			};

			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			//create blue pin for current location
			var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "0000FF",
				new google.maps.Size(21, 34),
				new google.maps.Point(0, 0),
				new google.maps.Point(10, 34));
			// add marker for current location
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(this.lat, this.lng),
				map: this.map,
				icon: pinImage,
				//shadow: pinShadow
			});
			//
			this.locationService.getClosestRestaurant(this.lat, this.lng).then(itemsData => {
				this.restaurantItems = itemsData;
				for (let i = 0; i < this.restaurantItems.length; i++) {
					this.addMarker(this.restaurantItems[i].latitude, this.restaurantItems[i].longitude, this.restaurantItems[i].title)
				}
			});


		}).catch((error) => {
			console.log('Error getting location', error);
			this.simpleToast(error);
		});



	}
	// Function for adding a marker to the page.
	addMarker(lat, lng, desc) {

		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(lat, lng)
		});

		let content = "<h4>" + desc + "</h4>";
		console.log("lat lng value in function >>> " + lat + " , " + lng);
		this.addInfoWindow(marker, content);

	}
	addInfoWindow(marker, content) {

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

	}
	//// Testing the addMarker function

	public getClosestRestaurant(): void {
		this.storage.get('token').then((value: string) => {
			console.log(value);
			let link = 'https://keanubackend.herokuapp.com/restaurant/closest'
			let header = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
			let dataa =
				{
					//	'longitude': 45,
					//'latitude': -60,
					'longitude': this.lng,
					'latitude': this.lat,


				};
			this.http.post(link, dataa, { headers: header }).map(res => res.json())
				.subscribe(
				data => {
					console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
					console.log(data);
					console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
					var obj = data.data.restaurants;
					for (var i = 0; i < obj.length; i++) {
						console.log(obj[i].address.streetName + "   #########");
						var longg = obj[i].location.latitude;
						var latt = obj[i].location.longitude;
						var markers = new google.maps.LatLng(latt, longg);
						console.log(i + " from web service >>> " + latt + "," + longg);
						this.addMarker(latt, longg, obj[i].address.streetName);
						this.restaurantItems.push({
							title: obj[i].address.streetNumber + " " + obj[i].address.streetName,
							fullAddress: obj[i].address.city + ", " + obj[i].address.province + " " + obj[i].address.postalCode,
							id: obj[i]._id.$oid

						});
					}
					//restaurantItems.push(data.data.restaurants)
					console.log("restaurants are :: " + data.data.restaurants);
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
