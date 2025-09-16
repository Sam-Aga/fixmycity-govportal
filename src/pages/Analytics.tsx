import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState("thisMonth");

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
    toast.success(`Showing analytics for: ${value.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
  };
  // Mock analytics data - will be replaced with real data from Supabase
  const analytics = {
    thisMonth: {
      totalReports: 347,
      resolved: 289,
      pending: 58,
      averageResolutionTime: "4.2 days",
      citizenSatisfaction: 87
    },
    lastMonth: {
      totalReports: 312,
      resolved: 267,
      pending: 45
    },
    reportsByType: [
      { type: "Potholes", count: 142, percentage: 41, trend: "+12%" },
      { type: "Streetlights", count: 89, percentage: 26, trend: "-5%" },
      { type: "Garbage", count: 67, percentage: 19, trend: "+8%" },
      { type: "Water Issues", count: 49, percentage: 14, trend: "+3%" }
    ],
    reportsByDistrict: [
      { district: "Downtown", reports: 94, resolved: 81, pending: 13 },
      { district: "Midtown", reports: 76, resolved: 68, pending: 8 },
      { district: "Uptown", reports: 84, resolved: 71, pending: 13 },
      { district: "Suburbs", reports: 93, resolved: 69, pending: 24 }
    ],
    monthlyTrend: [
      { month: "Jan", reports: 298 },
      { month: "Feb", reports: 312 },
      { month: "Mar", reports: 289 },
      { month: "Apr", reports: 334 },
      { month: "May", reports: 347 }
    ]
  };

  const calculateTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      icon: change > 0 ? TrendingUp : TrendingDown
    };
  };

  const resolutionRate = Math.round((analytics.thisMonth.resolved / analytics.thisMonth.totalReports) * 100);
  const reportsTrend = calculateTrend(analytics.thisMonth.totalReports, analytics.lastMonth.totalReports);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Performance metrics and insights for civic issue management
              </p>
            </div>
            
            <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="thisQuarter">This Quarter</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.thisMonth.totalReports}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <reportsTrend.icon className={`h-3 w-3 mr-1 ${reportsTrend.isPositive ? 'text-success' : 'text-destructive'}`} />
                  {reportsTrend.value}% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{resolutionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {analytics.thisMonth.resolved} of {analytics.thisMonth.totalReports} resolved
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.thisMonth.averageResolutionTime}</div>
                <p className="text-xs text-muted-foreground">
                  15% faster than last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{analytics.thisMonth.citizenSatisfaction}%</div>
                <p className="text-xs text-muted-foreground">
                  Based on citizen feedback
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reports by Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Reports by Type</span>
                </CardTitle>
                <CardDescription>
                  Distribution of issue types this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.reportsByType.map((item, index) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ 
                            backgroundColor: `hsl(${210 + index * 30}, 70%, 50%)` 
                          }}
                        />
                        <span className="font-medium">{item.type}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={item.trend.startsWith('+') ? 'success' : 'destructive'}
                          className="text-xs"
                        >
                          {item.trend}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reports by District */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Reports by District</span>
                </CardTitle>
                <CardDescription>
                  Geographic distribution of reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.reportsByDistrict.map((district) => {
                    const resolutionRate = Math.round((district.resolved / district.reports) * 100);
                    return (
                      <div key={district.district} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{district.district}</span>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-muted-foreground">
                              {district.reports} total
                            </span>
                            <Badge variant={resolutionRate >= 85 ? 'success' : 'warning'}>
                              {resolutionRate}% resolved
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              resolutionRate >= 85 ? 'bg-success' : 'bg-warning'
                            }`}
                            style={{ width: `${resolutionRate}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{district.resolved} resolved</span>
                          <span>{district.pending} pending</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Monthly Report Trend</span>
              </CardTitle>
              <CardDescription>
                Volume of reports received over the past 5 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {analytics.monthlyTrend.map((month, index) => {
                  const maxReports = Math.max(...analytics.monthlyTrend.map(m => m.reports));
                  const height = (month.reports / maxReports) * 200;
                  
                  return (
                    <div key={month.month} className="flex flex-col items-center flex-1">
                      <div className="text-xs text-muted-foreground mb-2">
                        {month.reports}
                      </div>
                      <div 
                        className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                        style={{ height: `${height}px` }}
                      />
                      <div className="text-xs font-medium mt-2">
                        {month.month}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;