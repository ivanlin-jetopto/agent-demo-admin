'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function UsersTable() {
  const users = [
    {
      id: 'u1',
      email: 'u1@example.com',
      lastActive: '2024-03-05',
      status: 'active',
    },
    {
      id: 'u2',
      email: 'u2@example.com',
      lastActive: '2024-03-10',
      status: 'active',
    },
  ];
  const handleBlock = (id: string) => {
    console.log('Blocking user:', id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead>用戶 ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>最後活動</TableHead>
          <TableHead>狀態</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.lastActive}</TableCell>
            <TableCell>
              <span
                className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`}
              >
                {user.status}
              </span>
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                className="text-white"
                size="sm"
                onClick={() => handleBlock(user.id)}
                disabled={user.status === 'blocked'}
              >
                封鎖
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
