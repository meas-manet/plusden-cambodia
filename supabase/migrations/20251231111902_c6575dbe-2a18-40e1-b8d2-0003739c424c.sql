-- Remove hardcoded admin email backdoor from handle_new_user trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create profile for new user
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  
  -- Admin role must be assigned manually via the secured seed-admin Edge Function
  -- No automatic admin assignment based on email
  RETURN NEW;
END;
$$;