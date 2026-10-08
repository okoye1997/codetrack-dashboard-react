# CodeTrack

CodeTrack is a React web app for tracking daily learning activity and keeping a study streak. The current interface includes account creation, sign in, a sign-in error state, and a responsive learning dashboard.

## Features

- Create an account and sign in with the included mock account.
- Show and hide the password field.
- View streak, monthly log, and weekly study-hour metrics.
- Browse a contribution heatmap, recent learning logs, goals, and activity chart.
- Use the dashboard’s sidebar on larger screens and bottom navigation on mobile.
- View responsive authentication and dashboard layouts.

## Requirements

- Node.js with npm

The project uses React 19, Vite, React Router, Tailwind CSS, Lucide icons, and React Icons. The interface styles are maintained in `src/index.css`.

## Getting started

From the project directory, install the dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

## Pages

| Path | Page |
| --- | --- |
| `/` | Redirects to sign in |
| `/signin` | Sign-in form and invalid-credentials error state |
| `/signup` | Create-account form |
| `/dashboard` | Learning activity dashboard |

You can open the dashboard directly at `http://localhost:5173/dashboard`.

## Demo sign-in

The mock account is defined in `Sim-Data/data.json`:

- **Email:** `alex@codetrack.test`
- **Password:** `password123`

Account and dashboard behavior is local demo functionality. There is no backend or real OAuth integration. Newly created accounts and the signed-in state are held in memory and reset when the app reloads. GitHub and Google sign-in, password recovery, Terms, and Privacy Policy display demo notices rather than connecting to external services.

## Data

`Sim-Data/data.json` supplies the dashboard snapshot, mock account, profile, learning logs, and goals. `src/services/MockDataservice.js` derives recent logs, activity values, contribution heatmap cells, and dashboard metrics from that dataset.

## Project structure

```text
src/
├── App.jsx                         # Routes and application providers
├── main.jsx                        # React entry point
├── index.css                       # Global styles and responsive layouts
├── components/
│   ├── CodeTrackBrand.jsx          # CodeTrack wordmark
│   ├── DashboardHeader.jsx         # Dashboard greeting and actions
│   ├── DashboardSidebar.jsx        # Desktop and mobile navigation
│   └── MetricCard.jsx              # Dashboard summary metric
├── context/
│   ├── AuthContext.jsx             # Local demo authentication state
│   ├── AuthContextValue.js         # Authentication context
│   ├── DashboardContext.jsx        # Dashboard data provider
│   └── DashboardContextValue.js    # Dashboard data context
├── hooks/
│   ├── UseAuth.js                  # Authentication context hook
│   └── UseDashboard.js             # Dashboard context hook
├── pages/
│   ├── AuthPage.jsx                # Sign-in and account creation
│   └── dashboardPage.jsx           # Dashboard screen
└── services/
    └── MockDataservice.js          # View data derived from Sim-Data

Sim-Data/
└── data.json                      # Mock user, log, and goal data
```

## Available commands

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```

## Design reference

The interface follows the supplied CodeTrack design screens. The linked Figma file is the design reference for visual updates:

[Open the CodeTrack Figma design](https://www.figma.com/design/Q8wzGaxxwdlgbCOixIWDr1/CODETRACK?node-id=2-6017&p=f)
