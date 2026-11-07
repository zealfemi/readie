# Readie Candidate Integrity Portal

Readie is a web app for reviewing candidates in a hiring campaign. It shows candidate progress and opens each interview room for transcript, identity, and integrity reviews.

**Live app:** https://readie-final.vercel.app/

## What the app does

- Lists campaigns 119, 120, 122, and 123.
- Shows the candidates in each campaign.
- Lets a reviewer search by email, filter by status, and sort by submission date.
- Opens a candidate's room with three sections: Transcript, Identity Verification, and Integrity Audit.
- Keeps the campaign and room in the URL, so a page can be refreshed or shared.

The room page shows transcript entries and recordings, Phase 1 identity results, and Phase 2 integrity findings. Some rooms may require a person to review them even when the automated video risk is low.

## Main components

`App.tsx` sets up the page routes and React Query. `MainLayout` is the shared page frame: it displays the `Header` and puts the selected page inside its `Outlet`.

```text
App
└── MainLayout
    ├── Header
    └── Current page
        ├── Campaigns
        │   └── CampaignsList
        ├── Campaign
        │   ├── TableOperations
        │   │   ├── Filter
        │   │   └── SortBy
        │   └── Candidates
        └── RoomLayout
            └── Selected room tab
                ├── Transcript
                │   ├── RecordingList
                │   └── TranscriptText
                ├── IdentityVerification
                └── IntegrityAudit
```

`Campaign` shows one campaign's candidates. `TableOperations` groups the status filter and date sort controls. `Candidates` displays the results; `Spinner` and `Empty` are used while data loads or when there are no results.

`RoomLayout` displays the candidate and the room tabs. It loads the selected room and renders the chosen tab. `Transcript` contains the recording list, video player (or offline placeholder), and transcript text. `IdentityVerification` shows the Phase 1 results. `IntegrityAudit` shows Phase 2 risk results, observations, and limitations.

The small `useCampaign` and `useRoom` hooks load data through `src/services/api.ts`. That service chooses between the main API and the local mock API. `React Icons` are used inside the identity and integrity pages for video, people, risk, and status icons.

`NotFound` is shown for pages that do not exist. `Sidebar` and `SpinnerMini` are also in the project, but the current page layout does not render them.

## Technology

- React and TypeScript
- Vite
- React Router for page navigation
- TanStack Query for loading API data
- Tailwind CSS and React Icons for the interface

## Run the app

Install Node.js, open a terminal in the project folder, then run:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal. Vite usually uses `http://localhost:5173`.

## Mock data

The app uses local mock data by default when running with `npm run dev`. The mock API is in `src/mocks/mockApi.ts` and matches the shapes expected from the main API.

It provides three sample candidates for each campaign, with completed, in-progress, and failed statuses. Each candidate room has 12 sample recordings with transcript, identity, and integrity data. The sample emails use the reserved `example.test` domain. Video files are not included, so the transcript page shows an offline video placeholder.

To use the live API while developing, add this setting to a `.env.local` file in the project folder:

```text
VITE_USE_MOCK_API=false
```

To make a production build use mock data, set `VITE_USE_MOCK_API=true` before building. Production uses the live API by default.

## Main API

The app requests campaign candidate lists and room evaluation data from the Readie API:

```text
GET /auth/recording/jobs/campaignHACKATHON/{campaignId}
GET /auth/recording/jobs/roomsHACKATHON/{roomName}
```

The campaign request returns candidate details and progress. The room request returns recording details, transcript entries, Phase 1 identity data, and Phase 2 integrity data.

During local development, Vite forwards `/api` requests to `readie001.uc.r.appspot.com`. The Vercel configuration forwards the same API paths for the deployed app.

For live API access, create `.env.local` and provide the values for:

```text
VITE_READIE_CUSTOM_AUTH=your-custom-auth-value
VITE_READIE_BASIC_TOKEN=your-basic-token
VITE_USE_MOCK_API=false
```

Do not commit `.env.local`. Vite variables are sent to the browser, so do not put private production secrets in a public client-side build.

## Build and preview

```bash
npm run build
npm run preview
```

`npm run lint` checks the project with ESLint.

## ChatGPT assistance

I used ChatGPT to create the mock API data and to help me navigate and understand the main API used for this project. I reviewed and added that work to the app.
