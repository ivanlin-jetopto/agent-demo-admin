'use client';

import React from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export interface FunctionCall {
  id: string;
  name: string;
  params: Record<string, unknown>;
  result?: unknown;
  timestamp: string;
  duration?: number; // in ms
  status: 'success' | 'failed' | 'pending';
  retryCount?: number;
  errorReason?: string;
}

interface FunctionCallTrackingProps {
  functionCalls?: FunctionCall[];
  className?: string;
}

export function FunctionCallTracking({
  functionCalls = [],
  className,
}: FunctionCallTrackingProps) {
  const [expandedCalls, setExpandedCalls] = useState<Set<string>>(new Set());

  const formatTime = (d: string | Date) => {
    const dateObj = typeof d === 'string' ? new Date(d) : d;
    return dateObj.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCalls);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCalls(newExpanded);
  };

  const iconSize = 'h-4 w-4';
  const statusConfig = {
    success: {
      icon: <CheckCircle className={iconSize} />,
      color: 'text-green-600',
    },
    failed: {
      icon: <XCircle className={iconSize} />,
      color: 'text-red-600',
    },
    pending: {
      icon: <Clock className={iconSize} />,
      color: 'text-yellow-600',
    },
  };

  if (functionCalls.length === 0) {
    return (
      <div className={cn('space-y-4', className)}>
        <h3 className="text-lg font-medium">Function Call 追蹤</h3>
        <div className="border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">無 Function Call 記錄</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-medium">Function Call 追蹤</h3>
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="w-8"></th>
              <th className="text-left p-3 font-medium">狀態</th>
              <th className="text-left p-3 font-medium">名稱</th>
              <th className="text-left p-3 font-medium">時間</th>
              <th className="text-left p-3 font-medium">耗時</th>
              <th className="text-left p-3 font-medium">重試</th>
            </tr>
          </thead>
          <tbody>
            {functionCalls.map(call => {
              const config = statusConfig[call.status];
              const isExpanded = expandedCalls.has(call.id);

              return (
                <React.Fragment key={call.id}>
                  <tr
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => toggleExpanded(call.id)}
                  >
                    <td className="pl-3">
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 transition-transform',
                          isExpanded && 'rotate-90'
                        )}
                      />
                    </td>
                    <td className="p-3">
                      <div
                        className={`flex items-center gap-2 ${config.color}`}
                      >
                        {config.icon}
                        <span className="text-sm capitalize">
                          {call.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm font-medium">{call.name}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(call.timestamp)}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-xs text-muted-foreground">
                        {call.duration ? `${call.duration} ms` : '-'}
                      </span>
                    </td>
                    <td className="p-3">
                      {call.retryCount && call.retryCount > 0 ? (
                        <span className="text-xs flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" />
                          {call.retryCount}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={6} className="p-0 bg-muted/10">
                        <div className="p-4 pl-12 space-y-3">
                          <div>
                            <div className="text-sm font-medium mb-2">
                              調用參數:
                            </div>
                            <pre className="text-xs bg-background p-3 rounded overflow-x-auto border">
                              {JSON.stringify(call.params, null, 2)}
                            </pre>
                          </div>

                          {call.result !== undefined &&
                            call.result !== null && (
                              <div>
                                <div className="text-sm font-medium mb-2">
                                  執行結果:
                                </div>
                                <pre className="text-xs bg-background p-3 rounded overflow-x-auto border">
                                  {JSON.stringify(call.result, null, 2)}
                                </pre>
                              </div>
                            )}

                          {call.errorReason && (
                            <div>
                              <div className="text-sm font-medium mb-2 text-red-600">
                                錯誤原因:
                              </div>
                              <p className="text-sm text-red-800 bg-red-50 p-3 rounded border border-red-200">
                                {call.errorReason}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
