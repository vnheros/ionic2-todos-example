import { JwtHelper } from './../helpers/jwt-helper';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {
	jwtHelper: JwtHelper = new JwtHelper();
	LOGIN_URL: string = "http://localhost:3000/user/login";
	SIGNUP_URL: string = "http://localhost:3000/user/create";
	CHECK_URL = "http://localhost:3000/user/check/";
	headers: Headers = new Headers({ "Content-Type": "application/json" });
	token: any;
	user: string;

	constructor(public http: Http, public storage: Storage) {

	}

	loggedin() {
		return this.storage.get('id_token').then((value) => {
			this.token = value;
			return this.token && !this.jwtHelper.isTokenExpired(this.token, null);
		}, (error) => {
			return false;
		});
	}

	check(user) {
		return new Promise((resolve, reject) => {
			this.http.get(this.CHECK_URL + user, { headers: this.headers })
				.subscribe(
					data => {
						resolve(data);
					},
					err => {
						reject(err);
					}
				);
		});
	}

	login(credentials) {
		return new Promise((resolve, reject) => {
			this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.headers })
				.map(res => res.json())
				.subscribe(
					data => {
						this.authSuccess(data.id_token);
						resolve(data);
					},
					err => {
						reject(err);
					}
				);
		});
	}

	signup(credentials) {
		return new Promise((resolve, reject) => {
			this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.headers })
				.map(res => res.json())
				.subscribe(
					data => {
						this.authSuccess(data.id_token);
						resolve(data);
					},
					err => {
						reject(err);
					}
				);
		});
	}

	authSuccess(token) {
		this.token = token;
		this.setAuth();
		this.storage.set('id_token', token);
	}

	setAuth() {
		this.user = this.jwtHelper.decodeToken(this.token).username;
		this.headers.append('Authorization', 'Bearer ' + this.token);
	}

	logout() {
		this.storage.set('id_token', '');
		this.user = null;
	}

}