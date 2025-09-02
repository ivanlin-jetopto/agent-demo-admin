import { NextRequest, NextResponse } from 'next/server';
import { voiceAssistantFlow, sessionManagementFlow } from '@/genkit';

// Force Node.js runtime instead of Edge runtime
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    if (action === 'task') {
      const input = {
        taskId: params.taskId,
        command: params.command,
        userId: params.userId,
      };

      console.log('Processing task:', input);

      const result = await voiceAssistantFlow(input);

      console.log('Task result:', result);

      return NextResponse.json(result);
    }

    if (action === 'session') {
      const result = await sessionManagementFlow({
        action: params.sessionAction,
        userId: params.userId,
        sessionId: params.sessionId,
      });
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Voice assistant API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Voice Assistant API is running',
    endpoints: {
      task: 'POST /api/voice-assistant with action: "task"',
      session: 'POST /api/voice-assistant with action: "session"',
    },
  });
}
