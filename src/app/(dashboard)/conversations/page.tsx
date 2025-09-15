'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ConversationsTable from '@/components/tables/conversations-table';

function ConversationsContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
  return <ConversationsTable initialUserId={userId} />;
}

export default function ConversationsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Suspense fallback={<div>載入中...</div>}>
        <ConversationsContent />
      </Suspense>
    </main>
  );
}
