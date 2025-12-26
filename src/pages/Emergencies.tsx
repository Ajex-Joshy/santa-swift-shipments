import { AlertTriangle, Bell, CheckCircle, Shield, Zap, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMissionData } from '@/hooks/useMissionData';
import { cn } from '@/lib/utils';

const Emergencies = () => {
  const { emergencies, resolveEmergency } = useMissionData();

  const activeEmergencies = emergencies.filter(e => !e.is_resolved);
  const criticalCount = activeEmergencies.filter(e => e.severity === 'critical').length;
  const highCount = activeEmergencies.filter(e => e.severity === 'high').length;

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

  const protocols = [
    { id: 1, name: 'Emergency Landing Protocol', status: 'ready', description: 'Nearest safe landing locations identified' },
    { id: 2, name: 'Backup Reindeer Deployment', status: 'ready', description: 'Reserve team on standby at North Pole' },
    { id: 3, name: 'Weather Avoidance', status: 'active', description: 'Automatic rerouting enabled' },
    { id: 4, name: 'Time Dilation Override', status: 'ready', description: 'Emergency time extension available' },
    { id: 5, name: 'Elf Support Network', status: 'active', description: 'Ground teams positioned globally' },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Emergency Center</h1>
          <p className="text-muted-foreground">Monitor and respond to critical situations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Alert History
          </Button>
          <Button variant="destructive" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Emergency Line
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      <Card className={cn(
        "border",
        activeEmergencies.length === 0 && "border-status-success/30 bg-status-success/5",
        activeEmergencies.length > 0 && criticalCount === 0 && "border-status-warning/30 bg-status-warning/5",
        criticalCount > 0 && "border-status-danger/30 bg-status-danger/5"
      )}>
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            {activeEmergencies.length === 0 ? (
              <>
                <CheckCircle className="w-8 h-8 text-status-success" />
                <div>
                  <p className="font-semibold text-status-success">All Systems Normal</p>
                  <p className="text-sm text-muted-foreground">No active emergencies. Mission proceeding as planned.</p>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className={cn(
                  "w-8 h-8",
                  criticalCount > 0 ? "text-status-danger animate-pulse" : "text-status-warning"
                )} />
                <div>
                  <p className={cn(
                    "font-semibold",
                    criticalCount > 0 ? "text-status-danger" : "text-status-warning"
                  )}>
                    {activeEmergencies.length} Active Alert{activeEmergencies.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {criticalCount > 0 && `${criticalCount} critical • `}
                    {highCount > 0 && `${highCount} high priority • `}
                    Immediate attention required
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Emergencies */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Active Emergencies
            </CardTitle>
            <CardDescription>Current situations requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {activeEmergencies.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-status-success mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No active emergencies</p>
                <p className="text-sm text-muted-foreground">All systems operating normally</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {activeEmergencies.map(emergency => (
                    <div
                      key={emergency.id}
                      className={cn(
                        "p-4 rounded-lg border",
                        emergency.severity === 'critical' && "bg-status-danger/10 border-status-danger/30",
                        emergency.severity === 'high' && "bg-status-warning/10 border-status-warning/30",
                        emergency.severity === 'medium' && "bg-status-info/10 border-status-info/30",
                        emergency.severity === 'low' && "bg-muted/30 border-border"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{getTypeIcon(emergency.type)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{emergency.title}</p>
                            <span className={cn(
                              "status-badge text-[10px] uppercase",
                              emergency.severity === 'critical' && "status-critical",
                              emergency.severity === 'high' && "status-delayed",
                              emergency.severity === 'medium' && "status-in-progress",
                              emergency.severity === 'low' && "status-pending"
                            )}>
                              {emergency.severity}
                            </span>
                          </div>
                          {emergency.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {emergency.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => resolveEmergency(emergency.id)}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Resolve
                            </Button>
                            <Button size="sm" variant="ghost">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Emergency Protocols */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Emergency Protocols
            </CardTitle>
            <CardDescription>Quick-response procedures and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {protocols.map(protocol => (
                <div 
                  key={protocol.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    protocol.status === 'active' && "bg-status-success animate-pulse",
                    protocol.status === 'ready' && "bg-status-info",
                    protocol.status === 'standby' && "bg-muted-foreground"
                  )} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{protocol.name}</p>
                    <p className="text-xs text-muted-foreground">{protocol.description}</p>
                  </div>
                  <span className={cn(
                    "text-xs font-medium uppercase",
                    protocol.status === 'active' && "text-status-success",
                    protocol.status === 'ready' && "text-status-info",
                    protocol.status === 'standby' && "text-muted-foreground"
                  )}>
                    {protocol.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  🛬 Request Landing
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  🦌 Deploy Backup
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  🗺️ Reroute Mission
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  📞 Contact HQ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergencies;
