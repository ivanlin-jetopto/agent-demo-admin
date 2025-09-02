import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Genkit with proper configuration
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
});

//#region Input/Output schemas using Zod
const VoiceTaskInputSchema = z.object({
  taskId: z.string(),
  command: z.string(),
  userId: z.string(),
  sessionId: z.string().optional(),
});

const VoiceTaskOutputSchema = z.object({
  taskId: z.string(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']),
  result: z.string().optional(),
  timestamp: z.string(),
  duration: z.number().optional(),
  error: z.string().optional(),
});
//#endregion

// Define voice assistant task flow with AI
export const voiceAssistantFlow = ai.defineFlow(
  {
    name: 'voiceAssistantTask',
    inputSchema: VoiceTaskInputSchema,
    outputSchema: VoiceTaskOutputSchema,
  },
  async input => {
    const { taskId, command, userId } = input;
    const startTime = Date.now();

    try {
      console.log(
        `Processing AI task ${taskId}: ${command} for user ${userId}`
      );

      // Use Gemini AI to process the voice command
      const llmResponse = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: `You are a helpful voice assistant. A user said: "${command}"
        
        Provide a helpful, conversational response as if you're speaking back to them.
        Keep it concise and friendly. If they're asking about weather, time, or factual information,
        provide a realistic but simulated response.`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
      });

      const result = llmResponse.text;
      const duration = Date.now() - startTime;

      console.log(`AI Response for ${taskId}: ${result}`);

      return {
        taskId,
        status: 'completed' as const,
        result,
        timestamp: new Date().toISOString(),
        duration,
      };
    } catch (error) {
      console.error(`Error processing task ${taskId}:`, error);
      return {
        taskId,
        status: 'failed' as const,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime,
      };
    }
  }
);

// Session management flow
export const sessionManagementFlow = ai.defineFlow(
  {
    name: 'sessionManagement',
    inputSchema: z.object({
      action: z.enum(['start', 'end', 'status']),
      userId: z.string(),
      sessionId: z.string().optional(),
    }),
    outputSchema: z.object({
      sessionId: z.string(),
      status: z.string(),
      timestamp: z.string(),
    }),
  },
  async input => {
    const { action, userId, sessionId } = input;

    switch (action) {
      case 'start':
        const newSessionId = `session-${Date.now()}-${userId}`;
        return {
          sessionId: newSessionId,
          status: 'active',
          timestamp: new Date().toISOString(),
        };

      case 'end':
        return {
          sessionId: sessionId || 'unknown',
          status: 'ended',
          timestamp: new Date().toISOString(),
        };

      case 'status':
        return {
          sessionId: sessionId || 'unknown',
          status: 'active',
          timestamp: new Date().toISOString(),
        };

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }
);

export type VoiceTaskInput = z.infer<typeof VoiceTaskInputSchema>;
export type VoiceTaskOutput = z.infer<typeof VoiceTaskOutputSchema>;

console.log('Genkit server started with flows registered');
