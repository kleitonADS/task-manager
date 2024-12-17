import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../types/api-response.types';
import { ErrorHandlerService } from '../utils/error-handler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tarefas`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<ApiResponse<Task>>(this.apiUrl, task).pipe(
      map(response => response.data),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/${id}`, task).pipe(
      map(response => response.data),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }
}
