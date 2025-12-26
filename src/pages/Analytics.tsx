import { BarChart3, TrendingUp, Clock, Gift, MapPin, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useMissionData } from '@/hooks/useMissionData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { missionStats, deliveries, cities, citiesMap } = useMissionData();

  // Generate mock hourly data for the chart
  const hourlyData = Array.from({ length: 12 }, (_, i) => ({
    hour: `${i + 1}h`,
    gifts: Math.floor(Math.random() * 50000000) + 10000000,
    cities: Math.floor(Math.random() * 8) + 2,
  }));

  // Calculate region stats
  const regionStats = [
    { name: 'Asia Pacific', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Europe', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Americas', value: 25, color: 'hsl(var(--chart-3))' },
    { name: 'Africa', value: 10, color: 'hsl(var(--chart-4))' },
    { name: 'Oceania', value: 5, color: 'hsl(var(--chart-5))' },
  ];

  // Performance metrics
  const avgSpeed = 7500;
  const efficiency = 94.2;
  const onTimeRate = 98.7;

  const completedDeliveries = deliveries.filter(d => d.status === 'completed').length;
  const totalDeliveries = deliveries.length;
  const completionRate = totalDeliveries > 0 ? (completedDeliveries / totalDeliveries) * 100 : 0;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Mission performance metrics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Efficiency</p>
                <p className="text-2xl font-bold mt-1">{efficiency}%</p>
              </div>
              <div className="p-2 rounded-lg bg-status-success/10">
                <TrendingUp className="w-5 h-5 text-status-success" />
              </div>
            </div>
            <p className="text-xs text-status-success mt-2">↑ 2.3% vs last year</p>
          </CardContent>
        </Card>
        
        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">On-Time Rate</p>
                <p className="text-2xl font-bold mt-1">{onTimeRate}%</p>
              </div>
              <div className="p-2 rounded-lg bg-status-info/10">
                <Clock className="w-5 h-5 text-status-info" />
              </div>
            </div>
            <p className="text-xs text-status-success mt-2">↑ 0.8% improvement</p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Speed</p>
                <p className="text-2xl font-bold mt-1">{avgSpeed.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">km/h cruising</p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Completion</p>
                <p className="text-2xl font-bold mt-1">{completionRate.toFixed(1)}%</p>
              </div>
              <div className="p-2 rounded-lg bg-accent/10">
                <Gift className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{completedDeliveries}/{totalDeliveries} cities</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Progress Chart */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Hourly Delivery Rate
            </CardTitle>
            <CardDescription>Gifts delivered per hour of operation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorGifts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${(value / 1_000_000).toFixed(1)}M gifts`, 'Delivered']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gifts" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorGifts)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Regional Distribution
            </CardTitle>
            <CardDescription>Delivery workload by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {regionStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-2">
                {regionStats.map((region, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="text-sm flex-1">{region.name}</span>
                    <span className="text-sm font-medium">{region.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cities by Deliveries */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Top Cities by Gift Count</CardTitle>
          <CardDescription>Highest volume delivery destinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={cities.slice(0, 10).map(c => ({
                  name: c.name,
                  gifts: c.gift_count / 1_000_000
                }))}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value}M`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}M gifts`, 'Volume']}
                />
                <Bar 
                  dataKey="gifts" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
