# Kudozz Influencer Discovery — Frontend

Creator discovery dashboard launched under [kudozz.in](https://www.kudozz.in).

Next.js 14 (App Router) + Tailwind + Amplify v6 dashboard for the `influencer-discovery-be` AppSync API.

## Setup

```bash
cp .env.example .env.local   # fill from the backend stack outputs
npm install
npm run dev
```

| Env var | Backend output |
| --- | --- |
| `NEXT_PUBLIC_AWS_REGION` | `ap-south-1` |
| `NEXT_PUBLIC_AWS_USER_POOLS_ID` | `UserPoolId` |
| `NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID` | `UserPoolClientId` |
| `NEXT_PUBLIC_AWS_API_URL` | `GraphQLApiUrl` |

## Structure

- `src/aws-export.js` + `src/config/envConfig.ts` — Amplify config (configured in `src/lib/store/store.ts`, `ssr: true` so tokens live in cookies).
- `src/middleware.ts` — server-side route protection via `@aws-amplify/adapter-nextjs` (`/dashboard/*` needs a session, auth pages bounce signed-in users).
- `src/components/guards` — client guards (`AuthGuard` verifies the session, loads the user via `getUserById`, reacts to sign-out/refresh failure).
- `src/lib/graphql` — queries (`api.ts`) and the Amplify client wrappers (`handleApi.ts`).
- `src/lib/store` — Redux Toolkit + redux-persist (`userDetails` persisted; `creators` and `lists` in memory).
- `src/components/{auth,dashboard,discover,creators,lists,ui}` — UI.
- `src/components/lists` + `src/lib/store/slices/listsSlice.ts` — personal creator lists (stored in DynamoDB via the `*UserList*` / `*CreatorToList*` GraphQL operations). The "Save to list" picker is a single global modal mounted in `app/dashboard/layout.tsx`, opened with `openListPicker(creator)`.
- Branding (name, parent site link) lives in `src/config/brand.ts`; the Kudozz mark/wordmark in `src/components/ui/Logo.tsx`; palette in `tailwind.config.ts`.
