export type TaskStatus = 'queued' | 'running' | 'complete' | 'failed';

export interface Task {
  id: string;
  type: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  resultLink?: string;
}
