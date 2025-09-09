import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule
  ],
  template: `
  <mat-card class="todo-card">
    <h2>To-Do List</h2>

    <div class="input-container">
      <mat-form-field appearance="outline" class="full-width">
        <input matInput placeholder="Escribe una tarea..." [(ngModel)]="newTask" (keyup.enter)="addTask()">
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="addTask()">
        <mat-icon>add</mat-icon>
      </button>
    </div>

    <mat-list>
      <mat-list-item *ngFor="let task of tasks">
        <span 
          [class.completed]="task.completed"
          (click)="toggleTask(task)">
          {{ task.text }}
        </span>
        <button mat-icon-button color="warn" (click)="deleteTask(task.id)">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  </mat-card>
  `,
  styles: [`
    .success-snackbar {
      background-color: #4caf50;
      color: white;
    }
    
    .warn-snackbar {
      background-color: #f44336;
      color: white;
    }

    .todo-card {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      text-align: center;
    }

    .input-container {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      gap: 0.5rem;
    }

    .full-width {
      flex: 1;
    }

    .completed {
      text-decoration: line-through;
      color: gray;
      cursor: pointer;
    }

    mat-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    mat-list-item span {
      cursor: pointer;
    }
  `]
})
export class TodoListComponent {
  tasks: Task[] = [];
  newTask: string = '';
  private nextId: number = 1;

  constructor(private _snackBar: MatSnackBar) {}

  addTask() {
    if (!this.newTask.trim()) return;

    const taskText = this.newTask.trim();
    this.tasks.push({
      id: this.nextId++,
      text: taskText,
      completed: false
    });
    this.newTask = '';
    this._snackBar.open('Tarea insertada', 'Cerrar', {
      duration: 2000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this._snackBar.open('Tarea borrada', 'Cerrar', {
      duration: 2000,
      panelClass: ['warn-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
