# FocusGrid QA Checklist

## Data validation regression checks
- [ ] Valid `YYYY-MM-DD` keys are accepted in saved history and focus sessions.
- [ ] Invalid date strings and malformed date keys are ignored during local storage loading.
- [ ] Existing saved history and focus sessions still load after an app update.

## Local data
- [ ] Start with empty storage: defaults load without errors.
- [ ] Add habits until 5; sixth is blocked.
- [ ] Edit habits: change name, icon, category; save and verify completion history and linked sessions stay attached.
- [ ] Cancel the editor and confirm no changes are saved.
- [ ] Edit and delete habits; deleted habit IDs are removed from every date's history.
- [ ] Toggle a habit repeatedly; each toggle updates only today's entry.
- [ ] Refresh: habits, history, and focus sessions persist.
- [ ] Delete all habits, refresh, and confirm the intentionally empty habit list remains empty (defaults must not reappear).
- [ ] Corrupt or invalid localStorage JSON: app falls back safely.
- [ ] Old habit storage key migrates and is capped at five valid habits.

## Focus timer
- [ ] Stopwatch starts at 00:00 and counts upward once per second.
- [ ] Pause and resume preserve elapsed stopwatch time.
- [ ] Pausing records each newly completed whole minute once.
- [ ] Resuming and pausing again records only additional whole minutes.
- [ ] Reset and mode switching save unrecorded stopwatch minutes before clearing elapsed time.
- [ ] Long stopwatch runs are stored as valid session chunks and survive refresh/cloud backup.
- [ ] Reset stops stopwatch and returns elapsed time to 00:00.
- [ ] Switching between stopwatch and countdown modes stops the previous timer.
- [ ] Start, pause, resume, and reset.
- [ ] Switch modes while running; timer stops and selected mode duration resets.
- [ ] Custom duration stays within 1–180 minutes.
- [ ] Completing focus records one session and starts a short break.
- [ ] Completing a break returns to focus.
- [ ] Refresh preserves completed sessions.

## Full-screen focus mode
- [ ] Focus mode opens as a viewport-filling distraction-free overlay.
- [ ] Timer display stays in sync with the dashboard timer.
- [ ] Pause/resume and reset work inside the overlay.
- [ ] Exit controls close the overlay without resetting timer state.
- [ ] Countdown progress ring advances and stopwatch uses an indeterminate ring.
- [ ] Overlay controls remain usable at 320px, 390px, tablet and desktop widths.

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

## Session history
- [ ] Session history lists all saved focus sessions grouped by date, newest date first.
- [ ] Each session displays its duration and can be deleted individually.
- [ ] Deleting a session updates daily, weekly, all-time, and timeline totals immediately.
- [ ] Empty history displays a helpful empty state.
- [ ] Session records remain deleted after refresh and are reflected in cloud backups.
- [ ] Session history remains readable at 320px, 390px, tablet, and desktop widths.

## Focus goals
- [ ] Daily and 7-day targets load with defaults on first launch (120 and 600 minutes).
- [ ] Goal changes persist after refresh and remain available offline.
- [ ] Daily progress uses today's saved focus sessions.
- [ ] 7-day progress matches the rolling seven-day statistics window.
- [ ] Progress bars cap visually at 100% while totals may exceed the target.
- [ ] Deleting or restoring focus sessions immediately recalculates goal progress.
- [ ] Invalid saved goal values fall back safely and entered values stay within supported bounds.

## Habit-linked focus sessions
- [ ] Choose a habit before starting a focus timer or stopwatch.
- [ ] Completed countdown sessions save the selected habit ID and name.
- [ ] Stopwatch pause/reset/mode-switch saves keep the selected habit association.
- [ ] Sessions started without a selected habit remain unlinked.
- [ ] Session history and recent sessions show the linked habit label.
- [ ] Renaming or deleting a habit does not erase historical session labels.
- [ ] Older sessions without habit metadata continue loading.
- [ ] Cloud backup and restore preserve optional habit links and reject malformed metadata.


## Streak freeze
- [ ] A new install starts with zero protected dates and no freeze usage.
- [ ] Protecting yesterday adds exactly one date and preserves current/longest streak calculations.
- [ ] A freeze cannot be used when yesterday already has a completion.
- [ ] A freeze cannot be used without any existing streak history.
- [ ] The same date cannot be protected twice.
- [ ] Exactly two freezes can be used per calendar month; a new month resets the allowance.
- [ ] A protected date does not create a habit completion or alter the activity heatmap.
- [ ] Protected dates persist after refresh and survive cloud backup/restore.
- [ ] Older backups without a `freezes` field still restore successfully.


## Streak calendar and freeze history
- [ ] Calendar opens on the current month and displays the correct weekday alignment and number of days.
- [ ] Previous/next month navigation works; future months cannot be selected.
- [ ] Days with real habit completions are visually distinct from protected days.
- [ ] A protected day is shown even when no habit completion exists for that date.
- [ ] Today is visibly outlined without overriding completed/frozen status.
- [ ] Freeze history lists all protected dates newest first and formats dates in the local locale.
- [ ] Empty freeze history displays a clear empty state.
- [ ] Calendar and freeze history update immediately after using a freeze and after cloud restore.
- [ ] Layout remains usable at 320px, 390px, tablet, and desktop widths.


## Appearance themes
- [ ] First launch defaults to dark appearance.
- [ ] Switching to warm light updates the dashboard, navigation, forms, cards, calendar, history, and focus overlay.
- [ ] Switching back to dark restores the original dark palette.
- [ ] Theme preference persists after refresh and app restart.
- [ ] Theme selection remains usable at 320px, 390px, tablet, and desktop widths.
- [ ] Story preview and exported PNG retain their branded dark design regardless of workspace theme.


## Onboarding
- [ ] Fresh install shows welcome screen once.
- [ ] Welcome feature cards are legible on small mobile screens.
- [ ] Get started opens the app and the welcome screen stays dismissed after reload.
- [ ] Light theme styling is readable when selected.
\n\n## Habit categories\n- [ ] New habits can be assigned Learning, Health, Mind, Work, or Other.\n- [ ] Category filters show only matching habits and All shows every habit.\n- [ ] Empty category filter displays a helpful message.\n- [ ] Existing habits and older backups without categories remain valid and appear under Other.\n- [ ] Category metadata survives backup/restore.\n- [ ] Filter tabs and category selector are usable on narrow screens.\n