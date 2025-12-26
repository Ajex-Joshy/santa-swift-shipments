export const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11';

export const SLEIGH_MAX_SPEED_KMH = 9000; // 9,000 km/h cruising speed
export const SLEIGH_CAPACITY_KG = 500000; // 500 tons
export const TOTAL_GIFTS = 2_100_000_000; // 2.1 billion gifts

export const REINDEER_NAMES = [
  'Dasher',
  'Dancer', 
  'Prancer',
  'Vixen',
  'Comet',
  'Cupid',
  'Donner',
  'Blitzen',
  'Rudolph'
];

export const WEATHER_ICONS: Record<string, string> = {
  clear: '☀️',
  snow: '🌨️',
  blizzard: '❄️',
  fog: '🌫️',
  wind: '💨',
  storm: '⛈️'
};

export const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  delayed: 'Delayed',
  skipped: 'Skipped',
  preparing: 'Preparing',
  in_flight: 'In Flight',
  paused: 'Paused',
  emergency: 'Emergency'
};

export const SEVERITY_COLORS: Record<string, string> = {
  low: 'status-pending',
  medium: 'status-warning',
  high: 'status-delayed',
  critical: 'status-critical'
};

// Major world cities with approximate data
export const SEED_CITIES = [
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, pop: 37400000, tz: 'Asia/Tokyo', offset: 9 },
  { name: 'Delhi', country: 'India', lat: 28.6139, lng: 77.2090, pop: 32900000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737, pop: 29200000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, pop: 22400000, tz: 'America/Sao_Paulo', offset: -3 },
  { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, pop: 21800000, tz: 'America/Mexico_City', offset: -6 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, pop: 21300000, tz: 'Africa/Cairo', offset: 2 },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, pop: 21300000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, pop: 20900000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, pop: 20300000, tz: 'Asia/Dhaka', offset: 6 },
  { name: 'Osaka', country: 'Japan', lat: 34.6937, lng: 135.5023, pop: 19200000, tz: 'Asia/Tokyo', offset: 9 },
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, pop: 18800000, tz: 'America/New_York', offset: -5 },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, pop: 16100000, tz: 'Asia/Karachi', offset: 5 },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lng: -58.3816, pop: 15400000, tz: 'America/Argentina/Buenos_Aires', offset: -3 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, pop: 15200000, tz: 'Europe/Istanbul', offset: 3 },
  { name: 'Kolkata', country: 'India', lat: 22.5726, lng: 88.3639, pop: 14900000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, pop: 14400000, tz: 'Asia/Manila', offset: 8 },
  { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, pop: 14400000, tz: 'Africa/Lagos', offset: 1 },
  { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lng: -43.1729, pop: 13600000, tz: 'America/Sao_Paulo', offset: -3 },
  { name: 'Tianjin', country: 'China', lat: 39.0842, lng: 117.2010, pop: 13200000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Kinshasa', country: 'DR Congo', lat: -4.4419, lng: 15.2663, pop: 13200000, tz: 'Africa/Kinshasa', offset: 1 },
  { name: 'Guangzhou', country: 'China', lat: 23.1291, lng: 113.2644, pop: 13100000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, pop: 12500000, tz: 'America/Los_Angeles', offset: -8 },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6173, pop: 12500000, tz: 'Europe/Moscow', offset: 3 },
  { name: 'Shenzhen', country: 'China', lat: 22.5431, lng: 114.0579, pop: 12400000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587, pop: 12200000, tz: 'Asia/Karachi', offset: 5 },
  { name: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946, pop: 12000000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, pop: 11000000, tz: 'Europe/Paris', offset: 1 },
  { name: 'Bogota', country: 'Colombia', lat: 4.7110, lng: -74.0721, pop: 10900000, tz: 'America/Bogota', offset: -5 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, pop: 10800000, tz: 'Asia/Jakarta', offset: 7 },
  { name: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, pop: 10700000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'Lima', country: 'Peru', lat: -12.0464, lng: -77.0428, pop: 10500000, tz: 'America/Lima', offset: -5 },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, pop: 10400000, tz: 'Asia/Bangkok', offset: 7 },
  { name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, pop: 9900000, tz: 'Asia/Seoul', offset: 9 },
  { name: 'Nagoya', country: 'Japan', lat: 35.1815, lng: 136.9066, pop: 9400000, tz: 'Asia/Tokyo', offset: 9 },
  { name: 'Hyderabad', country: 'India', lat: 17.3850, lng: 78.4867, pop: 9300000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, pop: 9000000, tz: 'Europe/London', offset: 0 },
  { name: 'Tehran', country: 'Iran', lat: 35.6892, lng: 51.3890, pop: 8900000, tz: 'Asia/Tehran', offset: 3.5 },
  { name: 'Chicago', country: 'USA', lat: 41.8781, lng: -87.6298, pop: 8900000, tz: 'America/Chicago', offset: -6 },
  { name: 'Chengdu', country: 'China', lat: 30.5728, lng: 104.0668, pop: 8800000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Nanjing', country: 'China', lat: 32.0603, lng: 118.7969, pop: 8500000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Wuhan', country: 'China', lat: 30.5928, lng: 114.3055, pop: 8400000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.8231, lng: 106.6297, pop: 8300000, tz: 'Asia/Ho_Chi_Minh', offset: 7 },
  { name: 'Luanda', country: 'Angola', lat: -8.8390, lng: 13.2894, pop: 8200000, tz: 'Africa/Luanda', offset: 1 },
  { name: 'Ahmedabad', country: 'India', lat: 23.0225, lng: 72.5714, pop: 8000000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, pop: 7800000, tz: 'Asia/Kuala_Lumpur', offset: 8 },
  { name: 'Hong Kong', country: 'China', lat: 22.3193, lng: 114.1694, pop: 7500000, tz: 'Asia/Hong_Kong', offset: 8 },
  { name: 'Hangzhou', country: 'China', lat: 30.2741, lng: 120.1551, pop: 7400000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, pop: 7300000, tz: 'Asia/Riyadh', offset: 3 },
  { name: 'Surat', country: 'India', lat: 21.1702, lng: 72.8311, pop: 7200000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'Foshan', country: 'China', lat: 23.0218, lng: 113.1219, pop: 7100000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Santiago', country: 'Chile', lat: -33.4489, lng: -70.6693, pop: 6900000, tz: 'America/Santiago', offset: -4 },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038, pop: 6600000, tz: 'Europe/Madrid', offset: 1 },
  { name: 'Pune', country: 'India', lat: 18.5204, lng: 73.8567, pop: 6400000, tz: 'Asia/Kolkata', offset: 5.5 },
  { name: 'Haerbin', country: 'China', lat: 45.8038, lng: 126.5350, pop: 6300000, tz: 'Asia/Shanghai', offset: 8 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, pop: 6200000, tz: 'America/Toronto', offset: -5 },
  { name: 'Belo Horizonte', country: 'Brazil', lat: -19.9167, lng: -43.9345, pop: 6100000, tz: 'America/Sao_Paulo', offset: -3 },
  { name: 'Dallas', country: 'USA', lat: 32.7767, lng: -96.7970, pop: 6000000, tz: 'America/Chicago', offset: -6 },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, pop: 5900000, tz: 'Asia/Singapore', offset: 8 },
  { name: 'Miami', country: 'USA', lat: 25.7617, lng: -80.1918, pop: 5800000, tz: 'America/New_York', offset: -5 },
  { name: 'Philadelphia', country: 'USA', lat: 39.9526, lng: -75.1652, pop: 5700000, tz: 'America/New_York', offset: -5 },
];
