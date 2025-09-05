# User Management

### 1. User List View

- User Table implementation with TanStack Query
- API endpoint: `GET /admin/v1/users`
- Components: components/tables/users-table.tsx
- Shows: User ID, Email, Last Active, Status, Actions
- Actions dropdown menu includes:
  - **查看詳情** (View Details): Navigate to user detail page at `/users/{id}`
  - **編輯用戶** (Edit User): Navigate to user edit page at `/users/{id}/edit`
    - API: `PATCH /admin/v1/users/:id`
  - **封鎖用戶** (Block User): Shows when user status is 'active'
    - API: `POST /admin/v1/users/:id/block`
  - **解除封鎖** (Unblock): Shows when user status is 'blocked'
    - API: `POST /admin/v1/users/:id/unblock`

### 2. User Search & Filters

- Search by email/user ID
- Filter by status (Active/Blocked/All)
- Filter by registration date range
- Filter by activity level

# Dashboard

### 1. Real-time Statistics Monitoring

Implementation:
// Hook: useRealtimeStats()
// Firestore Document: admin_dashboard/realtime_stats

Data Structure:

- activeUsers: number
- apiCalls: number
- errorRate: number
- avgLatency: number

Component Location: `lib/hooks/useRealtimeStats.ts`

### 2. System Health Indicators

Firestore Structure:

```
'/admin_dashboard/realtime_stats': {
  systemHealth: 'healthy' | 'degraded' | 'down';lastUpdated: Timestamp;
}
```

### 3. API Usage & Cost Monitoring

Chart Component:

// components/charts/api-usage-chart.tsx

// Displays: STT, TTS, Gemini API usage trends

Stats Cards:

- Component: components/dashboard/stats-card.tsx
- Formats: number, percent, currency

Cost Optimization:

- "顯示每項操作成本"
- "提供優化建議"
- "設定使用量警示"

API Endpoint: `GET /admin/v1/dashboard/stats`

### 4. Alert & Notification System

Firestore Collection:
`'/admin_dashboard/alerts/{alertId}': {id: string;type: 'error' | 'warning' | 'info';message: string;timestamp: Timestamp;resolved: boolean;}`

- Alert Features 異常告警自動通知
- Real-time Alert Monitoring 即時發現異常並快速處置

### 5. Analytics & Reports Section

Data Analysis Features:

- "使用模式深度分析"
- "Function Calling 成功率追蹤"
- "地理熱點視覺化"
- "自訂報表產生"

Analytics Use Cases:

- "分析師產生週/月報表"
- "識別用戶使用模式"
- "優化功能設計方向"

API Endpoints:

- Usage analytics: `GET /admin/v1/analytics/usage`
- Export reports: `POST /admin/v1/analytics/export`

Data Sources:

- Firestore: 即時運營數據
- PostgreSQL: 歷史數據分析
- Cloud Monitoring: 系統指標
- BigQuery: 大數據分析（未來）

### 6. Audit Logs

Source: /Users/joana.chang/Documents/Projects/agent-demo-doc/02-產品規劃/i
mpl-admin.md:516-523

Firestore Structure:
`'/admin_dashboard/audit_logs/{logId}': {id: string;adminId: string;action: string;target: string;timestamp: Timestamp;metadata: Record<string, any>;}`

Security Requirements:

- "完整審計日誌"
- "完整操作追蹤"

### 7. Conversation Monitoring (Supporting US1)

Real-time Conversations:

Hook: `useRealtimeConversations()`

- Monitors last 7 days of conversations
- Firestore collection: conversations

Historical Conversation Query:

- API: `GET /admin/v1/conversations/history`
- Data from PostgreSQL for long-term storage

### 8. Traffic Report Management (Supporting US2)

Phase 2 Features:

- "路況審核系統（US2）"
- "內容審核工作流"

API Endpoints:

- `GET /admin/v1/traffic/reports`
- `PATCH /admin/v1/traffic/reports/:id`
