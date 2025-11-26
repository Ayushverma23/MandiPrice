-- 1. Create the function that inserts the profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, district, phone_number)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'role',
    new.raw_user_meta_data ->> 'district',
    new.raw_user_meta_data ->> 'phone_number'
  );
  return new;
end;
$$;

-- 2. Create the trigger on auth.users
-- This ensures the function runs every time a new user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
