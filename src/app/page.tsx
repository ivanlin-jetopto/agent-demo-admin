'use client';

import { useState } from 'react';
import TaskQueue from '@/components/TaskQueue';
import AddTaskForm from '@/components/AddTaskForm';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Task } from '@/lib/types/task';

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

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
      // Call the API to process the task
      const response = await fetch('/api/voice-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'task',
          taskId: taskId,
          command: commandText,
          userId: userId,
        }),
      });

      if (response.ok) {
        const result = await response.json();

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
      } else {
        // Handle error
        const errorText = await response.text();
        console.error('API Error:', errorText);
        setTasks(prev =>
          prev.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  status: 'failed',
                  result: `API error: ${response.status}`,
                }
              : task
          )
        );
      }
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
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                AI Voice Assistant
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {user?.email || 'Admin Dashboard'}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                登出
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 mt-4 flex flex-col gap-4">
        <AddTaskForm onSubmit={handleAddTask} />
        <TaskQueue tasks={tasks} />
      </main>
    </div>
  );
}
