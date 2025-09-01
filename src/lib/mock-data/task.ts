import { Task } from '@/lib/types/task';

export const mockTasks: Task[] = [
  {
    id: 'task-123',
    type: 'DRIVE',
    status: 'running',
    createdAt: '2025-08-28T10:00:00Z',
    updatedAt: '2025-08-28T10:05:00Z',
    resultLink: 'https://drive.google.com/xxxx',
  },
  {
    id: 'task-124',
    type: 'EMAIL',
    status: 'complete',
    createdAt: '2025-08-28T09:30:00Z',
    updatedAt: '2025-08-28T09:35:00Z',
    resultLink: 'https://drive.google.com/yyyy',
  },
  {
    id: 'task-125',
    type: 'REPORT',
    status: 'failed',
    createdAt: '2025-08-28T09:00:00Z',
    updatedAt: '2025-08-28T09:10:00Z',
  },
  {
    id: 'task-126',
    type: 'SYNC',
    status: 'queued',
    createdAt: '2025-08-28T10:10:00Z',
    updatedAt: '2025-08-28T10:10:00Z',
  },
  {
    id: 'task-127',
    type: 'BACKUP',
    status: 'queued',
    createdAt: '2025-08-28T10:15:00Z',
    updatedAt: '2025-08-28T10:15:00Z',
  },
];
