'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, RotateCw } from 'lucide-react';
import { taskFlow } from '@/lib/api/task';
import { Timeline, TimelineItemData } from '@/components/ui/timeline';
import { ChatDialog, Message } from '@/components/chat-dialog';
import { mockTasks } from '@/lib/mock-data/tasks';
import { PerformanceAnalysis } from '@/components/performance-analysis';
import { ErrorDiagnostics, ErrorDetail } from '@/components/error-diagnostics';
import {
  FunctionCallTracking,
  FunctionCall,
} from '@/components/function-call-tracking';

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [timelineItems, setTimelineItems] = useState<TimelineItemData[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [errors, setErrors] = useState<ErrorDetail[]>([]);
  const [functionCalls, setFunctionCalls] = useState<FunctionCall[]>([]);
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

    // Load chat messages from mock data
    const task = mockTasks.find(t => t.id === id);
    if (task) {
      const messages: Message[] = [];

      // Format timestamp for display
      const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
        });
      };

      // Add user command message
      messages.push({
        id: `${task.id}-command`,
        content: task.command,
        sender: 'user',
        timestamp: formatTime(task.timestamp),
      });

      // Add assistant response if available
      if (task.result) {
        messages.push({
          id: `${task.id}-result`,
          content: task.result,
          sender: 'assistant',
          timestamp: formatTime(task.timestamp),
        });
      }

      messages.push(
        {
          id: `${task.id}-msg-01`,
          content: '鶯鶯燕燕翠翠紅紅處處融融洽洽。',
          sender: 'user',
          timestamp: formatTime(task.timestamp),
        },
        {
          id: `${task.id}-msg-02`,
          content: '雨雨風風花花葉葉年年暮暮朝朝。',
          sender: 'assistant',
          timestamp: formatTime(task.timestamp),
        },
        {
          id: `${task.id}-msg-03`,
          content: '華安真行啊！對得好！',
          sender: 'user',
          timestamp: formatTime(task.timestamp),
        },
        {
          id: `${task.id}-msg-04`,
          content: '快出對子對死他，對死他！',
          sender: 'assistant',
          timestamp: formatTime(task.timestamp),
        },
        {
          id: `${task.id}-msg-05`,
          content: '十口心思，思君思國思社稷。',
          sender: 'user',
          timestamp: formatTime(task.timestamp),
        },
        {
          id: `${task.id}-msg-06`,
          content: '八目共賞，賞花賞月賞秋香。',
          sender: 'assistant',
          timestamp: formatTime(task.timestamp),
        }
      );

      setChatMessages(messages);

      // Mock error data (only for failed tasks)
      if (task.status === 'failed') {
        setErrors([
          {
            id: 'err-1',
            type: 'API_ERROR',
            message: task.result || '未知錯誤',
            timestamp: formatTime(task.timestamp),
            solution: '請檢查網路連線並重試',
          },
        ]);
      }

      // Mock function call data
      setFunctionCalls([
        {
          id: 'fc-1',
          name: 'getUserCalendar',
          params: { userId: task.userId, date: '2025-09-16' },
          result: { events: [] },
          timestamp: formatTime(task.timestamp),
          duration: 250,
          status: 'success',
        },
        {
          id: 'fc-2',
          name: 'sendNotification',
          params: { message: 'Calendar checked' },
          timestamp: formatTime(task.timestamp),
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
          timestamp: '14:30:12',
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
          timestamp: '14:30:13',
          duration: 45,
          status: 'failed',
          errorReason: '使用者令牌已過期，請重新登入',
          retryCount: 1,
        },
      ]);
    }

    //api
    if (id) {
      taskFlow({ id })
        .then(r => {
          // Transform flow data into timeline items with proper timestamps
          const baseTime = new Date();
          const items: TimelineItemData[] = r.flow.map((step, index) => {
            // Create timestamps with 5 minute intervals
            const itemTime = new Date(
              baseTime.getTime() + index * 5 * 60 * 1000
            );
            return {
              id: `flow-${index}`,
              title: step,
              description: 'description',
              date: itemTime.toISOString(),
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

          <div className="flex flex-row w-full gap-4">
            {/* Chat Dialog */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-medium mb-4">對話內容</h2>
              {chatMessages.length > 0 ? (
                <div className="border rounded-lg bg-card">
                  <ChatDialog messages={chatMessages} />
                </div>
              ) : (
                <div className="border rounded-lg p-8">
                  <p className="text-muted-foreground text-center">
                    無對話記錄
                  </p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="flex-1 min-w-0">
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
                  timestamp: '14:30',
                  solution: '請檢查網路連線並確認 API 金鑰是否有效',
                },
                {
                  id: 'err-2',
                  type: 'TIMEOUT_ERROR',
                  message: 'Function Call 執行超時 (超過 30 秒)',
                  timestamp: '14:31',
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
