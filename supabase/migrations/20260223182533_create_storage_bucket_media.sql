-- Create Storage Bucket for Media Files
-- 1. Storage Setup: Creates public 'media' bucket for video, audio, and image files
-- 2. Security: Authenticated users can upload to their own folder, everyone can view

-- Create the media storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  524288000,
  ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload media to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own media" ON storage.objects;
DROP POLICY IF EXISTS "Public can view all media" ON storage.objects;

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload media to own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to update their own files
CREATE POLICY "Users can update own media"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own files
CREATE POLICY "Users can delete own media"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access to all media files
CREATE POLICY "Public can view all media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');