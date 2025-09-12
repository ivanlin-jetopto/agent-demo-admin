'use client';

import { useState, useMemo } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import {
  Eye,
  User,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { ConversationType } from '@/lib/types/conversation';
import { mockConversationList } from '@/lib/mock-data/conversations';
import Link from 'next/link';

// Define custom meta type for column definitions
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

import { useRouter } from 'next/navigation';

export default function ConversationsTable() {
  const router = useRouter();
  const [data] = useState<ConversationType[]>(mockConversationList);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleView = (sessionId: string) => {
    router.push(`/conversations/${sessionId}`);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy年MM月dd日', { locale: zhTW });
    } catch {
      return dateString;
    }
  };

  const columns: ColumnDef<ConversationType>[] = useMemo(
    () => [
      {
        accessorKey: 'sessionId',
        meta: {
          className: 'w-1/6',
        },
        header: () => (
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>會話 ID</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="font-medium text-sm font-mono">
            {row.getValue('sessionId')}
          </span>
        ),
      },
      {
        accessorKey: 'userId',
        meta: {
          className: 'w-1/6',
        },
        header: () => (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>用戶 ID</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="font-medium text-sm">{row.getValue('userId')}</span>
        ),
      },
      {
        accessorKey: 'timestamp',
        meta: {
          className: 'w-1/6',
        },
        header: () => (
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground" />
            <span>建立時間</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.getValue('timestamp'))}
          </span>
        ),
      },
      {
        accessorKey: 'tasks',
        meta: {
          className: 'w-2/6',
        },
        header: () => (
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>相關任務</span>
          </div>
        ),
        cell: function Cell({ row }) {
          const [expanded, setExpanded] = useState(false);
          const tasks = row.getValue('tasks') as string[] | undefined;
          if (!tasks || tasks.length === 0) {
            return (
              <span className="text-sm text-muted-foreground">無任務</span>
            );
          }

          const displayedTasks = expanded ? tasks : tasks.slice(0, 3);

          return (
            <div className="flex flex-wrap gap-1">
              {displayedTasks.map(taskId => (
                <Link
                  key={taskId}
                  href={`/task/${taskId}`}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                >
                  {taskId}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              ))}
              {tasks.length > 3 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  {expanded ? '收起' : `+${tasks.length - 3} 更多`}
                </button>
              )}
            </div>
          );
        },
      },
      {
        id: 'actions',
        meta: {
          className: 'w-1/6',
        },
        header: () => <div className="text-center">操作</div>,
        cell: ({ row }) => {
          const conversation = row.original;
          return (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 mx-auto"
                onClick={() => handleView(conversation.sessionId)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply date range filter
    if (dateRange?.from) {
      filtered = filtered.filter(conversation => {
        const lastActiveDate = new Date(conversation.timestamp);
        const fromDate = new Date(dateRange.from!);
        fromDate.setHours(0, 0, 0, 0);

        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          return lastActiveDate >= fromDate && lastActiveDate <= toDate;
        }
        return lastActiveDate >= fromDate;
      });
    }

    return filtered;
  }, [data, dateRange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase();
      const sessionId = row.getValue('sessionId') as string;
      const userId = row.getValue('userId') as string;

      return (
        sessionId.toLowerCase().includes(searchValue) ||
        userId.toLowerCase().includes(searchValue)
      );
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋會話 ID 或用戶 ID..."
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              className="pl-9"
              data-testid="search-input"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !dateRange && 'text-muted-foreground'
                )}
                data-testid="date-filter"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'yyyy/MM/dd')} -{' '}
                      {format(dateRange.to, 'yyyy/MM/dd')}
                    </>
                  ) : (
                    format(dateRange.from, 'yyyy/MM/dd')
                  )
                ) : (
                  <span>選擇日期範圍</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-md"
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="default"
            onClick={() => {
              setGlobalFilter('');
              setDateRange(undefined);
            }}
          >
            清除篩選
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          總共 {table.getFilteredRowModel().rows.length} 個對話
        </div>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/50 hover:bg-muted/50"
              >
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className={header.column.columnDef.meta?.className}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  沒有找到符合條件的對話
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          第 {table.getState().pagination.pageIndex + 1} 頁，共{' '}
          {table.getPageCount()} 頁
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
