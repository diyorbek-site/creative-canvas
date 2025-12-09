-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own generations" ON public.content_generations;
DROP POLICY IF EXISTS "Users can insert their own generations" ON public.content_generations;
DROP POLICY IF EXISTS "Users can delete their own generations" ON public.content_generations;

-- Recreate policies restricted to authenticated users only
CREATE POLICY "Authenticated users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view their own generations"
ON public.content_generations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their own generations"
ON public.content_generations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own generations"
ON public.content_generations FOR DELETE
TO authenticated
USING (auth.uid() = user_id);