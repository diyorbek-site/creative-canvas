-- Make avatars bucket private
UPDATE storage.buckets SET public = false WHERE id = 'avatars';

-- Add DELETE policy for profiles table
CREATE POLICY "Authenticated users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Update storage policies to require authentication (drop old public policy)
DROP POLICY IF EXISTS "Avatars are publicly accessible" ON storage.objects;

-- Create policy for authenticated users to view their own avatars
CREATE POLICY "Users can view their own avatar"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);