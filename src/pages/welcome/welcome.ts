import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { Auth } from './../../providers/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public authService: Auth) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.authService.loggedin().then(isLoggedin => {
        if (isLoggedin) {
          this.authService.setAuth();
          this.navCtrl.push(HomePage);
        }
        else {
          this.navCtrl.push(LoginPage);
        }
      }, error => {
        this.navCtrl.push(LoginPage);
      });
    }, 2000);
  }

}
