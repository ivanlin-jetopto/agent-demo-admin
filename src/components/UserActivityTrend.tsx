'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { weeklyUserTrend } from '@/lib/mock-data/dashboard';

export default function UserActivityTrend() {
  return (
    <Card className="p-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            7日用戶活躍度趨勢圖
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={weeklyUserTrend}>
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
              formatter={(value: number) => [
                `${value.toLocaleString()} 位`,
                '活躍用戶',
              ]}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
