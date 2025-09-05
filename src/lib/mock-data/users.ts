import { UserType } from '@/lib/types/users';

export const users: UserType[] = [
  {
    id: 'u1',
    email: 'u1@example.com',
    lastActive: '2025-03-05',
    status: 'active',
  },
  {
    id: 'u2',
    email: 'u2@example.com',
    lastActive: '2025-03-10',
    status: 'active',
  },
  {
    id: 'u3',
    email: 'u3@example.com',
    lastActive: '2025-02-28',
    status: 'blocked',
  },
  {
    id: 'u4',
    email: 'john.doe@example.com',
    lastActive: '2025-03-12',
    status: 'active',
  },
  {
    id: 'u5',
    email: 'jane.smith@example.com',
    lastActive: '2025-03-08',
    status: 'active',
  },
  {
    id: 'u6',
    email: 'admin@example.com',
    lastActive: '2025-03-15',
    status: 'active',
  },
  {
    id: 'u7',
    email: 'test.user@example.com',
    lastActive: '2025-03-01',
    status: 'blocked',
  },
  {
    id: 'u8',
    email: 'support@example.com',
    lastActive: '2025-03-14',
    status: 'active',
  },
];
