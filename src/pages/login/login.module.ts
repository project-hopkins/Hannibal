import { UserService } from '../../services/userService';
import { NgModule } from '@angular/core';
import { LoginPage } from './login';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [LoginPage],
  imports: [IonicPageModule.forChild(LoginPage)],
  providers: [UserService],
  entryComponents: [
    LoginPage
  ]
})
export class LoginPageModule { }