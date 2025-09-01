'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';
import { mockTasks } from '@/lib/mock-data/task';
import { Task, TaskStatus } from '@/lib/types/task';

const statusConfig = {
  queued: {
    label: 'Queued',
    badge: 'text-gray-700 bg-gray-100',
  },
  running: {
    label: 'Processing',
    badge: 'bg-blue-900 text-white',
  },
  complete: {
    label: 'Complete',
    badge: 'bg-green-900 text-white',
  },
  failed: {
    label: 'Failed',
    badge: 'bg-red-500 text-white',
  },
};

export default function TaskQueue() {
  const [tasks] = useState<Task[]>(mockTasks);

  const tasksByStatus = {
    queued: tasks.filter(t => t.status === 'queued'),
    running: tasks.filter(t => t.status === 'running'),
    complete: tasks.filter(t => t.status === 'complete'),
    failed: tasks.filter(t => t.status === 'failed'),
  };

  const TaskItem = ({ task }: { task: Task }) => {
    return (
      <div className="stat-card flex items-start gap-3 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{task.id}</span>
            <span className="text-xs text-gray-500">• {task.type}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{task.updatedAt}</p>
          {task.resultLink && (
            <a
              href={task.resultLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 mt-1 inline-block"
            >
              View result →
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="p-4">
      <CardHeader className="flex items-center gap-2 border-b border-gray-200">
        <FileText className="w-6 h-6 text-gray-700" />
        <CardTitle className="text-xl font-semibold text-gray-900">
          Task Queue
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {(['queued', 'running', 'complete', 'failed'] as TaskStatus[]).map(
          status => {
            const tasks = tasksByStatus[status];
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
                      {tasks.length}
                    </span>
                  </div>
                </div>

                <div className="pt-0">
                  <ScrollArea className="h-[400px]">
                    {tasks.length > 0 ? (
                      <div className="space-y-2 pr-3">
                        {tasks.map(task => (
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
