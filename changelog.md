# Changelog

## 2026-11-21 - Mobile App Dashboard tab expansion

**Author:** Stephanie Nguyen (Mobile App Dashboard lead)

Scope: the Mobile App Dashboard tab only. No other tab, the nav, shared data, CSS files, or `smart_greenhouse_client_portal.html` were changed.

### Phone mockup: now a 4-screen app
- Added a bottom tab bar (Home, Cameras, Energy, Alerts). It works with the mouse and the keyboard (arrow keys, Home, End).
- **Home:** the existing telemetry, quick actuators, and AI note, plus an "Updated just now" label and a status row for Irrigation, AI Monitoring, Solar, and Cameras.
- **Cameras:** Zone A - Cam 01 (Tomatoes) and Zone B - Cam 02 (Carrots). The feed view has a back arrow, Cam 01 / Cam 02 toggles, and a Snapshot button with a flash effect and a "Snapshot saved" message. The GIFs load only when a feed is opened.
- **Energy:** the dashboard's own copy of the Solar tab's phone pages (overview and panel connections), with the same sample numbers, switched by an Overview | Panels control. A link opens the Solar Panels tab.
- **Alerts:** 5 sample alerts with info, warning, and critical colors. "Test Push Notification" now also adds an alert to this list and shows an unread badge.

### Page sections
- **Overview card:** new overview text and pills. The card is the same height as the phone on desktop and has "Inside the app" tiles that switch the phone's screen, plus a "Who it's for" row.
- **What the App Does:** 6 function cards (Live Telemetry, Remote Controls, Smart Alerts, Live Cameras, Energy Monitoring, Roles and Learning Mode).
- **How data flows:** a 4-step strip: Sensors and Cameras, Greenhouse Controller, Cloud Database, Mobile App.
- **FAQ:** 8 questions.
- Added notes that all readings and camera feeds are simulated.

### Files
- `index.html`: markup inside `#tab-dashboard`, one added line in `triggerSimulatedAlert()`, and new `dash*` functions at the end of the main script. All new IDs and functions use the `dash` prefix so they don't clash with the Solar tab.

