-- Add explicit INSERT policy for profiles (only via trigger)
CREATE POLICY "Profiles created only via signup trigger" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- Add explicit DELETE policy for profiles (admins only)
CREATE POLICY "Only admins can delete profiles" ON public.profiles
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));