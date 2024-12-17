import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, DEFAULT_TASK } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  @Input() task: Task = { ...DEFAULT_TASK };
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.task);
  }

  onCancel() {
    this.cancel.emit();
  }
}
