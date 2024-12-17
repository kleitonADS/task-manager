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
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
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
    if (!task.titulo || !task.status) {
      console.error('Campos obrigatórios faltando:', task);
      return;
    }

    const taskData: Task = {
      ...task,
      titulo: task.titulo.trim(),
      descricao: task.descricao?.trim() || '',
      status: task.status || 'pendente'
    };

    const operation = task.id
      ? this.taskService.updateTask(task.id, taskData)
      : this.taskService.createTask(taskData);

    operation.subscribe({
      next: () => {
        this.loadTasks();
        this.hideTaskForm();
        this.notificationService.showSuccess(
          task.id ? MESSAGES.TASK.UPDATE_SUCCESS : MESSAGES.TASK.CREATE_SUCCESS
        );
      },
      error: (err) => {
        console.error('Erro ao salvar/atualizar tarefa:', err);


        if (err.status === 422) {
          console.error('Erro 422: Dados inválidos.', err.error);
          this.notificationService.showError('Erro ao atualizar status. Dados inválidos.');
        } else {
          console.error('Erro desconhecido:', err);
        }
      }
    });
  }


  deleteTask(task: Task) {
    if (task.id && this.notificationService.showConfirmation(MESSAGES.TASK.DELETE_CONFIRM)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.loadTasks();
          this.notificationService.showSuccess(MESSAGES.TASK.DELETE_SUCCESS);
        },
        error: (err) => {
          console.error('Erro ao deletar tarefa:', err);
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

      console.log('Alterando status da tarefa:', updatedTask);

      this.taskService.updateTask(task.id, updatedTask).subscribe({
        next: (response) => {
          console.log('Resposta da atualização do status:', response);
          this.loadTasks();
          this.notificationService.showSuccess(
            newStatus === 'concluido' ? MESSAGES.TASK.MARK_COMPLETED : MESSAGES.TASK.MARK_PENDING
          );
        },
        error: (err) => {
          console.error('Erro ao alterar status da tarefa:', err);
          if (err.status === 422) {
            console.error('Erro 422: Dados inválidos.', err.error);
            this.notificationService.showError('Erro ao atualizar status. Dados inválidos.');
          } else {
            console.error('Erro desconhecido:', err);
            this.notificationService.showError('Erro desconhecido. Tente novamente mais tarde.');
          }

          if (err.error) {
            console.log('Detalhes do erro:', err.error);
          }
        }
      });
    } else {
      console.error('Tarefa sem ID, não é possível atualizar o status.');
    }
  }





}
