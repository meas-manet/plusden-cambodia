-- Harden RLS policies on public.profiles to prevent policy bypass

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies so we can recreate them as PERMISSIVE with explicit role scopes
DROP POLICY IF EXISTS "Deny anonymous access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles created only via signup trigger" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Only admins can delete profiles" ON public.profiles;

-- Allow authenticated users to view only their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow authenticated users to update only their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Prevent direct inserts into profiles (only signup trigger should insert)
CREATE POLICY "Profiles created only via signup trigger"
ON public.profiles
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Allow only admins to delete profiles
CREATE POLICY "Only admins can delete profiles"
ON public.profiles
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
