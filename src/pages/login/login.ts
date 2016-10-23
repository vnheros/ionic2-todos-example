import { Auth } from './../../providers/auth';
import { SignupPage } from './../signup/signup';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  login() {

    this.showLoader();

    let credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      //console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });

  }

  launchSignup() {
    this.navCtrl.push(SignupPage);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

}
