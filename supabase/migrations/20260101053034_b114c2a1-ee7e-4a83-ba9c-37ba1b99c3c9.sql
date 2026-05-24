-- Add notes and spec columns to products table
ALTER TABLE public.products ADD COLUMN notes text;
ALTER TABLE public.products ADD COLUMN spec text;