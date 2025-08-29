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
  const [metrics, setMetrics] = useState<PerformanceData>(defaultMaterics);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return { metrics, isConnected, isLoading };
}
