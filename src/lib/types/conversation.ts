export interface ConversationHistory {
  id: string;
  userId: string;
  sessionId: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ConversationType {
  sessionId: string;
  userId: string;
  timestamp: string;
  tasks?: string[];
}
