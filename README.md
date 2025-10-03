# Alumni Management System - Backend

## Table of Contents
- **Database Connections**
  - [PostgreSQL](#postgresql)
  - [Supabase](#supabase)
- **API Documentation**

## Database Connections

### PostgreSQL
Connection configured via environment variables in `.env` file.

Required environment variables:
- `PGHOST` - Database host
- `PGPORT` - Database port
- `PGDATABASE` - Database name
- `PGUSER` - Database user
- `PGPASSWORD` - Database password
- `POOLMODE` - Connection pool mode (optional)

### Supabase
Authentication and real-time features via Supabase client.

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Project anon or service role key (use service role for admin operations)

## Testing Connections
To verify database connections:

```bash
# Install dependencies
npm install

# Run connection tests
node test-connection.js
```

The test will check both PostgreSQL and Supabase connections and provide a summary of the results.

## API Documentation


