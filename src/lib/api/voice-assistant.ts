import { Task } from '@/lib/types/task';

interface ProcessTaskRequest {
  taskId: string;
  command: string;
  userId: string;
}

interface ProcessTaskResponse {
  status: Task['status'];
  duration?: number;
  result?: string;
  timestamp: string;
}

export async function processVoiceTask(
  request: ProcessTaskRequest
): Promise<ProcessTaskResponse> {
  const response = await fetch('/api/voice-assistant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'task',
      taskId: request.taskId,
      command: request.command,
      userId: request.userId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', errorText);
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
