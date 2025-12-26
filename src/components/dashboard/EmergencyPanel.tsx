import { AlertTriangle, X, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SEVERITY_COLORS } from '@/lib/constants';
import type { Emergency } from '@/lib/types';

interface EmergencyPanelProps {
  emergencies: Emergency[];
  onResolve?: (id: string) => void;
  className?: string;
}

const EmergencyPanel = ({ emergencies, onResolve, className }: EmergencyPanelProps) => {
  const activeEmergencies = emergencies.filter(e => !e.is_resolved);
  const hasActiveEmergencies = activeEmergencies.length > 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reindeer_fatigue': return '🦌';
      case 'weather_critical': return '⛈️';
      case 'mechanical': return '🔧';
      case 'route_blocked': return '🚧';
      case 'time_critical': return '⏰';
      default: return '⚠️';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'reindeer_fatigue': return 'Reindeer Fatigue';
      case 'weather_critical': return 'Critical Weather';
      case 'mechanical': return 'Mechanical Issue';
      case 'route_blocked': return 'Route Blocked';
      case 'time_critical': return 'Time Critical';
      default: return 'Alert';
    }
  };

  return (
    <div className={cn(
      'glass-panel rounded-xl p-4',
      hasActiveEmergencies && 'border-status-danger/30 bg-status-danger/5',
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className={cn(
            'w-4 h-4',
            hasActiveEmergencies ? 'text-status-danger' : 'text-muted-foreground'
          )} />
          <h3 className="font-semibold">Emergency Alerts</h3>
        </div>
        {hasActiveEmergencies && (
          <span className="status-badge status-critical animate-pulse">
            {activeEmergencies.length} active
          </span>
        )}
      </div>

      {activeEmergencies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-10 h-10 rounded-full bg-status-success/10 flex items-center justify-center mb-2">
            <Check className="w-5 h-5 text-status-success" />
          </div>
          <p className="text-sm text-muted-foreground">No active emergencies</p>
        </div>
      ) : (
        <ScrollArea className="h-[200px] pr-2">
          <div className="space-y-2">
            {activeEmergencies.map((emergency) => (
              <div
                key={emergency.id}
                className={cn(
                  'p-3 rounded-lg border',
                  emergency.severity === 'critical' 
                    ? 'bg-status-danger/10 border-status-danger/30' 
                    : emergency.severity === 'high'
                    ? 'bg-status-warning/10 border-status-warning/30'
                    : 'bg-muted/50 border-border/50'
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{getTypeIcon(emergency.type)}</span>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{emergency.title}</p>
                      <span className={cn('status-badge text-[10px]', SEVERITY_COLORS[emergency.severity])}>
                        {emergency.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {getTypeLabel(emergency.type)}
                    </p>
                    {emergency.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {emergency.description}
                      </p>
                    )}
                  </div>

                  {onResolve && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => onResolve(emergency.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default EmergencyPanel;
