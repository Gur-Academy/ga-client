# Gur Academy Client

## Table of Contents
- [Overview](#overview)
- [Setup](#setup)
- [Files](#files)
  - [`config/db.js`](#configdbjs)
  - [`config/supabase.js`](#configsupabasejs)
  - [`test-connection.js`](#test-connectionjs)
- [Run the Connection Test](#run-the-connection-test)
- [Troubleshooting](#troubleshooting)

## Overview
- **PostgreSQL** connectivity is managed via a `pg` connection pool exported from `config/db.js`.
- **Supabase** connectivity is provided via an `@supabase/supabase-js` client exported from `config/supabase.js`.
- **`test-connection.js`** checks both connections and exits with status code `0` on success or `1` on failure.

## Setup
1. **Install dependencies** (if not already installed):
   ```bash
   npm install pg @supabase/supabase-js dotenv
   ```
2. **Environment variables** (loaded via `dotenv`):
   - PostgreSQL
     - `PGHOST`
     - `PGPORT`
     - `PGDATABASE`
     - `PGUSER`
     - `PGPASSWORD`
     - `POOLMODE` (optional)
   - Supabase
     - `SUPABASE_URL`
     - `SUPABASE_KEY`

Create a `.env` file in the project root with the above variables, for example:
```env
PGHOST=your-host
PGPORT=5432
PGDATABASE=your-db
PGUSER=your-user
PGPASSWORD=your-password
POOLMODE=transaction

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-or-service-role-key
```

## Files

### `config/db.js`
- Path: `config/db.js`
- Purpose: Creates and exports a PostgreSQL connection pool using `pg`.
- Key points:
  - Loads environment using `dotenv`.
  - Uses `ssl: { rejectUnauthorized: false }` for environments requiring SSL.
  - Exports the pool directly via `module.exports`.
- Import example:
  ```js
  const pool = require('./config/db');
  ```

### `config/supabase.js`
- Path: `config/supabase.js`
- Purpose: Creates and exports a Supabase client using `@supabase/supabase-js` and env vars.
- Key points:
  - Loads environment using `dotenv`.
  - Exports the client directly via `module.exports` (not a named export).
- Import example:
  ```js
  const supabase = require('./config/supabase');
  ```

### `test-connection.js`
- Path: `test-connection.js`
- Purpose: Verifies connectivity to both PostgreSQL and Supabase.
- What it does:
  - Connects to PostgreSQL, runs `SELECT version()` and logs the server version.
  - Queries the Supabase table `admins` with a `select('*').limit(1)` to verify access.
  - Prints a summary and exits with `0` on success, `1` on failure.
- Usage in code:
  ```js
  const pool = require('./config/db');
  const supabase = require('./config/supabase');
  ```

## Run the Connection Test
Execute the script from the project root:
```bash
node test-connection.js
```

Expected output includes connection status for PostgreSQL and Supabase, plus a final summary with a success/failure status.

## Troubleshooting
- **Connection refused / timeout**: Verify host, port, networking, and that the database allows your IP.
- **SSL errors**: Ensure SSL settings match your DB requirements. Current config uses `rejectUnauthorized: false`.
- **Supabase permissions**: If the `admins` table does not exist or RLS blocks access, change the table in `test-connection.js` to one that exists and is accessible (or adjust RLS policies).
- **Invalid keys/URL**: Double-check `SUPABASE_URL` and `SUPABASE_KEY` values.
