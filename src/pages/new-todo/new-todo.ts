import { Todos } from './../../providers/todos';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

class Todo {
  public task: string;
  public deadline: Date;
  public public: number;
  public completed: boolean;
  public user: string;
  constructor() {
    this.task = '';
    this.deadline = new Date();
    this.public = 0;
    this.completed = false;
    this.user = '';
  } 
}

@Component({
  selector: 'page-new-todo',
  templateUrl: 'new-todo.html'
})
export class NewTodoPage {
  private todo: Todo;

  constructor(public navCtrl: NavController, private todoService: Todos, private toastCtrl: ToastController) {
    this.todo = new Todo();
  }

  save() {
    this.todoService.newTodo(this.todo).then((result) => {
      this.todoService.todos.push(result);
      console.log("todo added");
    }, (err) => {
      console.log("can not add todo");
    });
  }

}
