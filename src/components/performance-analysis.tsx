'use client';

import { Clock, Zap, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  status?: 'good' | 'warning' | 'error';
}

interface PerformanceAnalysisProps {
  geminiResponseTime?: number; // in ms
  functionCallTime?: number; // in ms
  totalProcessingTime?: number; // in ms
  className?: string;
}

export function PerformanceAnalysis({
  geminiResponseTime,
  functionCallTime,
  totalProcessingTime,
  className,
}: PerformanceAnalysisProps) {
  const getStatus = (
    time: number | undefined
  ): 'good' | 'warning' | 'error' => {
    if (!time) return 'good';
    if (time < 1000) return 'good';
    if (time < 3000) return 'warning';
    return 'error';
  };

  const iconSize = 'h-4 w-4';
  const metrics: PerformanceMetric[] = [
    {
      label: 'Gemini API 回應時間',
      value: `${geminiResponseTime} ms`,
      icon: <Zap className={iconSize} />,
      status: getStatus(geminiResponseTime),
    },
    {
      label: 'Function Call 執行時間',
      value: `${functionCallTime} ms`,
      icon: <Clock className={iconSize} />,
      status: getStatus(functionCallTime),
    },
    {
      label: '後端處理總時長',
      value: `${totalProcessingTime} ms`,
      icon: <Server className={iconSize} />,
      status: getStatus(totalProcessingTime),
    },
  ];

  const statusColors = {
    good: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    error: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-medium">性能分析</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg border',
              metric.status && statusColors[metric.status]
            )}
          >
            <div className="mt-0.5">{metric.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{metric.label}</p>
              <p className="text-lg font-semibold mt-1">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
