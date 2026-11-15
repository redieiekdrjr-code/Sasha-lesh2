# IGROgram

Telegram-inspired Android messenger prototype.

## Project layout
- `android/` Android application
- `server/` Node.js WebSocket chat server
- `.github/workflows/` CI build workflow

## Important hosting note
GitHub repositories and GitHub Actions do not run a persistent WebSocket server. The server code can be stored and tested here, but live multi-user messaging requires an always-on host or a serverless realtime provider. The Android app will need the deployed server URL before real online chat can work.

## Build
The Android APK is built by GitHub Actions. Open Actions and download the `IGROgram-debug-apk` artifact after a successful run.
