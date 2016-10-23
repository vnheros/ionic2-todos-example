import { Auth } from './auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Todos {
  TODOS_URL: string = "http://localhost:3000/todos";
  todos: any;

  constructor(public http: Http, private authService: Auth) {
    
  }

  getTodos() {
    return new Promise((resolve, reject) => {
      this.http.get(this.TODOS_URL, {headers: this.authService.headers})
        .map(res => res.json())
        .subscribe(data => {
          this.todos = data;
          //console.log(this.todos);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  newTodo(todo) {
    return new Promise((resolve, reject) => {
      this.http.post(this.TODOS_URL, JSON.stringify(todo), {headers: this.authService.headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
      });
    });
  }

  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.TODOS_URL +'/' + id, {headers: this.authService.headers})
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
	    });
    });
  }

}
