-- Create a trigger to automatically assign admin role to specific email
CREATE OR REPLACE FUNCTION public.assign_admin_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- If the user email is the admin email, give them admin role
  IF new.email = 'elektroniksuparaku@gmail.com' THEN
    -- Remove the default student role
    DELETE FROM public.user_roles WHERE user_id = new.id AND role = 'student';
    -- Insert admin role
    INSERT INTO public.user_roles (user_id, role) VALUES (new.id, 'admin');
  END IF;
  
  RETURN new;
END;
$$;

-- Create trigger for admin assignment (runs after the handle_new_user trigger)
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.assign_admin_on_signup();