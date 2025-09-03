'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { taskFlow } from '@/lib/api/task';
import { Timeline, TimelineItemData } from '@/components/ui/timeline';

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [timelineItems, setTimelineItems] = useState<TimelineItemData[]>([]);
  const statusMap: Record<number, 'pending' | 'completed'> = {
    0: 'completed',
    1: 'completed',
    2: 'pending',
    3: 'pending',
    4: 'pending',
  };

  useEffect(() => {
    //api
    if (id) {
      taskFlow({ id })
        .then(r => {
          // Transform flow data into timeline items with proper timestamps
          const baseTime = new Date();
          const items: TimelineItemData[] = r.flow.map((step, index) => {
            // Create timestamps with 5 minute intervals
            const itemTime = new Date(
              baseTime.getTime() + index * 5 * 60 * 1000
            );
            return {
              id: `flow-${index}`,
              title: step,
              description: 'description',
              date: itemTime.toISOString(),
              status: statusMap[index] || 'pending',
            };
          });
          setTimelineItems(items);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          size="sm"
          className="w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
      </div>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-xl font-semibold mb-8">任務詳情: {id}</h1>
          {timelineItems.length > 0 ? (
            <Timeline items={timelineItems} />
          ) : (
            <p className="text-muted-foreground text-center">載入中...</p>
          )}
        </div>
      </div>
    </main>
  );
}
