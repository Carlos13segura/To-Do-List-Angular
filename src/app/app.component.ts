import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent],
  template: `
    <app-todo-list></app-todo-list>
  `,
  styles: []
})
export class AppComponent {
  title = 'todo-app';
}
