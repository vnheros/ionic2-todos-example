import { NewTodoPage } from './../new-todo/new-todo';
import { LoginPage } from './../login/login';
import { Auth } from './../../providers/auth';
import { Todos } from './../../providers/todos';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public todoService: Todos, public authService: Auth) {
    
  }

  ionViewDidLoad(){
    this.todoService.getTodos();
  }

  newTodo(){
    this.navCtrl.push(NewTodoPage);
  }

  deleteTodo(todo){
    this.todoService.deleteTodo(todo.id).then((result) => {
      let index = this.todoService.todos.indexOf(todo);
      if(index > -1){
  			this.todoService.todos.splice(index, 1);
      } 
    }, (err) => {
    	console.log("Can not delete todo");
    });
  }

  logout(){ 
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
