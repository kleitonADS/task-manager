export type TaskStatus = 'pendente' | 'concluido';

export interface Task {
  id?: number;
  titulo: string;
  descricao?: string;
  status: TaskStatus;
  created_at?: string;
  updated_at?: string;
}

export const DEFAULT_TASK: Task = {
  titulo: '',
  status: 'pendente'
};
