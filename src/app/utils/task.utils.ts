import { Task, TaskStatus } from '../models/task.model';

export function getTaskStatusLabel(status: TaskStatus): string {
  return status === 'concluido' ? 'Concluida' : 'Pendente';
}

export function formatTaskDate(dateString?: string): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
