import { Cloud, Wind, Eye, Thermometer, AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMissionData } from '@/hooks/useMissionData';
import { cn } from '@/lib/utils';
import { WEATHER_ICONS } from '@/lib/constants';

const WeatherCenter = () => {
  const { weather, cities, citiesMap } = useMissionData();

  const activeConditions = weather.filter(w => w.is_active);
  const severeConditions = activeConditions.filter(w => w.severity >= 3);

  // Generate regional weather summary
  const regions = [
    { name: 'North America', condition: 'clear', temp: -5, wind: 25 },
    { name: 'Europe', condition: 'snow', temp: -8, wind: 35 },
    { name: 'Asia Pacific', condition: 'clear', temp: 2, wind: 15 },
    { name: 'South America', condition: 'clear', temp: 22, wind: 10 },
    { name: 'Africa', condition: 'clear', temp: 18, wind: 20 },
    { name: 'Oceania', condition: 'wind', temp: 25, wind: 45 },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Weather Center</h1>
          <p className="text-muted-foreground">Global weather conditions and flight advisories</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Alert Banner */}
      {severeConditions.length > 0 && (
        <Card className="border-status-warning/30 bg-status-warning/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />
              <div>
                <p className="font-medium text-status-warning">Weather Advisory Active</p>
                <p className="text-sm text-muted-foreground">
                  {severeConditions.length} severe weather condition(s) detected. Route adjustments may be required.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Regional Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {regions.map(region => (
          <Card key={region.name} className="glass-panel">
            <CardContent className="pt-4 text-center">
              <span className="text-2xl">{WEATHER_ICONS[region.condition] || '☀️'}</span>
              <p className="text-sm font-medium mt-2 truncate">{region.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{region.condition}</p>
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>{region.temp}°C</span>
                <span>•</span>
                <span>{region.wind} km/h</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Weather Events */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Active Weather Events
            </CardTitle>
            <CardDescription>Current conditions affecting flight paths</CardDescription>
          </CardHeader>
          <CardContent>
            {activeConditions.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-4xl mb-3 block">☀️</span>
                <p className="text-muted-foreground">No active weather events</p>
                <p className="text-sm text-muted-foreground">Clear skies globally</p>
              </div>
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {activeConditions.map(condition => {
                    const city = condition.city_id ? citiesMap.get(condition.city_id) : null;
                    return (
                      <div 
                        key={condition.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          condition.severity >= 4 && "border-status-danger/30 bg-status-danger/5",
                          condition.severity === 3 && "border-status-warning/30 bg-status-warning/5",
                          condition.severity < 3 && "border-border bg-muted/30"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{WEATHER_ICONS[condition.condition]}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium capitalize">{condition.condition}</p>
                              <span className={cn(
                                "status-badge text-[10px]",
                                condition.severity >= 4 && "status-critical",
                                condition.severity === 3 && "status-delayed",
                                condition.severity < 3 && "status-pending"
                              )}>
                                Severity {condition.severity}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {city?.name || condition.region || 'Unknown region'}
                            </p>
                            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Wind className="w-3 h-3" />
                                {condition.wind_speed_kmh} km/h
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {condition.visibility_km} km
                              </span>
                            </div>
                            {condition.speed_reduction_percent > 0 && (
                              <p className="text-xs text-status-warning mt-2">
                                ⚠️ Speed reduction: {condition.speed_reduction_percent}%
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Flight Conditions */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Flight Conditions Summary
            </CardTitle>
            <CardDescription>Overall conditions for tonight's mission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-status-success/10 border border-status-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-status-success" />
                  <span className="font-medium text-status-success">Favorable</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {cities.length - severeConditions.length} cities with clear or light conditions
                </p>
              </div>

              <div className={cn(
                "p-4 rounded-lg border",
                severeConditions.length > 0 
                  ? "bg-status-warning/10 border-status-warning/20"
                  : "bg-muted/30 border-border"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    severeConditions.length > 0 ? "bg-status-warning" : "bg-muted-foreground"
                  )} />
                  <span className={cn(
                    "font-medium",
                    severeConditions.length > 0 ? "text-status-warning" : "text-muted-foreground"
                  )}>
                    Challenging
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {severeConditions.length} areas with severe conditions
                </p>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Recommendations</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-status-success">✓</span>
                    Maintain cruising altitude above 10,000m
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-status-success">✓</span>
                    Follow time zone progression for optimal cover
                  </li>
                  {severeConditions.length > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-status-warning">!</span>
                      Consider alternate routes around severe weather
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherCenter;
