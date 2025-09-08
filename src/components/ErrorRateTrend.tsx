'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { errorRateTrend } from '@/lib/mock-data/dashboard';

export default function ErrorRateTrend() {
  // Calculate average error rate
  const avgErrorRate = (
    errorRateTrend.reduce((sum, item) => sum + item.errorRate, 0) /
    errorRateTrend.length
  ).toFixed(2);

  // Find peak error rate
  const peakErrorRate = Math.max(...errorRateTrend.map(item => item.errorRate));

  return (
    <Card className="p-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            錯誤率變化曲線
          </CardTitle>
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-gray-500">平均: </span>
            <span className="font-semibold text-gray-900">{avgErrorRate}%</span>
          </div>
          <div>
            <span className="text-gray-500">峰值: </span>
            <span className="font-semibold text-red-600">{peakErrorRate}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={errorRateTrend}>
            <defs>
              <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              style={{ fontSize: '10px' }}
              interval={2}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{
                value: '錯誤率 (%)',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: '12px' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'errorRate') return [`${value}%`, '錯誤率'];
                return [value, name];
              }}
              labelFormatter={label => `時間: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="errorRate"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorError)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
