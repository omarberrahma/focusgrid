# FocusGrid

A local-first, mobile-friendly habit and focus tracker. FocusGrid helps build consistency through daily habits, focused work sessions, activity history, and shareable progress.

## Development
```bash
npm install
npm run dev
```

## Current features
- Daily habits: create, edit, delete, and check off (limit: 5)
- Local habit/history persistence and legacy habit migration
- Current and longest streak
- 12-week activity heatmap
- Weekly statistics: habit completion rate, focus minutes, top habit, and 7-day focus chart
- Daily progress story card (1080 × 1920) with PNG export
- Focus timer: 25-minute default, editable focus duration
- Short (5-minute) and long (15-minute) break modes
- Start, pause, and reset
- Automatically records completed focus sessions locally
- Today's and all-time focus minutes, plus recent sessions
- PWA manifest, install prompt, and service worker caching for offline app shell
- Online/offline status indicator
- Responsive dark-first interface
- Defensive local storage parsing and backup payload validation
- Automatic date rollover refresh while the app remains open

## Roadmap
1. Application scaffold — complete
2. Habit engine and activity grid — complete
3. Focus engine and session history — implemented (build verification pending)
4. Weekly statistics and insights — implemented (build verification pending)
5. Share engine — daily story card and PNG export (build verification pending)
6. PWA and offline support — implemented (installability and service worker; device testing pending)
7. Cloud backup/account foundation — implemented (Supabase setup and end-to-end verification pending)
8. Navigation and mobile UX — implemented
9. QA and stability — implemented (guardrails/checklist; runtime verification pending)
10. CI build workflow — added (GitHub Actions; build result not yet verified)
11. Architecture foundation — extracted shared date/streak utilities and documented module boundaries
12. Component separation — extracted HabitList UI
13. FocusTimer extraction — timer UI separated from App

See [QA checklist](docs/QA_CHECKLIST.md) before release. See [architecture guide](docs/ARCHITECTURE.md) for module boundaries. Build and device testing are not yet verified.

Built with React, TypeScript, Vite, and Lucide.
