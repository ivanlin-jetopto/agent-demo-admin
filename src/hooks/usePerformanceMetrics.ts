'use client';

import { useState } from 'react';
import { defaultMaterics } from '@/lib/mock-data/performance_matrics';

interface PerformanceData {
  sttLatency: number;
  intentRecognition: number;
  apiResponse: number;
  ttsGeneration: number;
  endToEndLatency: number;
  successRate: number;
}

export function usePerformanceMetrics() {
  // TODO: Implement real-time metrics updates
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [metrics, setMetrics] = useState<PerformanceData>(defaultMaterics);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConnected, setIsConnected] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  return { metrics, isConnected, isLoading };
}
