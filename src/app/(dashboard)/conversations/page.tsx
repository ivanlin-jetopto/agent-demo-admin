'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  User,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Task } from '@/lib/types/task';
import TaskQueue from '@/components/TaskQueue';
import AddTaskForm from '@/components/AddTaskForm';
import { processVoiceTask } from '@/lib/api/voice-assistant';
import { mockTasks } from '@/lib/mock-data/conversations';

export default function ConversationsPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesCommand = task.command.toLowerCase().includes(query);
      const matchesUserId = task.userId.toLowerCase().includes(query);
      const matchesTaskId = task.id?.toLowerCase().includes(query);
      if (!matchesCommand && !matchesUserId && !matchesTaskId) {
        return false;
      }
    }

    // Status filter
    if (statusFilter !== 'all' && task.status !== statusFilter) {
      return false;
    }

    // Date range filter
    if (date?.from || date?.to) {
      const taskDate = new Date(task.timestamp);
      if (date.from && taskDate < date.from) {
        return false;
      }
      if (date.to) {
        // Set to end of day for 'to' date
        const endOfDay = new Date(date.to);
        endOfDay.setHours(23, 59, 59, 999);
        if (taskDate > endOfDay) {
          return false;
        }
      }
    }

    return true;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return '-';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}分${remainingSeconds}秒`;
    }
    return `${seconds}秒`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleAddTask = async (command: string) => {
    const taskId = `task-${Date.now()}`;
    const userId = `user-${Math.floor(Math.random() * 1000)}`;
    const commandText = command.trim();

    // Add task as processing immediately for UI feedback
    const newTask: Task = {
      id: taskId,
      command: commandText,
      status: 'processing',
      userId: userId,
      timestamp: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);

    try {
      // Call the API service to process the task
      const result = await processVoiceTask({
        taskId,
        command: commandText,
        userId,
      });

      // Update task with the result from the API
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId
            ? {
                ...task,
                status: result.status,
                duration: result.duration,
                result: result.result,
                timestamp: result.timestamp,
              }
            : task
        )
      );
    } catch (error) {
      console.error('Error calling voice assistant API:', error);
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId
            ? {
                ...task,
                status: 'failed',
                result: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
              }
            : task
        )
      );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">對話管理</h1>
          <p className="text-gray-500 mt-1">
            查看和管理所有語音助理對話任務記錄
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="flex flex-col gap-4">
        <AddTaskForm onSubmit={handleAddTask} />
        <TaskQueue tasks={tasks} />
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle>任務記錄</CardTitle>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜尋任務ID或用戶ID..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date Range Picker */}
            <DatePickerWithRange
              date={date}
              onDateChange={newDate => {
                setDate(newDate);
                setCurrentPage(1);
              }}
            />

            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={value => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="狀態" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部狀態</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="failed">失敗</SelectItem>
                <SelectItem value="processing">處理中</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setDate(undefined);
                setCurrentPage(1);
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              重置
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[5%]">狀態</TableHead>
                <TableHead className="w-[15%]">任務ID</TableHead>
                <TableHead className="w-[15%]">用戶ID</TableHead>
                <TableHead className="w-[20%]">執行時間</TableHead>
                <TableHead className="w-[10%]">處理時長</TableHead>
                <TableHead className="w-[30%]">結果</TableHead>
                <TableHead className="w-[5%]">檢視</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-gray-500"
                  >
                    沒有找到符合條件的任務
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map(task => (
                    <TableRow key={task.id}>
                      {/* 狀態 */}
                      <TableCell>{getStatusIcon(task.status)}</TableCell>

                      {/* 任務ID */}
                      <TableCell className="font-mono text-sm">
                        {task.id}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{task.userId}</span>
                        </div>
                      </TableCell>

                      {/* 執行時間 */}
                      <TableCell>
                        <div className="text-sm">
                          {formatTimestamp(task.timestamp)}
                        </div>
                      </TableCell>

                      {/* 處理時長 */}
                      <TableCell>{formatDuration(task.duration)}</TableCell>

                      {/* 結果 */}
                      <TableCell>
                        <div className="max-w-[300px] truncate text-sm text-gray-600">
                          {task.result || '-'}
                        </div>
                      </TableCell>

                      {/* 檢視 */}
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          aria-label="查看詳情"
                          onClick={() => router.push(`/task/${task.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      setCurrentPage(Math.max(1, currentPage - 1));
                    }}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage > 3) {
                      pageNum = currentPage - 2 + i;
                    }
                    if (currentPage > totalPages - 3) {
                      pageNum = totalPages - 4 + i;
                    }
                  }
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === pageNum}
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          setCurrentPage(pageNum);
                        }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      setCurrentPage(Math.min(totalPages, currentPage + 1));
                    }}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
