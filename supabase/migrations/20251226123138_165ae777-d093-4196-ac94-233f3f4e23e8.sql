-- Fix timezone_offset column to support decimal offsets (e.g., 5.5 for India)
ALTER TABLE public.cities 
ALTER COLUMN timezone_offset TYPE DOUBLE PRECISION;