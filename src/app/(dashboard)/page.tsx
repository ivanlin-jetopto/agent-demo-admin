'use client';

import { useState } from 'react';
import TaskQueue from '@/components/TaskQueue';
import AddTaskForm from '@/components/AddTaskForm';
import { Task } from '@/lib/types/task';
import { processVoiceTask } from '@/lib/api/voice-assistant';
import UserActivity from '@/components/UserActivity';
import BusinessMetrics from '@/components/BusinessMetrics';
import UserActivityTrend from '@/components/UserActivityTrend';
import ConversationVolumeChart from '@/components/ConversationVolumeChart';
import FunctionCallTrend from '@/components/FunctionCallTrend';
import ErrorRateTrend from '@/components/ErrorRateTrend';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = async (command: string) => {
    const taskId = `task-${Date.now()}`;
    const userId = `user-${Math.floor(Math.random() * 1000)}`;
    const commandText = command.trim();

    // Add task as pending immediately for UI feedback
    const newTask: Task = {
      id: taskId,
      command: commandText,
      status: 'pending',
      userId: userId,
      timestamp: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);

    // Update to processing after a short delay
    setTimeout(() => {
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, status: 'processing' } : task
        )
      );
    }, 500);

    try {
      // Call the API service to process the task
      const result = await processVoiceTask({
        taskId,
        command: commandText,
        userId,
      });

      // Update task with the result from the API
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId
            ? {
                ...task,
                status: result.status,
                duration: result.duration,
                result: result.result,
                timestamp: result.timestamp,
              }
            : task
        )
      );
    } catch (error) {
      console.error('Error calling voice assistant API:', error);
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId
            ? {
                ...task,
                status: 'failed',
                result: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
              }
            : task
        )
      );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 mt-4 flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-around">
        {/* 用戶活躍度 */}
        <UserActivity />

        {/* AI Agent 業務指標 */}
        <BusinessMetrics />
      </div>
      {/* 7日用戶活躍度趨勢圖 */}
      <UserActivityTrend />

      {/* 24小時對話量分布圖 */}
      <ConversationVolumeChart />

      {/* Function Call 使用趨勢 */}
      <FunctionCallTrend />

      {/* 錯誤率變化曲線 */}
      <ErrorRateTrend />

      <AddTaskForm onSubmit={handleAddTask} />
      <TaskQueue tasks={tasks} />
    </main>
  );
}
