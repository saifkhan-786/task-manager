import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../interfaces/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<void>();
  @Output() update = new EventEmitter<{ title: string; description: string }>();

  onDelete() {
    this.delete.emit();
  }

  onToggle() {
    this.toggle.emit();
  }

  onEdit() {
    this.task.editMode = !this.task.editMode;
  }

  onSave(title: string, description: string) {
    this.update.emit({ title, description });
    this.task.editMode = false;
  }
}
