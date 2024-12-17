import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { TaskListComponent } from './app/components/task-list/task-list.component';
import { ErrorHandlerService } from './app/utils/error-handler';
import { NotificationService } from './app/utils/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent],
  template: `
    <app-task-list></app-task-list>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    ErrorHandlerService,
    NotificationService
  ]
});
