# EventMate

A simple Expo React Native app for managing event schedules.

## Storage
- Uses AsyncStorage for storing events, My Plan, and drafts.
- Hydrates from `assets/data/events.json` on first run.
- Checks `assets/data/events_updates.json` for updates via background refresh.

## Features
- View all events (with Updated badge if applicable)
- RSVP to events and view grouped by day
- Event details with map and share deep link
- Local notifications 30 min before events

- Background data refresh
- Draft event creation with validation & image picker

## Setup
```sh
npm install
npx expo start
