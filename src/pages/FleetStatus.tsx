import { Gauge, Battery, Thermometer, Wind, Compass, Weight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ReindeerStatus from '@/components/dashboard/ReindeerStatus';
import { useMissionData } from '@/hooks/useMissionData';
import { cn } from '@/lib/utils';
import { SLEIGH_MAX_SPEED_KMH, SLEIGH_CAPACITY_KG } from '@/lib/constants';

const FleetStatus = () => {
  const { telemetry, missionStats } = useMissionData();

  const speedPercent = telemetry ? (telemetry.speed_kmh / SLEIGH_MAX_SPEED_KMH) * 100 : 0;
  const cargoPercent = telemetry ? (telemetry.cargo_weight_kg / SLEIGH_CAPACITY_KG) * 100 : 0;
  const energyPercent = telemetry ? 100 - telemetry.reindeer_fatigue_percent : 100;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fleet Status</h1>
        <p className="text-muted-foreground">Real-time sleigh telemetry and reindeer monitoring</p>
      </div>

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Speed */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gauge className="w-4 h-4 text-primary" />
              Current Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-3xl font-bold mono">
                {telemetry?.speed_kmh.toLocaleString() || 0}
                <span className="text-lg text-muted-foreground ml-1">km/h</span>
              </p>
              <Progress value={speedPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {speedPercent.toFixed(0)}% of max speed ({SLEIGH_MAX_SPEED_KMH.toLocaleString()} km/h)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Altitude */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-status-info" />
              Altitude
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-3xl font-bold mono">
                {telemetry?.altitude_meters.toLocaleString() || 0}
                <span className="text-lg text-muted-foreground ml-1">m</span>
              </p>
              <Progress value={(telemetry?.altitude_meters || 0) / 150} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Cruising altitude: 10,000 - 15,000m optimal
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Heading */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Compass className="w-4 h-4 text-status-warning" />
              Heading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-3xl font-bold mono">
                {telemetry?.heading_degrees || 0}
                <span className="text-lg text-muted-foreground ml-1">°</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Direction:</span>
                <span className="text-sm font-medium">
                  {getCompassDirection(telemetry?.heading_degrees || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cargo Load */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Weight className="w-4 h-4 text-status-success" />
              Cargo Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-3xl font-bold mono">
                {((telemetry?.cargo_weight_kg || 0) / 1000).toFixed(0)}
                <span className="text-lg text-muted-foreground ml-1">tons</span>
              </p>
              <Progress 
                value={cargoPercent} 
                className={cn("h-2", cargoPercent > 90 && "[&>div]:bg-status-warning")} 
              />
              <p className="text-xs text-muted-foreground">
                {cargoPercent.toFixed(0)}% capacity remaining
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team Energy */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Battery className="w-4 h-4 text-accent" />
              Team Energy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-3xl font-bold mono">
                {energyPercent.toFixed(0)}
                <span className="text-lg text-muted-foreground ml-1">%</span>
              </p>
              <Progress 
                value={energyPercent} 
                className={cn(
                  "h-2",
                  energyPercent < 40 && "[&>div]:bg-status-danger",
                  energyPercent >= 40 && energyPercent < 70 && "[&>div]:bg-status-warning"
                )} 
              />
              <p className="text-xs text-muted-foreground">
                {energyPercent >= 70 ? 'Optimal condition' : 
                 energyPercent >= 40 ? 'Consider rest stop' : 'Rest recommended'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Position */}
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wind className="w-4 h-4 text-muted-foreground" />
              Current Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Latitude</span>
                <span className="text-sm font-mono">{telemetry?.latitude.toFixed(4) || '0.0000'}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Longitude</span>
                <span className="text-sm font-mono">{telemetry?.longitude.toFixed(4) || '0.0000'}°</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reindeer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReindeerStatus fatiguePercent={telemetry?.reindeer_fatigue_percent || 0} />
        
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Sleigh Systems</CardTitle>
            <CardDescription>All systems operational status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Navigation System', status: 'operational' },
                { name: 'Gift Distribution', status: 'operational' },
                { name: 'Stealth Mode', status: 'active' },
                { name: 'Time Dilation Field', status: 'operational' },
                { name: 'Anti-Detection Shield', status: 'operational' },
                { name: 'Emergency Beacon', status: 'standby' },
              ].map(system => (
                <div key={system.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm">{system.name}</span>
                  <span className={cn(
                    "status-badge text-xs",
                    system.status === 'operational' && "status-completed",
                    system.status === 'active' && "status-in-progress",
                    system.status === 'standby' && "status-pending"
                  )}>
                    {system.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function getCompassDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export default FleetStatus;
