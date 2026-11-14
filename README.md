# OrbitalPulseHealth Frontend

A responsive astronaut wellness dashboard concept for the NASA Space Apps Challenge. This frontend is a demo UI with simulated sample health values.

## Features
- Mission dashboard with vital indicator cards
- Heart rate and sleep charts
- Interactive astronaut body-map SVG
- Mission timeline chart
- Health record input modal and browser-session state
- JSON report export
- Responsive sidebar navigation
- Dark space-inspired UI

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (typically http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Notes
- This package is frontend-only. It does not include a backend, authentication, connected sensors, or medical-device integration.
- All initial measurements and chart values are illustrative simulated data.
- Submitted check-ins are held in React state for the current browser session and are not persisted to a server.
- This is a prototype for health awareness and does not diagnose conditions or prescribe treatment.
