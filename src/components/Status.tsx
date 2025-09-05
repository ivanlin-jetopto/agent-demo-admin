'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { DashboardStatus } from '@/lib/types/dashboard';
import { status } from '@/lib/mock-data/dashboard';

export default function StatusMetrics() {
  const data: DashboardStatus = status;
  const metricLabels: Record<keyof DashboardStatus, string> = {
    activeUsers: '活躍使用者',
    apiCalls: 'API 呼叫次數',
    errorRate: '錯誤率',
    avgLatency: '平均延遲',
  };

  const metricUnits: Record<keyof DashboardStatus, string> = {
    activeUsers: '位',
    apiCalls: '次',
    errorRate: '%',
    avgLatency: 'ms',
  };

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            狀態
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-6">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="stat-card space-y-2 p-4 rounded-lg bg-gray-50"
          >
            <p className="text-sm text-gray-600 font-medium">
              {metricLabels[key as keyof DashboardStatus]}
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-gray-900">
                {value.toLocaleString()}
              </p>
              <span className="text-sm text-gray-500">
                {metricUnits[key as keyof DashboardStatus]}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
