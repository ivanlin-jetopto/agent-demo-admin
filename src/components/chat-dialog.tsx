'use client';

import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp?: string;
}

interface ChatDialogProps {
  messages: Message[];
  className?: string;
}

export function ChatDialog({ messages, className }: ChatDialogProps) {
  return (
    <div className={cn('flex flex-col gap-3 p-6', className)}>
      {messages.map(message => (
        <div
          key={message.id}
          className={cn(
            'flex flex-col gap-1',
            message.sender === 'user' ? 'items-start' : 'items-end'
          )}
        >
          <div
            className={cn(
              'max-w-[80%] rounded-lg px-4 py-3 shadow-sm',
              message.sender === 'user'
                ? 'bg-muted/50 text-foreground'
                : 'bg-foreground text-background'
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          {message.timestamp && (
            <p
              className={cn(
                'text-xs text-muted-foreground',
                message.sender === 'user' ? 'ml-1' : 'mr-1'
              )}
            >
              {message.timestamp}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
