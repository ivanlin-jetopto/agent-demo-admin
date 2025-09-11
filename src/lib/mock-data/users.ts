import { UserType } from '@/lib/types/users';

export const users: UserType[] = [
  {
    id: 'user-001',
    email: 'u1@example.com',
    lastActive: '2025-03-05',
    status: 'active',
  },
  {
    id: 'user-002',
    email: 'u2@example.com',
    lastActive: '2025-03-10',
    status: 'active',
  },
  {
    id: 'user-003',
    email: 'u3@example.com',
    lastActive: '2025-02-28',
    status: 'blocked',
  },
  {
    id: 'user-004',
    email: 'john.doe@example.com',
    lastActive: '2025-03-12',
    status: 'active',
  },
  {
    id: 'user-005',
    email: 'jane.smith@example.com',
    lastActive: '2025-03-08',
    status: 'active',
  },
  {
    id: 'user-006',
    email: 'admin@example.com',
    lastActive: '2025-03-15',
    status: 'active',
  },
  {
    id: 'user-007',
    email: 'test.user@example.com',
    lastActive: '2025-03-01',
    status: 'blocked',
  },
  {
    id: 'user-008',
    email: 'support@example.com',
    lastActive: '2025-03-14',
    status: 'active',
  },
];
