import { Settings as SettingsIcon, Moon, Bell, Globe, Shield, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your Santa Command dashboard</p>
      </div>

      {/* Appearance */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how the dashboard looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Use dark theme for the dashboard</p>
            </div>
            <Switch id="dark-mode" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="animations">Animations</Label>
              <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compact">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
            </div>
            <Switch id="compact" />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage alert preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
              <p className="text-sm text-muted-foreground">Critical notifications for urgent situations</p>
            </div>
            <Switch id="emergency-alerts" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weather-alerts">Weather Alerts</Label>
              <p className="text-sm text-muted-foreground">Notifications for severe weather changes</p>
            </div>
            <Switch id="weather-alerts" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="delivery-updates">Delivery Updates</Label>
              <p className="text-sm text-muted-foreground">Status changes for city deliveries</p>
            </div>
            <Switch id="delivery-updates" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sound">Sound Effects</Label>
              <p className="text-sm text-muted-foreground">Audio alerts for important events</p>
            </div>
            <Switch id="sound" />
          </div>
        </CardContent>
      </Card>

      {/* Map Settings */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Map Settings
          </CardTitle>
          <CardDescription>Configure the global tracking map</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="3d-globe">3D Globe View</Label>
              <p className="text-sm text-muted-foreground">Show map as interactive 3D globe</p>
            </div>
            <Switch id="3d-globe" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="flight-path">Show Flight Path</Label>
              <p className="text-sm text-muted-foreground">Display traveled and projected routes</p>
            </div>
            <Switch id="flight-path" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weather-overlay">Weather Overlay</Label>
              <p className="text-sm text-muted-foreground">Show weather conditions on map</p>
            </div>
            <Switch id="weather-overlay" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* System */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            System
          </CardTitle>
          <CardDescription>System maintenance and data management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Clear Cache</Label>
              <p className="text-sm text-muted-foreground">Remove locally cached data</p>
            </div>
            <Button variant="outline" size="sm">Clear</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Reset Simulation</Label>
              <p className="text-sm text-muted-foreground">Start mission from beginning</p>
            </div>
            <Button variant="outline" size="sm">Reset</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Export Data</Label>
              <p className="text-sm text-muted-foreground">Download mission data as JSON</p>
            </div>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Santa Logistics Command</strong> v1.0.0</p>
            <p>Global Gift Delivery Operations System</p>
            <p>© {new Date().getFullYear()} Santa Claus Enterprises</p>
            <p className="pt-2">Built with ❤️ at the North Pole</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
