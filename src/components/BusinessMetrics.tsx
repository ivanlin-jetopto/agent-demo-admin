'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { BusinessMetricType } from '@/lib/types/dashboard';
import { businessMetrics } from '@/lib/mock-data/dashboard';

export default function BusinessMetrics() {
  const data: BusinessMetricType = businessMetrics;
  const businessLabels: Record<keyof BusinessMetricType, string> = {
    totalConversationsToday: '今日對話總數',
    averageConversationTurns: '平均對話輪數',
    apiCalls: 'Function Call 總次數',
    taskCompletionRate: '任務完成率',
  };

  const businessUnits: Record<keyof BusinessMetricType, string> = {
    totalConversationsToday: '次',
    averageConversationTurns: '輪',
    apiCalls: '次',
    taskCompletionRate: '%',
  };

  return (
    <Card className="p-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            AI Agent 業務指標
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
              {businessLabels[key as keyof BusinessMetricType]}
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-gray-900">
                {value.toLocaleString()}
              </p>
              <span className="text-sm text-gray-500">
                {businessUnits[key as keyof BusinessMetricType]}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
