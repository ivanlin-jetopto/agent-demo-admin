'use client';

import { cn } from '@/lib/utils';
import { ConversationHistory } from '@/lib/types/conversation';

interface ChatDialogProps {
  messages: ConversationHistory[];
  className?: string;
}

export function ChatDialog({ messages, className }: ChatDialogProps) {
  // Format timestamp for display
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
              {formatTime(message.timestamp)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
