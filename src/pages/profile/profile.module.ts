import { NgModule } from '@angular/core';
import { ProfilePage} from './profile';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [ProfilePage],
  imports: [IonicPageModule.forChild(ProfilePage),
    Ionic2RatingModule],
  entryComponents: [
    ProfilePage
  ]
})
export class ProfilePageModule { }