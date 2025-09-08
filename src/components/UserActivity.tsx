'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { UserActivityType } from '@/lib/types/dashboard';
import { userActivities } from '@/lib/mock-data/dashboard';

export default function UserActivity() {
  const data: UserActivityType = userActivities;
  const activityLabels: Record<keyof UserActivityType, string> = {
    activeUsers: '當前在線用戶數',
    newUsersToday: '今日新增用戶數',
    weeklyActiveUsers: '7日活躍用戶數',
    averageSessionDuration: '平均使用時長',
  };

  const activityUnits: Record<keyof UserActivityType, string> = {
    activeUsers: '位',
    newUsersToday: '位',
    weeklyActiveUsers: '位',
    averageSessionDuration: '分鐘',
  };

  return (
    <Card className="p-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            用戶活躍度
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
              {activityLabels[key as keyof UserActivityType]}
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-gray-900">
                {value.toLocaleString()}
              </p>
              <span className="text-sm text-gray-500">
                {activityUnits[key as keyof UserActivityType]}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
