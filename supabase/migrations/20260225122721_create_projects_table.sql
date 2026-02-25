/*
  # Create Projects Table

  ## Overview
  Creates a comprehensive projects table for users to manage their video editing projects with full history tracking.

  ## New Tables
  
  ### `projects`
  - `id` (uuid, primary key) - Unique project identifier
  - `user_id` (uuid, foreign key) - References auth.users, owner of the project
  - `name` (text) - Project name, defaults to 'Untitled Project'
  - `description` (text) - Optional project description
  - `thumbnail_url` (text) - Optional project thumbnail/preview image
  - `status` (text) - Project status: 'draft', 'in_progress', 'completed', 'archived'
  - `movie_ids` (uuid[]) - Array of movie IDs associated with this project
  - `metadata` (jsonb) - Flexible metadata storage for project settings, timeline data, etc.
  - `last_opened_at` (timestamptz) - Track when project was last accessed
  - `created_at` (timestamptz) - Project creation timestamp
  - `updated_at` (timestamptz) - Last modification timestamp

  ## Security
  - Enable RLS on projects table
  - Users can only view their own projects
  - Users can only create projects for themselves
  - Users can only update their own projects
  - Users can only delete their own projects

  ## Performance
  - Index on user_id for fast project lookups by user
  - Index on last_opened_at for recent projects sorting
  - Index on status for filtering by project status
  - Index on created_at for chronological sorting
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL DEFAULT 'Untitled Project',
  description text DEFAULT '',
  thumbnail_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')),
  movie_ids uuid[] DEFAULT ARRAY[]::uuid[],
  metadata jsonb DEFAULT '{}'::jsonb,
  last_opened_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_last_opened ON projects(last_opened_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_projects_updated_at();
