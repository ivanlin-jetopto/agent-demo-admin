'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';

interface MetricConfig {
  label: string;
  key: keyof ReturnType<typeof usePerformanceMetrics>['metrics'];
  unit: string;
  warning: number;
  critical: number;
  format?: (value: number) => string;
}

const metricsConfig: MetricConfig[] = [
  {
    label: 'STT Latency',
    key: 'sttLatency',
    unit: 'ms',
    warning: 800,
    critical: 1500,
  },
  {
    label: 'Intent Recognition',
    key: 'intentRecognition',
    unit: 'ms',
    warning: 400,
    critical: 800,
  },
  {
    label: 'API Response',
    key: 'apiResponse',
    unit: 'ms',
    warning: 2000,
    critical: 5000,
  },
  {
    label: 'TTS Generation',
    key: 'ttsGeneration',
    unit: 'ms',
    warning: 700,
    critical: 1200,
  },
  {
    label: 'End-to-End',
    key: 'endToEndLatency',
    unit: 's',
    warning: 4000,
    critical: 6000,
    format: (value: number) => (value / 1000).toFixed(1),
  },
  {
    label: 'Success Rate',
    key: 'successRate',
    unit: '%',
    warning: 90,
    critical: 80,
    format: (value: number) => value.toFixed(1),
  },
];

export default function PerformanceMetrics() {
  const { metrics, isConnected, isLoading } = usePerformanceMetrics();

  const getMetricColor = (
    value: number,
    warning: number,
    critical: number,
    isSuccessRate = false
  ) => {
    if (isSuccessRate) {
      if (value < critical) return 'text-red-600';
      if (value < warning) return 'text-yellow-600';
      return 'text-black-600';
    }

    if (value > critical) return 'text-red-600';
    if (value > warning) return 'text-yellow-600';
    return 'text-black-600';
  };

  const getMetricBgColor = (
    value: number,
    warning: number,
    critical: number,
    isSuccessRate = false
  ) => {
    if (isSuccessRate) {
      if (value < critical) return 'bg-red-50';
      if (value < warning) return 'bg-yellow-50';
      return 'bg-gray-50';
    }

    if (value > critical) return 'bg-red-50';
    if (value > warning) return 'bg-yellow-50';
    return 'bg-gray-50';
  };

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            Performance Metrics
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {isLoading ? (
            <span className="text-sm text-gray-500">Connecting...</span>
          ) : isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">Live</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Demo Mode</span>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-6 pt-6">
        {metricsConfig.map(config => {
          const value = metrics[config.key];
          const displayValue = config.format
            ? config.format(value)
            : Math.round(value);
          const isSuccessRate = config.key === 'successRate';
          const colorClass = getMetricColor(
            value,
            config.warning,
            config.critical,
            isSuccessRate
          );
          const bgColorClass = getMetricBgColor(
            value,
            config.warning,
            config.critical,
            isSuccessRate
          );

          return (
            <div
              key={config.key}
              className={`stat-card space-y-2 p-4 rounded-lg transition-all ${bgColorClass}`}
            >
              <p className="text-sm text-gray-600 font-medium">
                {config.label}
              </p>
              <div className="flex items-baseline gap-1">
                <p className={`text-3xl font-bold ${colorClass}`}>
                  {displayValue}
                </p>
                <span className={`text-sm ${colorClass}`}>{config.unit}</span>
              </div>
              {isSuccessRate && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      value >= 95
                        ? 'bg-green-600'
                        : value >= 90
                          ? 'bg-yellow-600'
                          : 'bg-red-600'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
