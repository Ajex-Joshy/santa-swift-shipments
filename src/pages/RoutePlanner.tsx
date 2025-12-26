import { useState } from 'react';
import { Play, Pause, RotateCcw, Zap, MapPin, Clock, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMissionData } from '@/hooks/useMissionData';
import { cn } from '@/lib/utils';

const RoutePlanner = () => {
  const { cities, citiesMap, deliveries, missionStats } = useMissionData();
  const [optimizing, setOptimizing] = useState(false);

  // Sort cities by priority for display
  const sortedCities = [...cities].sort((a, b) => b.priority_score - a.priority_score);
  
  // Get delivery status for each city
  const getDeliveryStatus = (cityId: string) => {
    const delivery = deliveries.find(d => d.city_id === cityId);
    return delivery?.status || 'pending';
  };

  const handleOptimize = async () => {
    setOptimizing(true);
    // Simulate optimization
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOptimizing(false);
  };

  const completedCount = deliveries.filter(d => d.status === 'completed').length;
  const inProgressCount = deliveries.filter(d => d.status === 'in_progress').length;
  const pendingCount = deliveries.filter(d => d.status === 'pending').length;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Route Planner</h1>
          <p className="text-muted-foreground">Optimize delivery routes for maximum efficiency</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Route
          </Button>
          <Button size="sm" onClick={handleOptimize} disabled={optimizing}>
            <Zap className={cn("w-4 h-4 mr-2", optimizing && "animate-pulse")} />
            {optimizing ? 'Optimizing...' : 'Optimize Route'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-status-success/10">
                <MapPin className="w-5 h-5 text-status-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-status-info/10">
                <Route className="w-5 h-5 text-status-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{cities.length}</p>
                <p className="text-xs text-muted-foreground">Total Cities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route List */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Delivery Sequence</CardTitle>
          <CardDescription>Cities ordered by optimized delivery path (East → West)</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-2">
              {sortedCities.map((city, index) => {
                const status = getDeliveryStatus(city.id);
                return (
                  <div 
                    key={city.id}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-lg transition-colors",
                      status === 'completed' && "bg-status-success/5 border border-status-success/20",
                      status === 'in_progress' && "bg-status-info/10 border border-status-info/30",
                      status === 'pending' && "hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      status === 'completed' && "bg-status-success text-white",
                      status === 'in_progress' && "bg-status-info text-white",
                      status === 'pending' && "bg-muted text-muted-foreground"
                    )}>
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{city.name}</p>
                      <p className="text-sm text-muted-foreground">{city.country}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium mono">
                        {(city.gift_count / 1_000_000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-muted-foreground">gifts</p>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <p className="text-xs text-muted-foreground">Priority</p>
                      <p className="text-sm font-medium">{city.priority_score}</p>
                    </div>

                    <span className={cn(
                      "status-badge text-xs",
                      status === 'completed' && "status-completed",
                      status === 'in_progress' && "status-in-progress",
                      status === 'pending' && "status-pending"
                    )}>
                      {status.replace('_', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoutePlanner;
