import { PasswordValidator } from './../../validators/password';
import { HomePage } from './../home/home';
import { Auth } from './../../providers/auth';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  loading: any;
  signupCreds: any;
  username: any;
  password: any;
  email: any;
  usernameIsValid: boolean = false;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    this.signupCreds = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      'password': ['', PasswordValidator.checkPassword],
      'email': ['', Validators.required]
    });
    this.username = this.signupCreds.controls['username'];
    this.password = this.signupCreds.controls['password'];
    this.email = this.signupCreds.controls['email'];
  }

  ionViewLoaded() {
    
  }

  signup(credentials){

    this.showLoader();

  	this.authService.signup(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
  	}, (err) => {
  		this.loading.dismiss();
  	});

  }

  checkUsername(username) {
    if (username.length < 4) {
      this.usernameIsValid = false;
      return;
    }
    this.authService.check(username.toLowerCase()).then(
      (success) => {
        this.usernameIsValid = true;
      },
      (err) => {
        this.usernameIsValid = false;
      }
    );
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Creating new account...'
    });

    this.loading.present();
  }

}
