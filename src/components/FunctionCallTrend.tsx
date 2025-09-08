'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { functionCallTrend } from '@/lib/mock-data/dashboard';

const COLORS = {
  search: '#3b82f6', // blue
  calculation: '#10b981', // green
  database: '#f59e0b', // amber
  api: '#ef4444', // red
};

export default function FunctionCallTrend() {
  return (
    <Card className="p-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            Function Call 使用趨勢
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={functionCallTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
              formatter={(value: number) => `${value.toLocaleString()} 次`}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} iconType="line" />
            <Line
              type="monotone"
              dataKey="search"
              name="搜尋"
              stroke={COLORS.search}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="calculation"
              name="計算"
              stroke={COLORS.calculation}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="database"
              name="資料庫"
              stroke={COLORS.database}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="api"
              name="API"
              stroke={COLORS.api}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
