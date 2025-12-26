import { cn } from '@/lib/utils';
import { REINDEER_NAMES } from '@/lib/constants';

interface ReindeerStatusProps {
  fatiguePercent: number;
  className?: string;
}

const ReindeerStatus = ({ fatiguePercent, className }: ReindeerStatusProps) => {
  // Simulate individual reindeer fatigue based on overall fatigue
  const getReindeerFatigue = (index: number) => {
    // Add some variance per reindeer
    const variance = (Math.sin(index * 1.5) + 1) * 10;
    return Math.min(100, Math.max(0, fatiguePercent + variance - 5));
  };

  const getFatigueColor = (fatigue: number) => {
    if (fatigue >= 80) return 'bg-status-danger';
    if (fatigue >= 60) return 'bg-status-warning';
    if (fatigue >= 40) return 'bg-status-info';
    return 'bg-status-success';
  };

  const getFatigueLabel = (fatigue: number) => {
    if (fatigue >= 80) return 'Exhausted';
    if (fatigue >= 60) return 'Tired';
    if (fatigue >= 40) return 'Good';
    return 'Fresh';
  };

  return (
    <div className={cn('glass-panel rounded-xl p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🦌</span>
          <h3 className="font-semibold">Reindeer Status</h3>
        </div>
        <span className={cn(
          'status-badge',
          fatiguePercent >= 80 ? 'status-critical' :
          fatiguePercent >= 60 ? 'status-delayed' :
          fatiguePercent >= 40 ? 'status-in-progress' : 'status-completed'
        )}>
          {getFatigueLabel(fatiguePercent)}
        </span>
      </div>

      <div className="space-y-2">
        {REINDEER_NAMES.map((name, index) => {
          const fatigue = getReindeerFatigue(index);
          const isRudolph = name === 'Rudolph';

          return (
            <div key={name} className="flex items-center gap-3">
              <span className="w-20 text-xs font-medium truncate">
                {isRudolph ? '🔴 ' : ''}{name}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    getFatigueColor(fatigue)
                  )}
                  style={{ width: `${100 - fatigue}%` }}
                />
              </div>
              <span className="w-10 text-xs mono text-right text-muted-foreground">
                {(100 - fatigue).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Team Average Energy</span>
          <span className={cn(
            'font-semibold',
            fatiguePercent >= 60 ? 'text-status-warning' : 'text-status-success'
          )}>
            {(100 - fatiguePercent).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReindeerStatus;
