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
- `src/components/FocusTimer.tsx`: timer modes, timer controls, duration input, and focus-session summaries (state is owned by App).
- `src/components/StatsOverview.tsx`: weekly summary tiles and top-habit insight.
- `src/components/WeeklyChart.tsx`: weekly focus-minutes bar chart.
- `src/components/ActivityHeatmap.tsx`: 12-week habit activity visualization.
- `src/App.tsx`: main dashboard orchestration, state, derived metrics, and story export. Most display sections are extracted into reusable components.

## Design principles
- Local-first: core habit and focus features work without cloud configuration.
- Small, incremental refactors: extract pure helpers before UI/state components.
- Shared domain types: avoid duplicating data shapes across modules.
- Keep persistence compatibility: preserve existing localStorage keys during refactors.
