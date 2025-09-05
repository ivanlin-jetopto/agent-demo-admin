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
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import {
  Ban,
  Edit,
  Eye,
  User,
  Mail,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UsersTable() {
  const users = [
    {
      id: 'u1',
      email: 'u1@example.com',
      lastActive: '2024-03-05',
      status: 'active' as const,
    },
    {
      id: 'u2',
      email: 'u2@example.com',
      lastActive: '2024-03-10',
      status: 'active' as const,
    },
    {
      id: 'u3',
      email: 'u3@example.com',
      lastActive: '2024-02-28',
      status: 'blocked' as const,
    },
  ];

  const handleBlock = (id: string) => {
    console.log('Blocking user:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Editing user:', id);
  };

  const handleView = (id: string) => {
    console.log('Viewing user:', id);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy年MM月dd日', { locale: zhTW });
    } catch {
      return dateString;
    }
  };

  const getStatusBadgeVariant = (status: 'active' | 'blocked') => {
    return status === 'active' ? 'default' : 'destructive';
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-1/6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>用戶 ID</span>
                </div>
              </TableHead>
              <TableHead className="w-2/6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Email</span>
                </div>
              </TableHead>
              <TableHead className="w-1/6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>最後活動</span>
                </div>
              </TableHead>
              <TableHead className="w-1/6">狀態</TableHead>
              <TableHead className="w-1/6 text-center">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map(user => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">
                  <span className="text-sm">{user.id}</span>
                </TableCell>
                <TableCell className="text-sm">{user.email}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(user.lastActive)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusBadgeVariant(user.status)}
                    className={
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }
                  >
                    {user.status === 'active' ? '活躍' : '已封鎖'}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 mx-auto"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">開啟選單</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] z-50">
                      <DropdownMenuLabel>操作</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleView(user.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        查看詳情
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        編輯用戶
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleBlock(user.id)}
                        disabled={user.status === 'blocked'}
                        className="text-destructive focus:text-destructive"
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        {user.status === 'blocked' ? '已封鎖' : '封鎖用戶'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
