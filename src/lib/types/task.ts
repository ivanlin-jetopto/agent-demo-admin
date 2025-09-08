// export interface Task {
//   id: string;
//   type: string;
//   status: 'queued' | 'running' | 'complete' | 'failed';
//   createdAt: string;
//   updatedAt: string;
//   resultLink?: string;
// }

export interface Task {
  id: string;
  command: string;
  status: 'processing' | 'completed' | 'failed';
  userId: string;
  timestamp: string;
  duration?: number;
  result?: string;
}
