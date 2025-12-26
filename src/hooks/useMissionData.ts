import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { City, Delivery, MissionStats, SleighTelemetry, WeatherCondition, Emergency } from '@/lib/types';

export function useMissionData() {
  const [cities, setCities] = useState<City[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [missionStats, setMissionStats] = useState<MissionStats | null>(null);
  const [telemetry, setTelemetry] = useState<SleighTelemetry | null>(null);
  const [weather, setWeather] = useState<WeatherCondition[]>([]);
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all initial data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [
        citiesRes,
        deliveriesRes,
        statsRes,
        telemetryRes,
        weatherRes,
        emergenciesRes
      ] = await Promise.all([
        supabase.from('cities').select('*').order('priority_score', { ascending: false }),
        supabase.from('deliveries').select('*'),
        supabase.from('mission_stats').select('*').limit(1).maybeSingle(),
        supabase.from('sleigh_telemetry').select('*').order('recorded_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('weather_conditions').select('*').eq('is_active', true),
        supabase.from('emergencies').select('*').eq('is_resolved', false)
      ]);

      if (citiesRes.error) throw citiesRes.error;
      if (deliveriesRes.error) throw deliveriesRes.error;

      setCities(citiesRes.data as City[]);
      setDeliveries(deliveriesRes.data as Delivery[]);
      setMissionStats(statsRes.data as MissionStats | null);
      setTelemetry(telemetryRes.data as SleighTelemetry | null);
      setWeather((weatherRes.data || []) as WeatherCondition[]);
      setEmergencies((emergenciesRes.data || []) as Emergency[]);
      setError(null);
    } catch (err) {
      console.error('Error fetching mission data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    fetchData();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('mission-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'deliveries' },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setDeliveries(prev => 
              prev.map(d => d.id === payload.new.id ? payload.new as Delivery : d)
            );
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'mission_stats' },
        (payload) => {
          if (payload.new) {
            setMissionStats(payload.new as MissionStats);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sleigh_telemetry' },
        (payload) => {
          setTelemetry(payload.new as SleighTelemetry);
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'emergencies' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setEmergencies(prev => [...prev, payload.new as Emergency]);
          } else if (payload.eventType === 'UPDATE') {
            setEmergencies(prev =>
              prev.map(e => e.id === payload.new.id ? payload.new as Emergency : e)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  // Memoized helper maps
  const citiesMap = useMemo(() => {
    return new Map(cities.map(c => [c.id, c]));
  }, [cities]);

  const deliveryStatusMap = useMemo(() => {
    return new Map(deliveries.map(d => [d.city_id, d.status]));
  }, [deliveries]);

  // Resolve emergency
  const resolveEmergency = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('emergencies')
      .update({ is_resolved: true, resolved_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      setEmergencies(prev => prev.filter(e => e.id !== id));
    }
  }, []);

  return {
    cities,
    citiesMap,
    deliveries,
    deliveryStatusMap,
    missionStats,
    telemetry,
    weather,
    emergencies,
    loading,
    error,
    refetch: fetchData,
    resolveEmergency
  };
}
