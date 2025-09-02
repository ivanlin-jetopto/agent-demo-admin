'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';
import { Task } from '@/lib/types/task';

const statusConfig = {
  pending: {
    label: 'Queued',
    badge: 'text-gray-700 bg-gray-100',
  },
  processing: {
    label: 'Processing',
    badge: 'bg-blue-900 text-white',
  },
  completed: {
    label: 'Complete',
    badge: 'bg-green-900 text-white',
  },
  failed: {
    label: 'Failed',
    badge: 'bg-red-500 text-white',
  },
};

interface TaskQueueProps {
  tasks: Task[];
}

export default function TaskQueue({ tasks }: TaskQueueProps) {
  const tasksByStatus = {
    pending: tasks.filter(t => t.status === 'pending'),
    processing: tasks.filter(t => t.status === 'processing'),
    completed: tasks.filter(t => t.status === 'completed'),
    failed: tasks.filter(t => t.status === 'failed'),
  };

  const TaskItem = ({ task }: { task: Task }) => {
    const formatTime = (timestamp: string) => {
      return new Date(timestamp).toLocaleTimeString();
    };

    return (
      <div className="stat-card flex flex-col gap-2 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{task.id}</span>
        </div>
        <p className="text-sm text-gray-700">{task.command}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{task.userId}</span>
          <span>•</span>
          <span>{formatTime(task.timestamp)}</span>
        </div>
        {task.duration && (
          <p className="text-xs text-gray-500">Duration: {task.duration}ms</p>
        )}
        {task.result && (
          <div className="mt-2 p-2 bg-green-50 rounded text-xs">
            <span className="font-medium text-green-700">AI Response:</span>
            <p className="text-green-600 mt-1">{task.result}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col gap-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-gray-700" />
          <CardTitle className="text-xl font-semibold text-gray-900">
            Voice Assistant Task Queue
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {(['pending', 'processing', 'completed', 'failed'] as const).map(
          status => {
            const statusTasks = tasksByStatus[status];
            const config = statusConfig[status];

            return (
              <div key={status} className="flex-1">
                <div className="pb-3 mb-4 border-b-2 border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                      {config.label}
                    </h3>
                    <span
                      className={`inline-flex items-center justify-center min-w-[28px] h-7 px-2.5 rounded-full text-sm font-semibold ${config.badge}`}
                    >
                      {statusTasks.length}
                    </span>
                  </div>
                </div>

                <div className="pt-0">
                  <ScrollArea className="h-[calc(100vh-24rem)] min-h-[300px] max-h-[600px]">
                    {statusTasks.length > 0 ? (
                      <div className="space-y-2 pr-3">
                        {statusTasks.map(task => (
                          <TaskItem key={task.id} task={task} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        No {config.label.toLowerCase()} tasks
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            );
          }
        )}
      </CardContent>
    </Card>
  );
}
