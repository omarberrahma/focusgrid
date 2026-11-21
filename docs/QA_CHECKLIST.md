# FocusGrid QA Checklist

## Data validation regression checks
- [ ] Valid `YYYY-MM-DD` keys are accepted in saved history and focus sessions.
- [ ] Invalid date strings and malformed date keys are ignored during local storage loading.
- [ ] Existing saved history and focus sessions still load after an app update.

## Local data
- [ ] Start with empty storage: defaults load without errors.
- [ ] Add habits until 5; sixth is blocked.
- [ ] Edit and delete habits; deleted habit IDs are removed from every date's history.
- [ ] Toggle a habit repeatedly; each toggle updates only today's entry.
- [ ] Refresh: habits, history, and focus sessions persist.
- [ ] Corrupt or invalid localStorage JSON: app falls back safely.
- [ ] Old habit storage key migrates and is capped at five valid habits.

## Focus timer
- [ ] Start, pause, resume, and reset.
- [ ] Switch modes while running; timer stops and selected mode duration resets.
- [ ] Custom duration stays within 1–180 minutes.
- [ ] Completing focus records one session and starts a short break.
- [ ] Completing a break returns to focus.
- [ ] Refresh preserves completed sessions.

## Date boundaries and stats
- [ ] Leave app open past midnight: today and daily totals refresh.
- [ ] Weekly chart reflects last seven calendar dates.
- [ ] Activity heatmap counts only currently defined habits.
- [ ] Current streak handles today incomplete and yesterday complete.
- [ ] Longest streak handles consecutive calendar dates.

## PWA and offline
- [ ] Install prompt works when supported.
- [ ] Offline indicator reflects connectivity.
- [ ] Previously cached app shell opens offline.
- [ ] Online/offline transitions update status.

## Cloud backup (only after Supabase setup)
- [ ] Email magic link sign-in and sign-out.
- [ ] Backup upload is owner-scoped by RLS.
- [ ] Restore requires confirmation and replaces local state.
- [ ] Invalid cloud payload is rejected.
- [ ] No credentials are committed to source control.

## Responsive UI
- [ ] Bottom navigation scrolls to each section.
- [ ] Desktop sidebar navigation works.
- [ ] Check cards, timer controls, inputs and charts at 320px, 390px, tablet and desktop widths.
- [ ] Confirm no content is obscured by fixed mobile navigation.
