import { Cloud, Wind, Eye, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { WEATHER_ICONS } from '@/lib/constants';
import type { WeatherCondition, City } from '@/lib/types';

interface WeatherPanelProps {
  conditions: WeatherCondition[];
  cities: Map<string, City>;
  className?: string;
}

const WeatherPanel = ({ conditions, cities, className }: WeatherPanelProps) => {
  const activeConditions = conditions.filter(c => c.is_active && c.condition !== 'clear');
  
  const getSeverityClass = (severity: number) => {
    if (severity >= 4) return 'status-critical';
    if (severity >= 3) return 'status-delayed';
    if (severity >= 2) return 'status-pending';
    return 'status-completed';
  };

  return (
    <div className={cn('glass-panel rounded-xl p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold">Weather Conditions</h3>
        </div>
        {activeConditions.length > 0 && (
          <span className="status-badge status-delayed">
            <AlertTriangle className="w-3 h-3" />
            {activeConditions.length} active
          </span>
        )}
      </div>

      {activeConditions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <span className="text-3xl mb-2">☀️</span>
          <p className="text-sm text-muted-foreground">All clear across the globe</p>
        </div>
      ) : (
        <ScrollArea className="h-[200px] pr-2">
          <div className="space-y-2">
            {activeConditions.map((condition) => {
              const city = condition.city_id ? cities.get(condition.city_id) : null;
              const locationName = city?.name || condition.region || 'Unknown';

              return (
                <div
                  key={condition.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30"
                >
                  <span className="text-xl">
                    {WEATHER_ICONS[condition.condition] || '🌤️'}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium capitalize">
                        {condition.condition}
                      </p>
                      <span className={cn('status-badge text-[10px]', getSeverityClass(condition.severity))}>
                        Sev {condition.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {locationName}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Wind className="w-3 h-3" />
                      <span className="mono">{condition.wind_speed_kmh}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span className="mono">{condition.visibility_km}km</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default WeatherPanel;
