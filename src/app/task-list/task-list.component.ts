import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.loadTasks();
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleCompletion(id: number) {
    this.taskService.toggleTaskCompletion(id);
  }

  updateTask(id: number, update: { title: string; description: string }) {
    this.taskService.updateTask(id, update);
  }
}
