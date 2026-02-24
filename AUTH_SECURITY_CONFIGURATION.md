# Auth Security Configuration

This document outlines the required Auth configuration changes for MandaStrong Studios. These settings must be configured through the Supabase Dashboard.

## Required Configuration Changes

### 1. Auth DB Connection Strategy - Switch to Percentage-Based

**Issue:** Your project's Auth server is configured to use at most 10 connections. This fixed number doesn't scale with instance size increases.

**Solution:** Switch to percentage-based connection allocation.

**How to Fix:**
1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **Database**
3. Find the **Connection Pooling** section
4. Look for **Auth Connection Pool Settings**
5. Change the connection strategy from **Fixed (10 connections)** to **Percentage-based**
6. Set an appropriate percentage (recommended: 10-15% for Auth)
7. Save changes

**Benefits:**
- Automatically scales with database instance size
- Better resource utilization
- Improved Auth server performance during high traffic

---

### 2. Enable Leaked Password Protection

**Issue:** Password compromise detection via HaveIBeenPwned.org is currently disabled.

**Solution:** Enable leaked password protection to prevent users from using compromised passwords.

**How to Fix:**
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Policies**
3. Find the **Password Protection** section
4. Enable **"Prevent use of leaked passwords"**
5. This will check new passwords against the HaveIBeenPwned database
6. Save changes

**Benefits:**
- Prevents users from using known compromised passwords
- Enhances overall account security
- No performance impact (checks are done asynchronously)
- Privacy-preserving (uses k-anonymity)

---

## Database Performance Improvements (Completed)

The following database performance issues have been resolved via migration:

### ✅ Foreign Key Indexes Added

Three critical indexes have been added to improve query performance:

1. **idx_admin_featured_movies_admin_id** - Index on `admin_featured_movies.admin_id`
2. **idx_admin_featured_movies_movie_id** - Index on `admin_featured_movies.movie_id`
3. **idx_movies_user_id** - Index on `movies.user_id`

These indexes prevent slow queries and potential table locks when joining related tables.

---

## Verification

After making the Auth configuration changes:

1. Check the Auth connection pool is using percentage-based allocation
2. Verify leaked password protection is enabled
3. Test user registration with a known compromised password (it should be rejected)

---

## Additional Security Recommendations

### Row Level Security (RLS)
- ✅ All tables have RLS enabled
- ✅ Policies are restrictive by default
- ✅ Authentication checks are in place

### Storage Security
- Ensure storage bucket policies are properly configured
- Use signed URLs for private media content
- Set appropriate file size limits

### API Security
- Use appropriate RLS policies for all data access
- Implement rate limiting if not already in place
- Monitor for unusual access patterns

---

*Last Updated: 2026-02-24*
