/*
  # Add Foreign Key Indexes for Performance

  1. Performance Improvements
    - Add index on `admin_featured_movies.admin_id` for foreign key constraint
    - Add index on `admin_featured_movies.movie_id` for foreign key constraint
    - Add index on `movies.user_id` for foreign key constraint
  
  2. Important Notes
    - These indexes improve query performance when joining tables
    - Foreign keys without indexes can cause slow queries and table locks
    - Using IF NOT EXISTS ensures safe re-runs of migration
*/

-- Index for admin_featured_movies.admin_id foreign key
CREATE INDEX IF NOT EXISTS idx_admin_featured_movies_admin_id 
ON admin_featured_movies(admin_id);

-- Index for admin_featured_movies.movie_id foreign key
CREATE INDEX IF NOT EXISTS idx_admin_featured_movies_movie_id 
ON admin_featured_movies(movie_id);

-- Index for movies.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_movies_user_id 
ON movies(user_id);
