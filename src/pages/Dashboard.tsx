import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  MapPin,
  TrendingUp,
  Calendar,
  BarChart3,
  Eye
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - will be replaced with real data from Supabase
  const stats = {
    totalReports: 1247,
    pendingReports: 84,
    resolvedReports: 1163,
    activeOfficials: 23
  };

  const recentReports = [
    {
      id: "RPT-001",
      type: "Pothole",
      location: "Main Street & 5th Ave",
      status: "pending",
      priority: "high",
      dateSubmitted: "2 hours ago"
    },
    {
      id: "RPT-002", 
      type: "Streetlight",
      location: "Park Avenue",
      status: "in-progress",
      priority: "medium",
      dateSubmitted: "4 hours ago"
    },
    {
      id: "RPT-003",
      type: "Garbage Overflow",
      location: "Central Park North",
      status: "resolved",
      priority: "low",
      dateSubmitted: "1 day ago"
    }
  ];

  const handleViewAllReports = () => {
    navigate("/reports");
  };

  const handleViewReport = (reportId: string) => {
    toast.success(`Viewing report ${reportId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "destructive";
      case "in-progress": return "warning";
      case "resolved": return "success";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Monitor and manage civic issue reports across the city
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalReports}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{stats.pendingReports}</div>
                <p className="text-xs text-muted-foreground">
                  Require immediate attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{stats.resolvedReports}</div>
                <p className="text-xs text-muted-foreground">
                  93.3% resolution rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Officials</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeOfficials}</div>
                <p className="text-xs text-muted-foreground">
                  Currently online
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>
                    Latest civic issues submitted by citizens
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewAllReports}>
                  View All Reports
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-full">
                        {report.type === "Pothole" && <AlertTriangle className="h-4 w-4" />}
                        {report.type === "Streetlight" && <AlertTriangle className="h-4 w-4" />}
                        {report.type === "Garbage Overflow" && <AlertTriangle className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{report.id}</span>
                          <Badge variant={getStatusColor(report.status) as any}>
                            {report.status}
                          </Badge>
                          <Badge variant={getPriorityColor(report.priority) as any}>
                            {report.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {report.type} - {report.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{report.dateSubmitted}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewReport(report.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;