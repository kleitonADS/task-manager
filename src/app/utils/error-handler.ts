import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../types/api-response.types';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handleError(error: any): void {
    console.error('An error occurred:', error);

    if (error instanceof HttpErrorResponse) {
      const apiError = error.error as ApiError;
      const message = apiError.message || 'Ocorreu um erro na comunicação com o servidor.';
      this.notificationService.showError(message);
      return;
    }

    this.notificationService.showError('Ocorreu um erro inesperado. Por favor, tente novamente.');
  }
}
