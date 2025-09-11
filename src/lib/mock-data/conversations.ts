import {
  ConversationType,
  ConversationHistory,
} from '@/lib/types/conversation';

export const mockConversationList: ConversationType[] = [
  {
    userId: 'user-001',
    sessionId: 'session-20250916-001',
    timestamp: '2025-09-16T09:15:00Z',
    tasks: ['task-001', 'task-002'],
  },
  {
    userId: 'user-002',
    sessionId: 'session-20250916-002',
    timestamp: '2025-09-16T10:30:00Z',
    tasks: ['task-003'],
  },
  {
    userId: 'user-003',
    sessionId: 'session-20250916-003',
    timestamp: '2025-09-16T11:45:00Z',
    tasks: ['task-004', 'task-005', 'task-006'],
  },
  {
    userId: 'user-004',
    sessionId: 'session-20250916-004',
    timestamp: '2025-09-16T13:20:00Z',
    tasks: [],
  },
  {
    userId: 'user-005',
    sessionId: 'session-20250916-005',
    timestamp: '2025-09-16T14:00:00Z',
    tasks: ['task-007', 'task-008', 'task-009', 'task-010'],
  },
  {
    userId: 'user-006',
    sessionId: 'session-20250916-006',
    timestamp: '2025-09-16T15:30:00Z',
    tasks: ['task-011'],
  },
  {
    userId: 'user-007',
    sessionId: 'session-20250916-007',
    timestamp: '2025-09-16T16:45:00Z',
    tasks: ['task-012', 'task-013'],
  },
  {
    userId: 'user-008',
    sessionId: 'session-20250916-008',
    timestamp: '2025-09-16T17:15:00Z',
    tasks: [],
  },
  {
    userId: 'user-007',
    sessionId: 'session-20250916-009',
    timestamp: '2025-09-16T18:00:00Z',
    tasks: ['task-014', 'task-015', 'task-016', 'task-017', 'task-018'],
  },
  {
    userId: 'user-005',
    sessionId: 'session-20250916-010',
    timestamp: '2025-09-16T19:30:00Z',
    tasks: ['task-019'],
  },
];

export const mockConversations: ConversationHistory[] = [
  {
    id: 'h-001',
    userId: 'user-005',
    sessionId: 'session-20250916-010',
    sender: 'user',
    content: '國道一號目前的交通狀況如何？',
    timestamp: '2025-09-16T19:30:00Z',
  },
  {
    id: 'h-002',
    userId: 'user-005',
    sessionId: 'session-20250916-010',
    sender: 'assistant',
    content:
      '國道一號北向路段：內湖至汐止車速 40km/h，五股至林口壅塞車速 20km/h。南向路段：中壢至湖口順暢，平均車速 90km/h。',
    timestamp: '2025-09-16T19:30:02Z',
  },
  {
    id: 'h-003',
    userId: 'user-005',
    sessionId: 'session-20250916-010',
    sender: 'user',
    content: '預計多久可以通過五股到林口路段？',
    timestamp: '2025-09-16T19:30:15Z',
  },
  {
    id: 'h-004',
    userId: 'user-005',
    sessionId: 'session-20250916-010',
    sender: 'assistant',
    content:
      '五股到林口路段約 12 公里，目前車速 20km/h，預計需要 35-40 分鐘通過。建議改走台64線或等待 20:30 後車流量會減少。',
    timestamp: '2025-09-16T19:30:17Z',
  },
];
