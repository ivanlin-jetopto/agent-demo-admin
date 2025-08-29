# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EV charging core admin dashboard built with Next.js 15.3.4, React 19, and modern web technologies using App Router architecture with shadcn/ui components.

## Critical Rules

**MUST FOLLOW:**

1. ✅ Always check `task.md` at conversation start
2. ✅ Run quality checks before EVERY commit: `npm run lint && npm run format && npm run build`
3. ✅ Never hardcode UI text - use translation keys
4. ✅ Type safety is highest priority - no `any` types
5. ✅ Update task.md status after commits
6. ✅ Follow server/client component separation
7. ✅ Place `data-testid` on interactive elements only (SelectTrigger, not Select wrapper)

## Quick Reference

### Essential Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint check
npm run format       # Prettier format
npm run test:e2e     # Run E2E tests
```

### Key Files & Directories

- `task.md` - Current development tasks
- `@/components` - React components
- `@/stores` - Zustand state stores
- `@/lib/utils` - Utility functions
- `docs/` - Detailed documentation

### Path Aliases

- `@/components` - React components
- `@/lib/utils` - Utility functions
- `@/components/ui` - UI primitives
- `@/stores` - Zustand state management stores

## Technology Stack

- **Framework**: Next.js 15.3.4 (App Router)
- **UI**: shadcn/ui (new-york style) + Tailwind CSS v4
- **State**: Zustand with localStorage persistence
- **Auth**: Firebase + Backend API hybrid
- **i18n**: next-intl (zh-TW default, en)
- **Testing**: Playwright (error-driven approach)
- **TypeScript**: Strict mode enabled
- **Build Tool**: Turbopack

## Development Workflow

```
Analysis → Planning → Development → Testing → Quality Checks → Commit
```

**Before Starting:**

1. Read `task.md` for current state
2. Continue from last progress
3. Don't redo completed work

**Before Committing:**

1. Run ALL quality checks
2. Ensure tests pass
3. Update task.md status
4. Write clear commit messages (no attribution)

## Architecture Overview

### State Management

- Zustand stores in `@/stores/`
- Individual subscriptions for performance
- localStorage persistence with special patterns
- See: [State Management Guide](./docs/org-group-state-management.md)

### Component Patterns

- Server/Client separation for optimal performance
- shadcn/ui components with proper styling
- i18n with `@@i18n:` prefix for dynamic translations
- See: [Component Architecture](./docs/component-architecture.md)

### Authentication

- Firebase for identity authentication
- Backend API for authorization
- sessionStorage for auth state
- Hybrid token flow

### Testing

- Error-driven approach
- Authentication required for dashboard pages
- See: [E2E Testing Guide](./docs/e2e-testing-guide.md)

### Internationalization

- Server: `getTranslations` from 'next-intl/server'
- Client: `useTranslations` from 'next-intl'
- See: [i18n Guide](./docs/i18n-guide.md)

## Shared Components

### Organization Group Selector

- Location: `@/components/shared/org-group-selector.tsx`
- Variants: `OrgGroupSelector`, `CompactOrgGroupSelector`
- Test IDs: `organization-selector`, `group-selector`
- Integrates with Zustand store

## Type Safety Standards

- Always prefer specific types over `any` or `unknown`
- Create comprehensive DTO types based on API documentation
- Use Firebase native types (e.g., `User as FirebaseUser`)
- Remove unused imports and maintain clean codebase
- Use meaningful type aliases for clarity

## Code Quality Standards

- Replace all `any` types with proper DTOs
- Never hardcode UI text - always use translation keys
- New features must include translations for both zh-TW and en
- Use Context7 tool for latest library documentation
- Follow official best practices for all technologies

## Documentation Links

### Detailed Guides

- [Component Architecture](./docs/component-architecture.md) - Server/Client patterns, naming conventions
- [E2E Testing Guide](./docs/e2e-testing-guide.md) - Error-driven testing approach
- [i18n Guide](./docs/i18n-guide.md) - Translation implementation details
- [State Management](./docs/org-group-state-management.md) - Zustand persistence patterns
- [Task Template](./docs/task-template.md) - Standardized task planning

### New Guides

- [API & Route Mapping](./docs/api-route-mapping.md) - Frontend routes, permissions, and API endpoints mapping
- [Logging Guide](./docs/logging-guide.md) - Logger utilities and best practices
- [External Integrations](./docs/external-integrations.md) - Postman API, Firebase MCP
- [Troubleshooting Guide](./docs/troubleshooting-guide.md) - Common issues and solutions
- [Performance Tips](./docs/performance-tips.md) - Claude Code optimization

## Task Management

### Status Markers

- ⏳ Pending
- 🔄 In Progress
- ✅ Completed

### Update Timing

1. Before starting: Mark as 🔄
2. After commit: Mark as ✅
3. End of session: Ensure accurate status

**Important**: Always update task.md before ending a conversation session.

## Quick Troubleshooting

### Firebase MCP Auth Issues

```bash
npx -y firebase-tools@latest login --reauth
```

### Build Cache Issues

```bash
rm -rf .next
npm run build
```

For more issues, see: [Troubleshooting Guide](./docs/troubleshooting-guide.md)

## Performance Tips

1. Use Task tool for complex searches
2. Batch tool calls when reading multiple files
3. Reference docs instead of repeating explanations
4. Use Context7 for latest documentation

---

**Remember**: Complex implementation details belong in specialized docs under `docs/` directory.
