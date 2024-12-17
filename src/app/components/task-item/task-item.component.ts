import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { formatTaskDate } from '../../utils/task.utils';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() statusToggle = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  formatTaskDate = formatTaskDate;

  onStatusToggle() {
    this.statusToggle.emit(this.task);
  }

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task);
  }
}
