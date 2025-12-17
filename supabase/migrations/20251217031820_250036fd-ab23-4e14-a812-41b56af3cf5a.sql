-- Add UPDATE policy for content_generations table
CREATE POLICY "Authenticated users can update their own generations"
ON public.content_generations
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);