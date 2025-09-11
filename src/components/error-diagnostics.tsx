'use client';

import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ErrorDetail {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  solution?: string;
}

interface ErrorDiagnosticsProps {
  errors?: ErrorDetail[];
  className?: string;
}

export function ErrorDiagnostics({
  errors = [],
  className,
}: ErrorDiagnosticsProps) {
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

  if (errors.length === 0) {
    return (
      <div className={cn('space-y-4', className)}>
        <h3 className="text-lg font-medium">錯誤診斷</h3>
        <div className="border rounded-lg p-8 text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
          <p className="text-muted-foreground">無錯誤記錄</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-medium">錯誤診斷</h3>
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">類型</th>
              <th className="text-left p-3 font-medium">訊息</th>
              <th className="text-left p-3 font-medium">時間</th>
              <th className="text-left p-3 font-medium">解決方案</th>
            </tr>
          </thead>
          <tbody>
            {errors.map(error => (
              <tr key={error.id} className="border-b">
                <td className="p-3">
                  <span className="text-sm font-medium">{error.type}</span>
                </td>
                <td className="p-3">
                  <p className="text-sm">{error.message}</p>
                </td>
                <td className="p-3">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(error.timestamp)}
                  </span>
                </td>
                <td className="p-3">
                  {error.solution ? (
                    <p className="text-xs">{error.solution}</p>
                  ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
