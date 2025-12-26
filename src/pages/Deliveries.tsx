import { Package, Search, Filter, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMissionData } from '@/hooks/useMissionData';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Deliveries = () => {
  const { deliveries, citiesMap } = useMissionData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter deliveries
  const filteredDeliveries = deliveries.filter(delivery => {
    const city = citiesMap.get(delivery.city_id);
    if (!city) return false;
    
    const matchesSearch = searchQuery === '' || 
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || delivery.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    completed: deliveries.filter(d => d.status === 'completed').length,
    inProgress: deliveries.filter(d => d.status === 'in_progress').length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    delayed: deliveries.filter(d => d.status === 'delayed').length,
  };

  const totalGifts = filteredDeliveries.reduce((sum, d) => {
    const city = citiesMap.get(d.city_id);
    return sum + (city?.gift_count || 0);
  }, 0);

  const deliveredGifts = filteredDeliveries.reduce((sum, d) => sum + d.gifts_delivered, 0);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deliveries</h1>
        <p className="text-muted-foreground">Track all city deliveries and gift distribution</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className={cn("glass-panel cursor-pointer transition-colors", statusFilter === 'completed' && "ring-2 ring-status-success")}
          onClick={() => setStatusFilter(statusFilter === 'completed' ? null : 'completed')}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-status-success" />
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className={cn("glass-panel cursor-pointer transition-colors", statusFilter === 'in_progress' && "ring-2 ring-status-info")}
          onClick={() => setStatusFilter(statusFilter === 'in_progress' ? null : 'in_progress')}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-status-info animate-pulse" />
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className={cn("glass-panel cursor-pointer transition-colors", statusFilter === 'pending' && "ring-2 ring-muted-foreground")}
          onClick={() => setStatusFilter(statusFilter === 'pending' ? null : 'pending')}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className={cn("glass-panel cursor-pointer transition-colors", statusFilter === 'delayed' && "ring-2 ring-status-warning")}
          onClick={() => setStatusFilter(statusFilter === 'delayed' ? null : 'delayed')}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-status-warning" />
              <div>
                <p className="text-2xl font-bold">{stats.delayed}</p>
                <p className="text-xs text-muted-foreground">Delayed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search cities or countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {statusFilter && (
          <Button variant="outline" onClick={() => setStatusFilter(null)}>
            <Filter className="w-4 h-4 mr-2" />
            Clear Filter
          </Button>
        )}
      </div>

      {/* Delivery Summary */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-muted-foreground">
          Showing <strong className="text-foreground">{filteredDeliveries.length}</strong> deliveries
        </span>
        <span className="text-muted-foreground">
          Total gifts: <strong className="text-foreground">{(totalGifts / 1_000_000).toFixed(1)}M</strong>
        </span>
        <span className="text-muted-foreground">
          Delivered: <strong className="text-status-success">{(deliveredGifts / 1_000_000).toFixed(1)}M</strong>
        </span>
      </div>

      {/* Delivery List */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Delivery Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {filteredDeliveries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No deliveries match your search
                </div>
              ) : (
                filteredDeliveries.map(delivery => {
                  const city = citiesMap.get(delivery.city_id);
                  if (!city) return null;
                  
                  const progress = city.gift_count > 0 
                    ? (delivery.gifts_delivered / city.gift_count) * 100 
                    : 0;

                  return (
                    <div 
                      key={delivery.id}
                      className={cn(
                        "p-4 rounded-lg border transition-colors",
                        delivery.status === 'completed' && "bg-status-success/5 border-status-success/20",
                        delivery.status === 'in_progress' && "bg-status-info/10 border-status-info/30",
                        delivery.status === 'delayed' && "bg-status-warning/10 border-status-warning/30",
                        delivery.status === 'pending' && "border-border hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{city.name}</p>
                            <span className={cn(
                              "status-badge text-xs",
                              delivery.status === 'completed' && "status-completed",
                              delivery.status === 'in_progress' && "status-in-progress",
                              delivery.status === 'delayed' && "status-delayed",
                              delivery.status === 'pending' && "status-pending"
                            )}>
                              {delivery.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{city.country}</p>
                        </div>

                        <div className="text-right min-w-[120px]">
                          <p className="text-sm font-medium mono">
                            {(delivery.gifts_delivered / 1_000_000).toFixed(2)}M / {(city.gift_count / 1_000_000).toFixed(2)}M
                          </p>
                          <p className="text-xs text-muted-foreground">gifts</p>
                        </div>

                        <div className="w-24">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full transition-all",
                                delivery.status === 'completed' && "bg-status-success",
                                delivery.status === 'in_progress' && "bg-status-info",
                                delivery.status === 'delayed' && "bg-status-warning",
                                delivery.status === 'pending' && "bg-muted-foreground"
                              )}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground text-center mt-1">
                            {progress.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                      
                      {delivery.delay_reason && (
                        <p className="text-xs text-status-warning mt-2">
                          Delay: {delivery.delay_reason}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deliveries;
