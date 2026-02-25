/*
  # Fix Projects Security and Performance Issues

  ## Overview
  Addresses security and performance issues identified in the projects table and related database objects.

  ## Changes Made
  
  ### 1. RLS Policy Optimization
  - Replace all RLS policies on projects table to use `(select auth.uid())` pattern
  - This prevents re-evaluation of auth functions for each row, significantly improving query performance at scale
  - Affects: SELECT, INSERT, UPDATE, DELETE policies
  
  ### 2. Remove Unused Indexes
  - Drop unused indexes that create maintenance overhead without providing query benefits
  - Indexes removed from: movies, comments, reactions, admin_featured_movies, projects tables
  
  ### 3. Function Security
  - Fix search_path for update_projects_updated_at function to be immutable and secure
  - Set explicit schema qualification and secure search_path

  ## Security Impact
  - RLS policies maintain same security model but with better performance
  - Function search_path made immutable to prevent SQL injection attacks
  - All changes preserve existing access controls
*/

DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Users can create own projects" ON projects;
DROP POLICY IF EXISTS "Users can update own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON projects;

CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can create own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP INDEX IF EXISTS idx_movies_user_id;
DROP INDEX IF EXISTS idx_movies_is_public;
DROP INDEX IF EXISTS idx_comments_movie_id;
DROP INDEX IF EXISTS idx_reactions_movie_id;
DROP INDEX IF EXISTS idx_movies_created_at;
DROP INDEX IF EXISTS idx_movies_view_count;
DROP INDEX IF EXISTS idx_admin_featured_display_order;
DROP INDEX IF EXISTS idx_admin_featured_is_active;
DROP INDEX IF EXISTS idx_admin_featured_movies_admin_id;
DROP INDEX IF EXISTS idx_admin_featured_movies_movie_id;
DROP INDEX IF EXISTS idx_comments_user_id;
DROP INDEX IF EXISTS idx_reactions_user_id;
DROP INDEX IF EXISTS idx_projects_user_id;
DROP INDEX IF EXISTS idx_projects_last_opened;
DROP INDEX IF EXISTS idx_projects_status;
DROP INDEX IF EXISTS idx_projects_created_at;

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
DROP FUNCTION IF EXISTS update_projects_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_projects_updated_at();
