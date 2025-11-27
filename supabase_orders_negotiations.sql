-- Create orders table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  buyer_id uuid references auth.users(id) not null,
  seller_id uuid references auth.users(id) not null,
  listing_id uuid references public.listings(id) not null,
  quantity numeric not null,
  price_per_quintal numeric not null,
  total_amount numeric not null,
  status text check (status in ('pending', 'accepted', 'rejected', 'completed', 'cancelled')) default 'pending',
  delivery_method text check (delivery_method in ('farmer_delivery', 'buyer_pickup')) not null
);

-- Create negotiations table
create table if not exists public.negotiations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  order_id uuid references public.orders(id) not null,
  sender_id uuid references auth.users(id) not null,
  offered_price numeric not null,
  message text,
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending'
);

-- Add RLS policies (simplified for now)
alter table public.orders enable row level security;
alter table public.negotiations enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "Users can insert orders"
  on public.orders for insert
  with check (auth.uid() = buyer_id);

create policy "Users can update their own orders"
  on public.orders for update
  using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "Users can view negotiations for their orders"
  on public.negotiations for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = negotiations.order_id
      and (orders.buyer_id = auth.uid() or orders.seller_id = auth.uid())
    )
  );

create policy "Users can insert negotiations for their orders"
  on public.negotiations for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = negotiations.order_id
      and (orders.buyer_id = auth.uid() or orders.seller_id = auth.uid())
    )
  );
