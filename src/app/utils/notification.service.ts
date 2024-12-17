import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showSuccess(message: string): void {
    // In a real app, you might want to use a proper notification library
    alert(message);
  }

  showError(message: string): void {
    alert(`Erro: ${message}`);
  }

  showConfirmation(message: string): boolean {
    return confirm(message);
  }
}
