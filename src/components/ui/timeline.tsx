'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export interface TimelineItemData {
  id: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
  date: string | Date;
  status?: 'pending' | 'completed';
  icon?: React.ReactNode;
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItemData[];
  className?: string;
  orientation?: 'left' | 'right' | 'alternate';
}

interface TimelineItemProps extends TimelineItemData {
  isLast?: boolean;
  position?: 'left' | 'right';
}
const statusColors = {
  pending: 'bg-gray-200',
  completed: 'bg-gray-700',
};

export function TimelineItem({
  title,
  description,
  content,
  date,
  status = 'pending',
  tags,
  isLast = false,
}: TimelineItemProps) {
  const formatDateTime = (d: string | Date) => {
    const dateObj = typeof d === 'string' ? new Date(d) : d;

    if (isNaN(dateObj.getTime())) {
      return { date: '', time: typeof d === 'string' ? d : '' };
    }

    // Format date as "JUN 12" style
    const month = dateObj
      .toLocaleDateString('en-US', { month: 'short' })
      .toUpperCase();
    const day = dateObj.getDate();

    // Format time as "HH:MM"
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    return {
      date: `${month} ${day}`,
      time: `${hours}:${minutes}`,
    };
  };

  const { date: dateDisplay, time: timeDisplay } = formatDateTime(date);

  return (
    <div className={cn('relative flex items-start gap-6')}>
      {/* Date and Time on the left */}
      <div className="flex flex-col items-end text-xs min-w-[100px] pt-1">
        <div className="font-medium text-foreground/80 uppercase tracking-wide">
          {dateDisplay}
        </div>
        <div className="text-muted-foreground mt-1">{timeDisplay}</div>
      </div>

      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center min-h-[80px]">
        {/* Timeline dot - solid circle */}
        <div
          className={cn(
            'relative z-10 h-8 w-8 rounded-full flex items-center justify-center',
            statusColors[status]
          )}
        >
          {status === 'completed' && <Check className="h-4 w-4 text-white" />}
        </div>
        {/* Timeline line - extends from bottom of current dot to top of next */}
        {!isLast && (
          <div className="absolute top-8 bottom-0 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold leading-tight text-foreground">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1.5">
              {tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-1.5 py-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {content && <div className="mt-2 text-sm">{content}</div>}
        </div>
      </div>
    </div>
  );
}

export function Timeline({
  items,
  className,
  orientation = 'left',
}: TimelineProps) {
  return (
    <div className={cn('relative space-y-0', className)}>
      {items.map((item, index) => (
        <TimelineItem
          key={item.id}
          {...item}
          isLast={index === items.length - 1}
          position={
            orientation === 'alternate'
              ? index % 2 === 0
                ? 'left'
                : 'right'
              : orientation
          }
        />
      ))}
    </div>
  );
}
