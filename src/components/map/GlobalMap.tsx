import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_STYLE } from '@/lib/constants';
import type { City, SleighTelemetry } from '@/lib/types';

interface GlobalMapProps {
  cities: City[];
  deliveryStatuses: Map<string, string>;
  sleighPosition: SleighTelemetry | null;
  flightPath: [number, number][];
  onCityClick?: (city: City) => void;
  mapboxToken: string;
}

const GlobalMap = ({
  cities,
  deliveryStatuses,
  sleighPosition,
  flightPath,
  onCityClick,
  mapboxToken
}: GlobalMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const sleighMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      projection: 'globe',
      zoom: 1.8,
      center: [20, 30],
      pitch: 20,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      'top-right'
    );

    map.current.scrollZoom.disable();

    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(10, 15, 30)',
        'high-color': 'rgb(20, 30, 60)',
        'horizon-blend': 0.1,
      });
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Add city markers
  useEffect(() => {
    if (!map.current || !mapLoaded || cities.length === 0) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.city-marker');
    existingMarkers.forEach(el => el.remove());

    cities.forEach(city => {
      const status = deliveryStatuses.get(city.id) || 'pending';
      
      const el = document.createElement('div');
      el.className = 'city-marker';
      el.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 0 8px 2px ${getStatusColor(status)};
        background: ${getStatusColor(status)};
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      if (onCityClick) {
        el.addEventListener('click', () => onCityClick(city));
      }

      new mapboxgl.Marker(el)
        .setLngLat([city.longitude, city.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 15, closeButton: false })
            .setHTML(`
              <div style="padding: 8px; font-family: Inter, sans-serif;">
                <strong style="font-size: 14px;">${city.name}</strong>
                <div style="font-size: 12px; color: #888; margin-top: 4px;">${city.country}</div>
                <div style="font-size: 11px; margin-top: 6px; text-transform: capitalize; color: ${getStatusColor(status)};">
                  ${status.replace('_', ' ')}
                </div>
              </div>
            `)
        )
        .addTo(map.current!);
    });
  }, [cities, deliveryStatuses, mapLoaded, onCityClick]);

  // Update sleigh position
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (sleighPosition) {
      if (!sleighMarker.current) {
        const el = document.createElement('div');
        el.innerHTML = `
          <div style="
            font-size: 28px;
            filter: drop-shadow(0 0 10px rgba(255, 200, 100, 0.8));
            animation: bounce 1s ease-in-out infinite;
          ">🛷</div>
        `;
        el.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: center;
        `;

        sleighMarker.current = new mapboxgl.Marker(el)
          .setLngLat([sleighPosition.longitude, sleighPosition.latitude])
          .addTo(map.current);
      } else {
        sleighMarker.current.setLngLat([sleighPosition.longitude, sleighPosition.latitude]);
      }

      // Smooth pan to sleigh
      map.current.easeTo({
        center: [sleighPosition.longitude, sleighPosition.latitude],
        zoom: 3,
        duration: 1000
      });
    }
  }, [sleighPosition, mapLoaded]);

  // Draw flight path
  useEffect(() => {
    if (!map.current || !mapLoaded || flightPath.length < 2) return;

    const sourceId = 'flight-path';
    const layerId = 'flight-path-line';

    if (map.current.getSource(sourceId)) {
      (map.current.getSource(sourceId) as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: flightPath.map(([lat, lng]) => [lng, lat])
        }
      });
    } else {
      map.current.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: flightPath.map(([lat, lng]) => [lng, lat])
          }
        }
      });

      map.current.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#4ade80',
          'line-width': 2,
          'line-opacity': 0.7,
          'line-dasharray': [2, 2]
        }
      });
    }
  }, [flightPath, mapLoaded]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-transparent" />
      
      {!mapboxToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/90">
          <div className="text-center p-6">
            <p className="text-muted-foreground">Mapbox token required</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .mapboxgl-popup-content {
          background: hsl(222 47% 8% / 0.95);
          border: 1px solid hsl(217 33% 18%);
          border-radius: 8px;
          color: hsl(210 40% 96%);
          padding: 0;
        }
        .mapboxgl-popup-tip {
          border-top-color: hsl(222 47% 8% / 0.95);
        }
      `}</style>
    </div>
  );
};

function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return '#4ade80';
    case 'in_progress':
      return '#60a5fa';
    case 'delayed':
      return '#fbbf24';
    case 'skipped':
      return '#f87171';
    default:
      return '#64748b';
  }
}

export default GlobalMap;
