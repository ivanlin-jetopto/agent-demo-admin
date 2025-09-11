'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ChatDialog } from '@/components/chat-dialog';
import { mockConversations } from '@/lib/mock-data/conversations';

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const history = mockConversations;

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Button
          onClick={() => router.push('/conversations')}
          variant="ghost"
          size="sm"
          className="w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
      </div>

      <div className="flex justify-center px-4 pb-8">
        <div className="w-full max-w-6xl">
          <h1 className="text-xl font-semibold text-center mb-4">
            會話詳情: {id}
          </h1>

          {/* Chat Dialog */}
          {history.length > 0 ? (
            <div className="border rounded-lg bg-card">
              <ChatDialog messages={history} />
            </div>
          ) : (
            <div className="border rounded-lg p-8">
              <p className="text-muted-foreground text-center">無對話記錄</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
