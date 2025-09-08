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

- 用戶活躍度 (User Activity)
  - 當前在線用戶數: `activeUsers: number`
  - 今日新增用戶數: `newUsersToday: number`
  - 7日活躍用戶數: `weeklyActiveUsers: number`
  - 平均使用時長 (in minutes): `averageSessionDuration: number`
- AI Agent 業務指標 (AI Agent Business Metrics)
  - 今日對話總數: `totalConversationsToday: number`
  - 平均對話輪數: `averageConversationTurns: number`
  - Function Call 總次數: `apiCalls: number`
  - 任務完成率 (percentage, 0-100): `taskCompletionRate: number`
- 趨勢圖表
  - 7日用戶活躍度趨勢圖
  - 24小時對話量分布圖
  - Function Call 使用趨勢
  - 錯誤率變化曲線

Component Location: `lib/hooks/useRealtimeStats.ts`

### 2. System Health Indicators

Firestore Structure:

```
'/admin_dashboard/realtime_stats': {
  systemHealth: 'healthy' | 'degraded' | 'down';
  lastUpdated: Timestamp;
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

- 顯示每項操作成本
- 提供優化建議
- 設定使用量警示

API Endpoint: `GET /admin/v1/dashboard/stats`

### 4. Alert & Notification System

Firestore Collection:
`'/admin_dashboard/alerts/{alertId}': {id: string;type: 'error' | 'warning' | 'info';message: string;timestamp: Timestamp;resolved: boolean;}`

- Alert Features 異常告警自動通知
- Real-time Alert Monitoring 即時發現異常並快速處置

### 5. Analytics & Reports Section

Data Analysis Features:

- 使用模式深度分析
- Function Calling 成功率追蹤
- 地理熱點視覺化
- 自訂報表產生

Analytics Use Cases:

- 分析師產生週/月報表
- 識別用戶使用模式
- 優化功能設計方向

API Endpoints:

- Usage analytics: `GET /admin/v1/analytics/usage`
- Export reports: `POST /admin/v1/analytics/export`

Data Sources:

- Firestore: 即時運營數據
- PostgreSQL: 歷史數據分析
- Cloud Monitoring: 系統指標
- BigQuery: 大數據分析（未來）

### 6. Audit Logs

Firestore Structure:
`'/admin_dashboard/audit_logs/{logId}': {id: string;adminId: string;action: string;target: string;timestamp: Timestamp;metadata: Record<string, any>;}`

Security Requirements:

- 完整審計日誌
- 完整操作追蹤

### 7. Conversation Monitoring (Supporting US1)

Real-time Conversations:

Hook: `useRealtimeConversations()`

- Monitors last 7 days of conversations
- Firestore collection: conversations

Historical Conversation Query:

- API: `GET /admin/v1/conversations/history`
- Data from PostgreSQL for long-term storage

#### 功能說明

**對話列表監控**

- 即時對話狀態
  - 進行中對話
  - 已完成對話
  - 錯誤/中斷對話
- 歷史對話查詢
  - 時間範圍選擇
  - 分頁瀏覽
- 多維度篩選
  - 按用戶篩選
  - 按時間篩選
  - 按狀態篩選
  - 按錯誤類型篩選

**對話詳情分析**

- 完整對話內容
  - 時間軸視圖
  - 用戶訊息原文
  - AI 回應內容
  - 訊息時間戳記
- 性能分析
  - Gemini API 回應時間
  - Function Call 執行時間
  - 後端處理總時長
- 錯誤診斷
  - 錯誤類型
  - 錯誤訊息
  - 發生時間點
  - 建議解決方案

**Function Call 追蹤**

- 調用詳情
  - 功能名稱
  - 調用參數
  - 執行結果
  - 調用時間
- 執行狀態
  - 成功/失敗
  - 錯誤原因
  - 重試次數

### 8. Traffic Report Management (Supporting US2)

Phase 2 Features:

- 路況審核系統（US2）
- 內容審核工作流

API Endpoints:

- `GET /admin/v1/traffic/reports`
- `PATCH /admin/v1/traffic/reports/:id`
