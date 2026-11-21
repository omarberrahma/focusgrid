# FocusGrid

A local-first, mobile-friendly habit and focus tracker. FocusGrid starts simple: habits, daily completion, streaks, and a GitHub-style activity grid. Share cards, analytics, PWA support, and cloud sync follow the roadmap.

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
- Weekly stats: habit completion rate, focus minutes, top habit, and 7-day focus chart\n- Daily progress story card (1080×1920) with PNG export\n- Focus timer: 25-minute default, editable focus duration
- Short (5m) and long (15m) break modes
- Start, pause, reset
- Automatically records completed focus sessions locally
- Today and all-time focus minutes, plus recent session list
- Responsive dark-first UI

## Roadmap
1. Application scaffold — complete
2. Habit engine and activity grid — complete
3. Focus engine and session history — implemented; build/runtime verification pending
4. Statistics and insights
5. Share engine — daily story card and PNG export implemented; build verification pending\n6. Weekly/monthly share cards (PNG and 9:16 story)
6. PWA / offline install
7. Cloud sync and accounts (later)

Built with React, TypeScript, Vite, and Lucide.
