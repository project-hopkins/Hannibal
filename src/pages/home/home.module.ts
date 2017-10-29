import {MenuCallService} from '../../services/getMenu';
//home.module.ts
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { UserService } from '../../services/userService';

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage),
  ],
  providers: [MenuCallService, UserService],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule { }
