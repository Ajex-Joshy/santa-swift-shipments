export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  timezone_offset: number;
  priority_score: number;
  gift_count: number;
  created_at: string;
}

export interface Delivery {
  id: string;
  city_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed' | 'skipped';
  scheduled_at: string | null;
  completed_at: string | null;
  delay_reason: string | null;
  gifts_delivered: number;
  created_at: string;
  updated_at: string;
  city?: City;
}

export interface Route {
  id: string;
  name: string;
  is_active: boolean;
  total_distance_km: number;
  estimated_duration_minutes: number;
  city_sequence: string[];
  created_at: string;
  updated_at: string;
}

export interface SleighTelemetry {
  id: string;
  latitude: number;
  longitude: number;
  altitude_meters: number;
  speed_kmh: number;
  heading_degrees: number;
  current_city_id: string | null;
  next_city_id: string | null;
  reindeer_fatigue_percent: number;
  cargo_weight_kg: number;
  recorded_at: string;
}

export interface WeatherCondition {
  id: string;
  city_id: string | null;
  region: string | null;
  condition: 'clear' | 'snow' | 'blizzard' | 'fog' | 'wind' | 'storm';
  severity: number;
  wind_speed_kmh: number;
  visibility_km: number;
  speed_reduction_percent: number;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface Emergency {
  id: string;
  type: 'reindeer_fatigue' | 'weather_critical' | 'mechanical' | 'route_blocked' | 'time_critical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  is_resolved: boolean;
  resolved_at: string | null;
  created_at: string;
}

export interface MissionStats {
  id: string;
  mission_start: string | null;
  mission_end: string | null;
  total_gifts: number;
  gifts_delivered: number;
  cities_visited: number;
  total_cities: number;
  distance_traveled_km: number;
  current_status: 'preparing' | 'in_flight' | 'completed' | 'paused' | 'emergency';
  updated_at: string;
}

export type DeliveryStatus = Delivery['status'];
export type MissionStatus = MissionStats['current_status'];
export type WeatherType = WeatherCondition['condition'];
export type EmergencyType = Emergency['type'];
export type EmergencySeverity = Emergency['severity'];
