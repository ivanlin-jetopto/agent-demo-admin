'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, RotateCw } from 'lucide-react';
import { taskFlow } from '@/lib/api/task';
import { Timeline, TimelineItemData } from '@/components/ui/timeline';
import { PerformanceAnalysis } from '@/components/performance-analysis';
import { ErrorDiagnostics } from '@/components/error-diagnostics';
import {
  FunctionCallTracking,
  FunctionCall,
} from '@/components/function-call-tracking';

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [timelineItems, setTimelineItems] = useState<TimelineItemData[]>([]);
  const [functionCalls, setFunctionCalls] = useState<FunctionCall[]>([
    {
      id: 'fc-1',
      name: 'getUserCalendar',
      params: { userId: 'u-1', date: '2025-09-16' },
      result: { events: [] },
      timestamp: '2025-09-16T19:30:00Z',
      duration: 250,
      status: 'success',
    },
    {
      id: 'fc-2',
      name: 'sendNotification',
      params: { message: 'Calendar checked' },
      timestamp: '2025-09-16T19:33:00Z',
      duration: 150,
      status: 'success',
    },
    {
      id: 'fc-3',
      name: 'processPayment',
      params: {
        amount: 450,
        currency: 'TWD',
        method: 'credit_card',
      },
      timestamp: '2025-09-16T19:36:00Z',
      status: 'pending',
    },
    {
      id: 'fc-4',
      name: 'validateUserToken',
      params: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        scope: ['read', 'write'],
      },
      result: { error: 'Token expired' },
      timestamp: '2025-09-16T19:40:00Z',
      duration: 45,
      status: 'failed',
      errorReason: '使用者令牌已過期，請重新登入',
      retryCount: 1,
    },
  ]);
  const statusMap: Record<number, 'pending' | 'completed'> = {
    0: 'completed',
    1: 'completed',
    2: 'pending',
    3: 'pending',
    4: 'pending',
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    //api
    if (id) {
      taskFlow({ id })
        .then(r => {
          // Transform flow data into timeline items with proper timestamps
          const items: TimelineItemData[] = r.flow.map((step, index) => {
            return {
              id: `flow-${index}`,
              title: step,
              description: 'description',
              date: '2025-09-16T19:30:00Z',
              status: statusMap[index] || 'pending',
            };
          });
          setTimelineItems(items);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleCancel = () => {
    console.log('Cancelling task:', id);
    // TODO: Implement cancel API call
  };

  const handleRestart = () => {
    console.log('Restarting task:', id);
    // TODO: Implement restart API call
  };
  console.log({ functionCalls });
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Button
          onClick={() => router.push('/conversations')}
          variant="ghost"
          size="sm"
          className="w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
      </div>

      <div className="flex justify-center px-4 pb-8">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-semibold">任務詳情: {id}</h1>
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="mr-2 h-4 w-4" />
                取消
              </Button>
              <Button onClick={handleRestart} variant="default" size="sm">
                <RotateCw className="mr-2 h-4 w-4" />
                重新啟動
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="w-full">
            <h2 className="text-lg font-medium mb-4">執行流程</h2>
            {timelineItems.length > 0 ? (
              <div className="border rounded-lg bg-card p-6">
                <Timeline items={timelineItems} />
              </div>
            ) : (
              <div className="border rounded-lg p-8">
                <p className="text-muted-foreground text-center">載入中...</p>
              </div>
            )}
          </div>

          {/* Analysis Section */}
          <div className="mt-8 space-y-6">
            <PerformanceAnalysis
              geminiResponseTime={1250}
              functionCallTime={380}
              totalProcessingTime={3100}
            />

            <ErrorDiagnostics
              errors={[
                {
                  id: 'err-1',
                  type: 'NETWORK_ERROR',
                  message: '無法連接到 Gemini API 服務',
                  timestamp: '2025-09-16T19:30:00Z',
                  solution: '請檢查網路連線並確認 API 金鑰是否有效',
                },
                {
                  id: 'err-2',
                  type: 'TIMEOUT_ERROR',
                  message: 'Function Call 執行超時 (超過 30 秒)',
                  timestamp: '2025-09-16T19:30:00Z',
                  solution: '建議優化查詢參數或分批處理資料',
                },
              ]}
            />

            <FunctionCallTracking functionCalls={functionCalls} />
          </div>
        </div>
      </div>
    </main>
  );
}
