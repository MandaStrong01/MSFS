/*
  # Update Duration Range to 180 Minutes

  1. Changes
    - Update default duration from 90 seconds to 180 minutes (10800 seconds)
    - Add check constraint to ensure duration is between 0 and 180 minutes (0-10800 seconds)
  
  2. Notes
    - Duration is stored in seconds
    - 180 minutes = 10,800 seconds
    - Minimum: 0 seconds
    - Maximum: 10,800 seconds (180 minutes)
*/

-- Update the default duration to 180 minutes (10800 seconds)
ALTER TABLE projects 
  ALTER COLUMN duration SET DEFAULT 10800;

-- Add check constraint to enforce duration between 0 and 180 minutes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE table_name = 'projects' AND constraint_name = 'projects_duration_check'
  ) THEN
    ALTER TABLE projects 
      ADD CONSTRAINT projects_duration_check 
      CHECK (duration >= 0 AND duration <= 10800);
  END IF;
END $$;
