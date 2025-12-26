import { Clock, MapPin, Plane, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATUS_LABELS } from '@/lib/constants';
import type { MissionStats, SleighTelemetry } from '@/lib/types';

interface MissionHeaderProps {
  stats: MissionStats | null;
  telemetry: SleighTelemetry | null;
  currentCityName?: string;
  nextCityName?: string;
}

const MissionHeader = ({ stats, telemetry, currentCityName, nextCityName }: MissionHeaderProps) => {
  const progress = stats ? (stats.gifts_delivered / stats.total_gifts) * 100 : 0;
  const citiesProgress = stats ? (stats.cities_visited / stats.total_cities) * 100 : 0;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'in_flight':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'emergency':
        return 'status-critical';
      case 'paused':
        return 'status-delayed';
      default:
        return 'status-pending';
    }
  };

  return (
    <header className="glass-panel rounded-xl p-4 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Mission Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            <span className="text-2xl">🎅</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Santa Logistics Command</h1>
              <span className={cn('status-badge', getStatusBadgeClass(stats?.current_status || 'preparing'))}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {STATUS_LABELS[stats?.current_status || 'preparing']}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Global Gift Delivery Operations
            </p>
          </div>
        </div>

        {/* Center: Quick Stats */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-status-success" />
            <div>
              <p className="text-xs text-muted-foreground">Delivered</p>
              <p className="text-sm font-semibold mono">
                {formatNumber(stats?.gifts_delivered || 0)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-status-info" />
            <div>
              <p className="text-xs text-muted-foreground">Cities</p>
              <p className="text-sm font-semibold mono">
                {stats?.cities_visited || 0}/{stats?.total_cities || 0}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-status-warning" />
            <div>
              <p className="text-xs text-muted-foreground">Speed</p>
              <p className="text-sm font-semibold mono">
                {formatNumber(telemetry?.speed_kmh || 0)} km/h
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Altitude</p>
              <p className="text-sm font-semibold mono">
                {formatNumber(telemetry?.altitude_meters || 0)}m
              </p>
            </div>
          </div>
        </div>

        {/* Right: Location Info */}
        <div className="hidden xl:block text-right">
          {currentCityName && (
            <p className="text-sm">
              <span className="text-muted-foreground">Now: </span>
              <span className="font-medium">{currentCityName}</span>
            </p>
          )}
          {nextCityName && (
            <p className="text-sm mt-0.5">
              <span className="text-muted-foreground">Next: </span>
              <span className="font-medium text-primary">{nextCityName}</span>
            </p>
          )}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Gift Progress</span>
            <span className="font-medium mono">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-status-success to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Route Progress</span>
            <span className="font-medium mono">{citiesProgress.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-status-info to-primary transition-all duration-500"
              style={{ width: `${citiesProgress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toLocaleString();
}

export default MissionHeader;
