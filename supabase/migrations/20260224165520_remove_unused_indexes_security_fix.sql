/*
  # Remove Unused Indexes - Security and Performance Fix

  1. Changes
    - Drop unused index `idx_admin_featured_movies_admin_id` on `admin_featured_movies` table
    - Drop unused index `idx_admin_featured_movies_movie_id` on `admin_featured_movies` table
    - Drop unused index `idx_movies_user_id` on `movies` table
  
  2. Notes
    - These indexes are not being used by any queries and consume unnecessary storage
    - Removing them improves write performance and reduces storage costs
    - The foreign key constraints themselves still exist and enforce referential integrity
    - Query performance will not be affected as these indexes were not being utilized
*/

-- Drop unused index on admin_featured_movies.admin_id
DROP INDEX IF EXISTS idx_admin_featured_movies_admin_id;

-- Drop unused index on admin_featured_movies.movie_id
DROP INDEX IF EXISTS idx_admin_featured_movies_movie_id;

-- Drop unused index on movies.user_id
DROP INDEX IF EXISTS idx_movies_user_id;