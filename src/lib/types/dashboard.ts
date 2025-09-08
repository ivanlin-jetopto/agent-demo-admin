export interface UserActivityType {
  activeUsers: number;
  newUsersToday: number;
  weeklyActiveUsers: number;
  averageSessionDuration: number;
}

export interface BusinessMetricType {
  totalConversationsToday: number;
  averageConversationTurns: number;
  apiCalls: number;
  taskCompletionRate: number;
}
