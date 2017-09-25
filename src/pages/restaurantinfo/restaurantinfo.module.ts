import { NgModule } from '@angular/core';
import { RestaurantinfoPage} from './restaurantinfo';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [RestaurantinfoPage],
  imports: [IonicPageModule.forChild(RestaurantinfoPage)],
  entryComponents: [
    RestaurantinfoPage
  ]
})
export class RestaurantinfoPageModule { }