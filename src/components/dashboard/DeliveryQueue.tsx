import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Delivery, City } from '@/lib/types';

interface DeliveryQueueProps {
  deliveries: Delivery[];
  cities: Map<string, City>;
  className?: string;
}

const DeliveryQueue = ({ deliveries, cities, className }: DeliveryQueueProps) => {
  // Sort deliveries: in_progress first, then pending, then completed
  const sortedDeliveries = [...deliveries].sort((a, b) => {
    const priority = { in_progress: 0, pending: 1, delayed: 2, completed: 3, skipped: 4 };
    return (priority[a.status] ?? 5) - (priority[b.status] ?? 5);
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in_progress': return 'status-in-progress';
      case 'delayed': return 'status-delayed';
      case 'skipped': return 'status-critical';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in_progress': return '→';
      case 'delayed': return '!';
      case 'skipped': return '✕';
      default: return '○';
    }
  };

  return (
    <div className={cn('glass-panel rounded-xl p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Delivery Queue</h3>
        <span className="text-xs text-muted-foreground">
          {deliveries.filter(d => d.status === 'completed').length}/{deliveries.length} complete
        </span>
      </div>

      <ScrollArea className="h-[300px] pr-2">
        <div className="space-y-2">
          {sortedDeliveries.slice(0, 50).map((delivery) => {
            const city = cities.get(delivery.city_id);
            if (!city) return null;

            return (
              <div
                key={delivery.id}
                className={cn(
                  'flex items-center gap-3 p-2.5 rounded-lg transition-colors',
                  delivery.status === 'in_progress' 
                    ? 'bg-status-info/10 border border-status-info/20' 
                    : 'hover:bg-muted/50'
                )}
              >
                <span className={cn('status-badge', getStatusClass(delivery.status))}>
                  {getStatusIcon(delivery.status)}
                </span>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{city.name}</p>
                  <p className="text-xs text-muted-foreground">{city.country}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-medium mono">
                    {formatGiftCount(city.gift_count)}
                  </p>
                  <p className="text-xs text-muted-foreground">gifts</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

function formatGiftCount(count: number): string {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + 'M';
  if (count >= 1_000) return (count / 1_000).toFixed(0) + 'K';
  return count.toString();
}

export default DeliveryQueue;
