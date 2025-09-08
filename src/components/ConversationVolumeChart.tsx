'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { hourlyConversationVolume } from '@/lib/mock-data/dashboard';

export default function ConversationVolumeChart() {
  return (
    <Card className="p-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            24小時對話量分布圖
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={hourlyConversationVolume}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="hour"
              stroke="#6b7280"
              style={{ fontSize: '10px' }}
              interval={2}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
              formatter={(value: number) => [
                `${value.toLocaleString()} 次`,
                '對話數',
              ]}
            />
            <Bar dataKey="conversations" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
