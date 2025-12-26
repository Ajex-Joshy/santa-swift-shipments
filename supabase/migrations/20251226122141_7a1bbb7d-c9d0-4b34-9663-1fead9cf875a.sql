-- Cities table with delivery data
CREATE TABLE public.cities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  population BIGINT NOT NULL DEFAULT 0,
  timezone TEXT NOT NULL,
  timezone_offset INTEGER NOT NULL DEFAULT 0,
  priority_score INTEGER NOT NULL DEFAULT 50,
  gift_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Deliveries table for tracking status
CREATE TABLE public.deliveries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'delayed', 'skipped')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  delay_reason TEXT,
  gifts_delivered BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Routes table for optimized paths
CREATE TABLE public.routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Main Route',
  is_active BOOLEAN NOT NULL DEFAULT false,
  total_distance_km DOUBLE PRECISION NOT NULL DEFAULT 0,
  estimated_duration_minutes INTEGER NOT NULL DEFAULT 0,
  city_sequence UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Sleigh telemetry for real-time tracking
CREATE TABLE public.sleigh_telemetry (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  altitude_meters DOUBLE PRECISION NOT NULL DEFAULT 10000,
  speed_kmh DOUBLE PRECISION NOT NULL DEFAULT 0,
  heading_degrees DOUBLE PRECISION NOT NULL DEFAULT 0,
  current_city_id UUID REFERENCES public.cities(id),
  next_city_id UUID REFERENCES public.cities(id),
  reindeer_fatigue_percent INTEGER NOT NULL DEFAULT 0 CHECK (reindeer_fatigue_percent >= 0 AND reindeer_fatigue_percent <= 100),
  cargo_weight_kg DOUBLE PRECISION NOT NULL DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Weather conditions
CREATE TABLE public.weather_conditions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
  region TEXT,
  condition TEXT NOT NULL CHECK (condition IN ('clear', 'snow', 'blizzard', 'fog', 'wind', 'storm')),
  severity INTEGER NOT NULL DEFAULT 1 CHECK (severity >= 1 AND severity <= 5),
  wind_speed_kmh DOUBLE PRECISION NOT NULL DEFAULT 0,
  visibility_km DOUBLE PRECISION NOT NULL DEFAULT 10,
  speed_reduction_percent INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Emergency events
CREATE TABLE public.emergencies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('reindeer_fatigue', 'weather_critical', 'mechanical', 'route_blocked', 'time_critical')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Mission stats (singleton table for global stats)
CREATE TABLE public.mission_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_start TIMESTAMP WITH TIME ZONE,
  mission_end TIMESTAMP WITH TIME ZONE,
  total_gifts BIGINT NOT NULL DEFAULT 0,
  gifts_delivered BIGINT NOT NULL DEFAULT 0,
  cities_visited INTEGER NOT NULL DEFAULT 0,
  total_cities INTEGER NOT NULL DEFAULT 0,
  distance_traveled_km DOUBLE PRECISION NOT NULL DEFAULT 0,
  current_status TEXT NOT NULL DEFAULT 'preparing' CHECK (current_status IN ('preparing', 'in_flight', 'completed', 'paused', 'emergency')),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public read for this demo)
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleigh_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_stats ENABLE ROW LEVEL SECURITY;

-- Public read policies for demo (no auth required)
CREATE POLICY "Public read access for cities" ON public.cities FOR SELECT USING (true);
CREATE POLICY "Public read access for deliveries" ON public.deliveries FOR SELECT USING (true);
CREATE POLICY "Public read access for routes" ON public.routes FOR SELECT USING (true);
CREATE POLICY "Public read access for telemetry" ON public.sleigh_telemetry FOR SELECT USING (true);
CREATE POLICY "Public read access for weather" ON public.weather_conditions FOR SELECT USING (true);
CREATE POLICY "Public read access for emergencies" ON public.emergencies FOR SELECT USING (true);
CREATE POLICY "Public read access for mission_stats" ON public.mission_stats FOR SELECT USING (true);

-- Public write policies for demo operations
CREATE POLICY "Public insert for deliveries" ON public.deliveries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update for deliveries" ON public.deliveries FOR UPDATE USING (true);
CREATE POLICY "Public insert for telemetry" ON public.sleigh_telemetry FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for weather" ON public.weather_conditions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update for weather" ON public.weather_conditions FOR UPDATE USING (true);
CREATE POLICY "Public insert for emergencies" ON public.emergencies FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update for emergencies" ON public.emergencies FOR UPDATE USING (true);
CREATE POLICY "Public update for mission_stats" ON public.mission_stats FOR UPDATE USING (true);
CREATE POLICY "Public insert for mission_stats" ON public.mission_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert for routes" ON public.routes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update for routes" ON public.routes FOR UPDATE USING (true);
CREATE POLICY "Public insert for cities" ON public.cities FOR INSERT WITH CHECK (true);

-- Enable realtime for tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.sleigh_telemetry;
ALTER PUBLICATION supabase_realtime ADD TABLE public.deliveries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.mission_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.emergencies;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_deliveries_updated_at
  BEFORE UPDATE ON public.deliveries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_routes_updated_at
  BEFORE UPDATE ON public.routes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mission_stats_updated_at
  BEFORE UPDATE ON public.mission_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();