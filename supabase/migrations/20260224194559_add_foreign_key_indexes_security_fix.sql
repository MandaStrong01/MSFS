/*
  # Add Foreign Key Indexes - Security and Performance Fix

  1. Changes
    - Add index on `admin_featured_movies.admin_id` to cover the foreign key constraint
    - Add index on `admin_featured_movies.movie_id` to cover the foreign key constraint
    - Add index on `movies.user_id` to cover the foreign key constraint
  
  2. Notes
    - Foreign keys without indexes can cause performance issues during:
      - JOIN operations
      - CASCADE operations (UPDATE/DELETE)
      - Referential integrity checks
    - These indexes will significantly improve query performance for related operations
    - Uses IF NOT EXISTS to ensure idempotent migration
*/

-- Add index for admin_featured_movies.admin_id foreign key
CREATE INDEX IF NOT EXISTS idx_admin_featured_movies_admin_id 
ON admin_featured_movies(admin_id);

-- Add index for admin_featured_movies.movie_id foreign key
CREATE INDEX IF NOT EXISTS idx_admin_featured_movies_movie_id 
ON admin_featured_movies(movie_id);

-- Add index for movies.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_movies_user_id 
ON movies(user_id);