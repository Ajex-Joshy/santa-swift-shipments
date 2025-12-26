import { useEffect, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import GlobalMap from '@/components/map/GlobalMap';
import MissionHeader from '@/components/dashboard/MissionHeader';
import DeliveryQueue from '@/components/dashboard/DeliveryQueue';
import WeatherPanel from '@/components/dashboard/WeatherPanel';
import EmergencyPanel from '@/components/dashboard/EmergencyPanel';
import ReindeerStatus from '@/components/dashboard/ReindeerStatus';
import StatCard from '@/components/dashboard/StatCard';
import { useMissionData } from '@/hooks/useMissionData';
import { useMapboxToken } from '@/hooks/useMapboxToken';
import { supabase } from '@/integrations/supabase/client';
import { SEED_CITIES, TOTAL_GIFTS } from '@/lib/constants';

const Index = () => {
  const { token: mapboxToken, loading: tokenLoading } = useMapboxToken();
  const {
    cities,
    citiesMap,
    deliveries,
    deliveryStatusMap,
    missionStats,
    telemetry,
    weather,
    emergencies,
    loading,
    resolveEmergency
  } = useMissionData();

  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);

  // Seed initial data if empty - only run once
  useEffect(() => {
    let isMounted = true;
    
    async function seedData() {
      if (cities.length > 0 || seeding || seeded) return;
      
      setSeeding(true);
      setSeeded(true); // Prevent re-runs immediately
      console.log('Seeding initial city data...');

      try {
        // Insert cities
        const cityData = SEED_CITIES.map((city, index) => ({
          name: city.name,
          country: city.country,
          latitude: city.lat,
          longitude: city.lng,
          population: city.pop,
          timezone: city.tz,
          timezone_offset: city.offset,
          priority_score: Math.max(10, 100 - index),
          gift_count: Math.floor(city.pop * 0.3)
        }));

        const { data: insertedCities, error: citiesError } = await supabase
          .from('cities')
          .insert(cityData)
          .select();

        if (citiesError) {
          console.error('Error inserting cities:', citiesError);
          if (isMounted) setSeeding(false);
          return;
        }

        console.log(`Inserted ${insertedCities?.length} cities`);

        // Create deliveries for each city
        if (insertedCities && insertedCities.length > 0) {
          const deliveryData = insertedCities.map((city, index) => ({
            city_id: city.id,
            status: index < 3 ? 'completed' : index < 5 ? 'in_progress' : 'pending',
            gifts_delivered: index < 3 ? city.gift_count : 0
          }));

          await supabase.from('deliveries').insert(deliveryData);
        }

        // Create mission stats
        const totalGifts = cityData.reduce((sum, c) => sum + c.gift_count, 0);
        await supabase.from('mission_stats').insert({
          total_gifts: totalGifts,
          gifts_delivered: Math.floor(totalGifts * 0.05),
          cities_visited: 3,
          total_cities: cityData.length,
          distance_traveled_km: 12500,
          current_status: 'in_flight',
          mission_start: new Date().toISOString()
        });

        // Insert initial telemetry
        await supabase.from('sleigh_telemetry').insert({
          latitude: 35.6762,
          longitude: 139.6503,
          altitude_meters: 10500,
          speed_kmh: 7500,
          heading_degrees: 270,
          reindeer_fatigue_percent: 15,
          cargo_weight_kg: 450000
        });

        // Add some weather conditions
        await supabase.from('weather_conditions').insert([
          { region: 'North Atlantic', condition: 'wind', severity: 2, wind_speed_kmh: 85, visibility_km: 15, speed_reduction_percent: 10 },
          { region: 'Siberia', condition: 'blizzard', severity: 4, wind_speed_kmh: 120, visibility_km: 2, speed_reduction_percent: 40 }
        ]);

        console.log('Seeding complete!');
        
        // Refresh data after short delay
        setTimeout(() => window.location.reload(), 500);
      } catch (err) {
        console.error('Seeding error:', err);
        if (isMounted) setSeeding(false);
      }
    }

    if (!loading && cities.length === 0 && !seeded) {
      seedData();
    }
    
    return () => { isMounted = false; };
  }, [cities.length, loading, seeded]);

  // Get current and next city names
  const currentCityName = telemetry?.current_city_id 
    ? citiesMap.get(telemetry.current_city_id)?.name 
    : cities[3]?.name;
  const nextCityName = telemetry?.next_city_id 
    ? citiesMap.get(telemetry.next_city_id)?.name 
    : cities[4]?.name;

  // Build flight path from completed deliveries
  const flightPath: [number, number][] = deliveries
    .filter(d => d.status === 'completed' || d.status === 'in_progress')
    .map(d => {
      const city = citiesMap.get(d.city_id);
      return city ? [city.latitude, city.longitude] as [number, number] : null;
    })
    .filter((p): p is [number, number] => p !== null);

  if (loading || tokenLoading || seeding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            {seeding ? 'Setting up mission data...' : 'Loading Santa Command...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-[1800px] mx-auto">
        <MissionHeader
          stats={missionStats}
          telemetry={telemetry}
          currentCityName={currentCityName}
          nextCityName={nextCityName}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Map */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="glass-panel rounded-xl p-1 h-[500px] lg:h-[600px]">
              <GlobalMap
                cities={cities}
                deliveryStatuses={deliveryStatusMap}
                sleighPosition={telemetry}
                flightPath={flightPath}
                mapboxToken={mapboxToken || ''}
              />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <StatCard
                title="Total Distance"
                value={`${((missionStats?.distance_traveled_km || 0) / 1000).toFixed(1)}K km`}
                subtitle="traveled tonight"
                variant="info"
              />
              <StatCard
                title="Avg Speed"
                value={`${(telemetry?.speed_kmh || 0).toLocaleString()} km/h`}
                subtitle="current velocity"
              />
              <StatCard
                title="Cargo Load"
                value={`${((telemetry?.cargo_weight_kg || 0) / 1000).toFixed(0)}t`}
                subtitle="remaining payload"
              />
              <StatCard
                title="ETA Complete"
                value="4h 23m"
                subtitle="estimated finish"
                variant="success"
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">
            <DeliveryQueue
              deliveries={deliveries}
              cities={citiesMap}
            />
            
            <ReindeerStatus
              fatiguePercent={telemetry?.reindeer_fatigue_percent || 0}
            />

            <WeatherPanel
              conditions={weather}
              cities={citiesMap}
            />

            <EmergencyPanel
              emergencies={emergencies}
              onResolve={resolveEmergency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
