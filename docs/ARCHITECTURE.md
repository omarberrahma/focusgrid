# FocusGrid architecture

## Entry points
- `src/main.tsx`: React bootstrap, global CSS, service worker registration.
- `src/App.tsx`: app shell and page-level UI/state orchestration.

## Shared types
- `src/types.ts`: Habit, History, and FocusSession data shapes.

## Utilities
- `src/lib/date.ts`: local date keys and day shifting.
- `src/lib/habits.ts`: streak calculation.
- `src/lib/cloud.ts`: backup serialization and payload validation.
- `src/lib/cloudBackup.ts`: Supabase backup, restore, and auth operations.
- `src/lib/supabase.ts`: optional Supabase client configuration.

## UI components
- `src/CloudBackupPanel.tsx`: cloud backup and restore panel.
- `src/components/HabitList.tsx`: habits list, completion toggles, edit/delete actions, and add-habit UI.
- `src/components/FocusTimer.tsx`: timer modes, timer controls, duration input, focus-mode entry, and focus-session summaries (state is owned by App).
- `src/components/FocusOverlay.tsx`: full-viewport distraction-free timer overlay; receives timer state and actions from App.\n- `src/components/SessionHistory.tsx`: date-grouped focus-session timeline with individual deletion.
- `src/components/StatsOverview.tsx`: weekly summary tiles and top-habit insight.
- `src/components/WeeklyChart.tsx`: weekly focus-minutes bar chart.
- `src/components/ActivityHeatmap.tsx`: 12-week habit activity visualization.
- `src/components/AppShell.tsx`: shared application frame and content layout.
- `src/components/Sidebar.tsx`: desktop primary navigation and workspace identity.
- `src/components/Header.tsx`: dashboard greeting, connection status, install action, and date.
- `src/components/BottomNav.tsx`: fixed mobile navigation.
- `src/App.tsx`: application state, derived metrics, event handlers, and dashboard composition.

## Design principles
- Local-first: core habit and focus features work without cloud configuration.
- Small, incremental refactors: extract pure helpers before UI/state components.
- Shared domain types: avoid duplicating data shapes across modules.
- Keep persistence compatibility: preserve existing localStorage keys during refactors.


## Stopwatch mode
The `FocusTimer` component exposes a stopwatch option. `App` owns the mode and elapsed-seconds state; the timer effect counts upward while stopwatch mode is active. Switching modes clears the running state, and reset returns the stopwatch to zero. When paused, reset, or switched to another mode, newly completed whole minutes are appended to focus history. Long elapsed periods are split into records of at most 180 minutes to remain compatible with local storage and cloud backup validation. Partial minutes are not saved.


## Full-screen focus mode
`App` owns the overlay visibility and timer state. `FocusOverlay` is a viewport-filling distraction-free presentation layer; it does not create a second timer. Countdown modes show remaining-time progress, while stopwatch mode uses an open-ended ring. Exiting the overlay leaves the active timer state unchanged.

 
## Session history
`App` owns the persisted focus-session collection and deletion action. `SessionHistory` renders the collection grouped by date, newest first, and emits an individual session ID when a record is deleted. All dashboard statistics derive from the same collection, so they recalculate after deletion.
