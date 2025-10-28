## Learning Management Frontend (React + Vite + TypeScript)

A SPA for managing courses, enrollments, and reports with a consistent UX layer (dialogs, toasts, loading).

### Quick Start

#### Prerequisites
- Node.js 18+ (20+ recommended)
- npm

#### Setup
```bash
npm install
```

A `.env` file is already included. Verify it points to your backend:
```bash
VITE_BASE_API_URL_COURSE=https://localhost:7000/api/courses
```

#### Run
```bash
npm run dev
```
Open the printed local URL (usually `http://localhost:5173`).

#### Build & Preview
```bash
npm run build
npm run preview
```

### Project Structure
- `src/app/providers`
  - `Providers.tsx` — wires core providers
  - `DialogProvider`, `LoadingProvider`, `ToastProvider` — cross-cutting UX
  - `hooks` — `useDialog`, `useLoading`, `useToast`
- `src/routes` — `AppRoutes`, `ScrollToTop`
- `src/domains`
  - `courses`
    - `components` — feature UI (courses listing, enrollments, reports)
    - `hooks` — `useCourse`, `useCourseService`, `useEnrollmentReport`
    - `services` — `CourseService` with Axios instance
    - `schemas` — `CourseSchema`
    - `types` — DTOs shared at the UI layer
  - `client` — landing and shared client-facing components
- `src/shared/components/ui/Theme` — app theme and UI building blocks
- `src/shared/http/httpClient.ts` — base HTTP client

### Design Decisions
- **Feature-first structure**: Domains encapsulate components, hooks, services, and types.
- **Service + hook pattern**: Services encapsulate remote calls; hooks manage component-level data fetching and state.
- **Provider-based UX**: Dialog, Toast, and Loading providers standardize user feedback and interactions.
- **Type-safe UI**: DTO and schema types keep UI contracts explicit.

### Configuration
- `VITE_BASE_API_URL_COURSE` is required to point the app to the Courses API.
- Adjust theme and UI customizations under `shared/components/ui/Theme`.

### Trade-offs and Improvements
- **State management**: Local hooks and providers are sufficient now; for cross-screen state or offline caching, will use Redux.
- **Error handling**: Centralize API error normalization and map to user-friendly toasts/dialogs.
- **Auth**: When the backend adds JWT:
  - Store tokens securely (in-memory with refresh flow or secure cookies).
  - Add an auth provider and Axios interceptors for token refresh.
  - Derive identity-driven views (e.g., student vs admin).
- **Accessibility**: Expand a11y testing and keyboard navigation coverage.
- **Testing**: Add component and integration tests (Vitest/RTL), contract tests against mocked API.
- **Performance**: Code-split large routes and virtualize large tables if needed.

### Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — lint code (if configured in the project)
