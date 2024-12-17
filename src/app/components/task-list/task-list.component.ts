import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../shared/empty-state/empty-state.component';
import { Task, TaskStatus, DEFAULT_TASK } from '../../models/task.model';
import { NotificationService } from '../../utils/notification.service';
import { MESSAGES } from '../../constants/messages';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskFormComponent,
    TaskItemComponent,
    ModalComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showForm = false;
  selectedTask: Task = { ...DEFAULT_TASK };
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  showTaskForm() {
    this.selectedTask = { ...DEFAULT_TASK };
    this.showForm = true;
  }

  hideTaskForm() {
    this.showForm = false;
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
    this.showForm = true;
  }

  saveTask(task: Task) {
    const operation = task.id
      ? this.taskService.updateTask(task.id, task)
      : this.taskService.createTask(task);

    operation.subscribe({
      next: () => {
        this.loadTasks();
        this.hideTaskForm();
        this.notificationService.showSuccess(
          task.id ? MESSAGES.TASK.UPDATE_SUCCESS : MESSAGES.TASK.CREATE_SUCCESS
        );
      }
    });
  }

  deleteTask(task: Task) {
    if (task.id && this.notificationService.showConfirmation(MESSAGES.TASK.DELETE_CONFIRM)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.loadTasks();
          this.notificationService.showSuccess(MESSAGES.TASK.DELETE_SUCCESS);
        }
      });
    }
  }

  toggleStatus(task: Task) {
    if (task.id) {
      const newStatus: TaskStatus = task.status === 'concluido' ? 'pendente' : 'concluido';
      const updatedTask: Task = {
        ...task,
        status: newStatus
      };

      this.taskService.updateTask(task.id, updatedTask).subscribe({
        next: () => {
          this.loadTasks();
          this.notificationService.showSuccess(
            newStatus === 'concluido' ? MESSAGES.TASK.MARK_COMPLETED : MESSAGES.TASK.MARK_PENDING
          );
        }
      });
    }
  }
}
