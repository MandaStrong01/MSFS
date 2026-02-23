/*
  # Optimize Projects RLS and Remove Unused Indexes

  ## Purpose
  Fix remaining security and performance issues identified in diagnostics.

  ## Changes Made

  ### 1. Optimize Projects Table RLS Policies
  Replace `auth.uid()` with `(select auth.uid())` in all projects table policies to prevent re-evaluation for each row:
  - `Users can view own projects` - Optimized auth check
  - `Users can create own projects` - Optimized auth check
  - `Users can update own projects` - Optimized auth check
  - `Users can delete own projects` - Optimized auth check

  ### 2. Remove Unused Indexes
  Drop indexes that are not being used according to diagnostics:
  - `idx_admin_featured_admin_id` on admin_featured_movies
  - `idx_admin_featured_movie_id` on admin_featured_movies
  - `idx_projects_updated_at` on projects
  - `idx_admin_featured_is_active` on admin_featured_movies
  - `idx_movies_user_id` on movies
  - `idx_movies_is_public` on movies
  - `idx_admin_featured_display_order` on admin_featured_movies

  ## Notes
  - All security policies remain intact and secure
  - Performance optimizations will improve query speed at scale
  - Unused indexes are removed to reduce storage and maintenance overhead

  ## Manual Configuration Required (via Supabase Dashboard)
  1. Auth DB Connection Strategy: Change to percentage-based allocation
  2. Leaked Password Protection: Enable in Auth settings
*/

-- ============================================================================
-- 1. OPTIMIZE PROJECTS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Users can create own projects" ON projects;
DROP POLICY IF EXISTS "Users can update own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON projects;

-- Recreate with optimized auth.uid() calls
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- 2. REMOVE UNUSED INDEXES
-- ============================================================================

-- Drop unused indexes from admin_featured_movies table
DROP INDEX IF EXISTS idx_admin_featured_admin_id;
DROP INDEX IF EXISTS idx_admin_featured_movie_id;
DROP INDEX IF EXISTS idx_admin_featured_is_active;
DROP INDEX IF EXISTS idx_admin_featured_display_order;

-- Drop unused indexes from projects table
DROP INDEX IF EXISTS idx_projects_updated_at;

-- Drop unused indexes from movies table
DROP INDEX IF EXISTS idx_movies_user_id;
DROP INDEX IF EXISTS idx_movies_is_public;