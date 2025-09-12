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
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import {
  Ban,
  Edit,
  Eye,
  User,
  Mail,
  Calendar,
  Clock,
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  MessageSquare,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { UserType } from '@/lib/types/users';
import { users } from '@/lib/mock-data/users';

// Define custom meta type for column definitions
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

export default function UsersTable() {
  const [data] = useState<UserType[]>(users);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [createdAtDateRange, setCreatedAtDateRange] = useState<
    DateRange | undefined
  >(undefined);

  const handleBlock = (id: string) => {
    console.log('Blocking user:', id);
  };

  const handleUnblock = (id: string) => {
    console.log('Unblocking user:', id);
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

  const columns: ColumnDef<UserType>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        meta: {
          className: 'w-[15%]',
        },
        header: () => (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>用戶 ID</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="font-medium text-sm">{row.getValue('id')}</span>
        ),
      },
      {
        accessorKey: 'email',
        meta: {
          className: 'w-[25%]',
        },
        header: () => (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>Email</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-sm">{row.getValue('email')}</span>
        ),
      },
      {
        accessorKey: 'createdAt',
        meta: {
          className: 'w-[15%]',
        },
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-4 h-auto p-2 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span>建立時間</span>
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.getValue('createdAt'))}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'lastActive',
        meta: {
          className: 'w-[12%]',
        },
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-4 h-auto p-2 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
            <span>最後活動</span>
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.getValue('lastActive'))}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'conversationCount',
        meta: {
          className: 'w-[12%]',
        },
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-4 h-auto p-2 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <MessageSquare className="h-4 w-4 text-muted-foreground mr-2" />
            <span>對話數</span>
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-medium">
              {row.getValue('conversationCount')}
            </span>
            <span className="text-xs text-muted-foreground">次</span>
          </div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        meta: {
          className: 'w-[11%]',
        },
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-4 h-auto p-2 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span>狀態</span>
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        ),
        cell: ({ row }) => {
          const status = row.getValue('status') as 'active' | 'blocked';
          return (
            <Badge
              variant={getStatusBadgeVariant(status)}
              className={
                status === 'active'
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }
            >
              {status === 'active' ? '活躍' : '已封鎖'}
            </Badge>
          );
        },
        filterFn: (row, id, value) => {
          if (value === 'all') return true;
          return row.getValue(id) === value;
        },
      },
      {
        id: 'actions',
        meta: {
          className: 'w-[10%]',
        },
        header: () => <div className="text-center">操作</div>,
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="text-center">
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
                  {user.status === 'blocked' ? (
                    <DropdownMenuItem
                      onClick={() => handleUnblock(user.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Ban className="mr-2 h-4 w-4 text-destructive" />
                      解除封鎖
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => handleBlock(user.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Ban className="mr-2 h-4 w-4 text-destructive" />
                      封鎖用戶
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Apply date range filter for last active
    if (dateRange?.from) {
      filtered = filtered.filter(user => {
        const lastActiveDate = new Date(user.lastActive);
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

    // Apply date range filter for created at
    if (createdAtDateRange?.from) {
      filtered = filtered.filter(user => {
        const createdDate = new Date(user.createdAt);
        const fromDate = new Date(createdAtDateRange.from!);
        fromDate.setHours(0, 0, 0, 0);

        if (createdAtDateRange.to) {
          const toDate = new Date(createdAtDateRange.to);
          toDate.setHours(23, 59, 59, 999);
          return createdDate >= fromDate && createdDate <= toDate;
        }
        return createdDate >= fromDate;
      });
    }

    return filtered;
  }, [data, statusFilter, dateRange, createdAtDateRange]);

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
      const id = row.getValue('id') as string;
      const email = row.getValue('email') as string;

      return (
        id.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue)
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
              placeholder="搜尋 Email 或用戶 ID..."
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              className="pl-9"
              data-testid="search-input"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={value => {
              setStatusFilter(value);
              if (value === 'all') {
                table.getColumn('status')?.setFilterValue(undefined);
              } else {
                table.getColumn('status')?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-[150px]" data-testid="status-filter">
              <SelectValue placeholder="狀態篩選" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部狀態</SelectItem>
              <SelectItem value="active">活躍</SelectItem>
              <SelectItem value="blocked">已封鎖</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !createdAtDateRange && 'text-muted-foreground'
                )}
                data-testid="created-date-filter"
              >
                <Clock className="mr-2 h-4 w-4" />
                {createdAtDateRange?.from ? (
                  createdAtDateRange.to ? (
                    <>
                      {format(createdAtDateRange.from, 'yyyy/MM/dd')} -{' '}
                      {format(createdAtDateRange.to, 'yyyy/MM/dd')}
                    </>
                  ) : (
                    format(createdAtDateRange.from, 'yyyy/MM/dd')
                  )
                ) : (
                  <span>選擇建立日期範圍</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                defaultMonth={createdAtDateRange?.from}
                selected={createdAtDateRange}
                onSelect={setCreatedAtDateRange}
              />
            </PopoverContent>
          </Popover>

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
                  <span>選擇最後活動日期範圍</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
              />
            </PopoverContent>
          </Popover>

          <Button
            disabled={
              !globalFilter &&
              statusFilter === 'all' &&
              !dateRange &&
              !createdAtDateRange
            }
            variant="default"
            onClick={() => {
              setGlobalFilter('');
              setStatusFilter('all');
              setDateRange(undefined);
              setCreatedAtDateRange(undefined);
              table.getColumn('status')?.setFilterValue(undefined);
            }}
          >
            清除篩選
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          顯示 {table.getFilteredRowModel().rows.length} 個用戶
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
                  沒有找到符合條件的用戶
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
