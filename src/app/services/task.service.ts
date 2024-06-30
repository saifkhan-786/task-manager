import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  getTasks() {
    return this.tasks;
  }

  addTask(title: string, description: string) {
    const newTask: Task = {
      id: this.nextId++,
      title,
      description,
      completed: false,
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  toggleTaskCompletion(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
    this.saveTasks();
  }

  updateTask(id: number, update: { title: string; description: string }) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.title = update.title;
      task.description = update.description;
    }
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.nextId =
        this.tasks.length > 0
          ? Math.max(...this.tasks.map((t) => t.id)) + 1
          : 1;
    }
  }
}
