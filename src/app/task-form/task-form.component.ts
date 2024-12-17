import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task = { titulo: '', descricao: '', status: 'pendente' };
  isEdit = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEdit = true;
      this.taskService.getTask(taskId).subscribe(task => {
        this.task = task;
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
