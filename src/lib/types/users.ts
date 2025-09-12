export interface UserType {
  id: string;
  email: string;
  lastActive: string;
  status: 'active' | 'blocked';
  createdAt: string;
  conversationCount: number;
}
