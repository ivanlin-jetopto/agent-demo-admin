# User Management

### 1. User List View

- User Table implementation with TanStack Query
- API endpoint: GET /admin/v1/users
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
