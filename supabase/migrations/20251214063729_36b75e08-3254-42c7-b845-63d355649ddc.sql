-- Add explicit policies to deny anonymous access to profiles table
CREATE POLICY "Deny anonymous access to profiles" ON public.profiles
  FOR ALL
  TO anon
  USING (false);

-- Add explicit policy to deny anonymous access to user_roles table
CREATE POLICY "Deny anonymous access to user_roles" ON public.user_roles
  FOR ALL
  TO anon
  USING (false);