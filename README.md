# HK Tramways Client Site

Monorepo with `frontend` (Next.js) and `backend` (Strapi) workspaces.

## Environments

The backend (Strapi) can run against three different databases, all from the same codebase:

| Environment    | Command                | Env file           | Database                                  |
| -------------- | ----------------------- | ------------------- | ------------------------------------------ |
| Local (SQLite) | `npm run backend:dev`   | `backend/.env`      | Local SQLite file, no AWS dependency       |
| Dev             | `npm run local-dev`     | `backend/.env.dev`  | Remote Postgres RDS + S3 (dev)             |
| UAT             | `npm run local-uat`     | `backend/.env.uat`  | Remote Postgres RDS + S3 (uat)             |

Run any of these from the repo root:

```bash
npm run dev          # frontend + backend against local SQLite
npm run local-dev     # frontend + backend against the dev DB/S3
npm run local-uat      # frontend + backend against the UAT DB/S3
```

`local-dev`/`local-uat` are useful when you want to develop or debug locally but see/edit real dev or UAT content instead of your local SQLite data.

Dev and UAT are genuinely separate databases and S3 buckets (not just config toggles), so content created in one never automatically appears in the other — that's what the sync scripts below are for.

Schema (content-type/component definitions under `backend/src/components` and `backend/src/api/*/content-types`) is plain code shared by every environment — it doesn't need syncing, it just ships with whichever code is deployed/running.

## Syncing data between environments

All sync scripts live in `backend/scripts/` and are exposed as npm scripts (proxied from the repo root too, where noted). They export `content` + `files` (database entries + uploaded media) via Strapi's transfer tool and import them into the target — nothing else.

| Script                                    | Direction                  | Root-level alias         |
| ------------------------------------------ | --------------------------- | -------------------------- |
| `npm run sync-dev-to-local` (in `backend/`) | dev → local SQLite          | `npm run sync-dev-to-local` |
| `npm run sync-local-to-dev`                | local SQLite → dev          | `npm run sync-local-to-dev` |
| `npm run sync-dev-to-uat`                  | dev → UAT                   | `npm run sync-dev-to-uat`  |
| `npm run sync-uat-to-dev`                  | UAT → dev                   | `npm run sync-uat-to-dev`  |

`sync-dev-to-uat` and `sync-uat-to-dev` additionally run `backend/scripts/sync-layout.js`, which syncs two things the plain content/files export doesn't cover (because they live outside Strapi's normal content — see below):

- **Content Manager layout config** — the "Configure the view" field widths/columns/grouping per content type and single type, cached in the `strapi_core_store_settings` DB table, not in code.
- **Admin menu/auth logos** (Settings → Overview → Customization) — including copying the actual logo files between the dev/UAT S3 buckets and rewriting their URLs, since dev and UAT use separate buckets.

There's no local ↔ UAT direction — only `sync-local-to-dev`/`sync-dev-to-local` bridge local SQLite, and only with dev (UAT is only reachable from local by going through dev first).

All of these run a real export/import against Postgres and S3, so they can take a while for larger datasets and will overwrite the target's content — check with whoever else might be using that environment before running one.

## Deploying to UAT

1. Push (or merge) your updates to the `uat-deploy` branch:

   ```bash
   git push origin <your-branch>:uat-deploy
   ```

   This triggers the [`UAT Deploy`](.github/workflows/uat-deploy.yml) GitHub Actions pipeline, which builds and pushes the backend/frontend Docker images to ECR, deploys them to the UAT EC2 instance, and invalidates the CloudFront caches. No manual steps are needed on the server.

2. Sync the database (content + files, plus layout config and admin logos) from dev to UAT:

   ```bash
   npm run sync-dev-to-uat
   ```

   See [Syncing data between environments](#syncing-data-between-environments) above for what this does and doesn't cover. It does not touch schema — schema is shared code and ships automatically with step 1.
