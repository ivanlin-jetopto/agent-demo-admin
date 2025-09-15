export interface UserType {
  id: string;
  email: string;
  lastActive: string;
  status: 'active' | 'blocked' | 'pending';
  createdAt: string;
  conversationCount: number;
  displayName?: string;
  averageUsageFrequency?: string;
  preferredUsageTime?: string;
}
