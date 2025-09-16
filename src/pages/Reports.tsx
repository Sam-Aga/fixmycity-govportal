import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle,
  Users,
  Eye
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data - will be replaced with real data from Supabase
  const reports = [
    {
      id: "RPT-001",
      type: "Pothole",
      description: "Large pothole causing traffic issues on Main Street",
      location: "Main Street & 5th Ave",
      coordinates: "40.7589, -73.9851",
      status: "pending",
      priority: "high",
      submittedBy: "John Doe",
      dateSubmitted: "2024-01-15 14:30",
      assignedTo: "Road Maintenance Team",
      images: 3
    },
    {
      id: "RPT-002", 
      type: "Streetlight",
      description: "Malfunctioning streetlight creating safety hazard",
      location: "Park Avenue between 42nd & 43rd St",
      coordinates: "40.7549, -73.9840",
      status: "in-progress",
      priority: "medium",
      submittedBy: "Sarah Wilson", 
      dateSubmitted: "2024-01-15 10:15",
      assignedTo: "Electrical Department",
      images: 2
    },
    {
      id: "RPT-003",
      type: "Garbage Overflow",
      description: "Overflowing garbage bins attracting pests",
      location: "Central Park North Entrance",
      coordinates: "40.7829, -73.9654",
      status: "resolved",
      priority: "low",
      submittedBy: "Mike Johnson",
      dateSubmitted: "2024-01-14 16:45",
      assignedTo: "Sanitation Department",
      images: 1
    },
    {
      id: "RPT-004",
      type: "Water Leak",
      description: "Water leak causing flooding on sidewalk",
      location: "Broadway & 96th St",
      coordinates: "40.7934, -73.9697",
      status: "pending",
      priority: "high",
      submittedBy: "Anna Martinez",
      dateSubmitted: "2024-01-15 08:20",
      assignedTo: "Unassigned",
      images: 4
    }
  ];

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "in-progress": return <Users className="h-4 w-4" />;
      case "resolved": return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesType = typeFilter === "all" || report.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Reports Management</h1>
            <p className="text-muted-foreground">
              View, filter, and manage all civic issue reports
            </p>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filters & Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports by ID, description, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pothole">Potholes</SelectItem>
                    <SelectItem value="streetlight">Streetlights</SelectItem>
                    <SelectItem value="garbage overflow">Garbage</SelectItem>
                    <SelectItem value="water leak">Water Leaks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredReports.length} of {reports.length} reports
              </p>
            </div>
            
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {report.id}
                        </Badge>
                        <Badge variant={getStatusColor(report.status) as any} className="flex items-center space-x-1">
                          {getStatusIcon(report.status)}
                          <span>{report.status}</span>
                        </Badge>
                        <Badge variant={getPriorityColor(report.priority) as any}>
                          {report.priority} priority
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground">
                        {report.type}
                      </h3>
                      
                      <p className="text-muted-foreground">
                        {report.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{report.dateSubmitted}</span>
                        </div>
                      </div>
                    </div>

                    {/* Assignment Info */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Submitted By</p>
                        <p className="text-sm text-muted-foreground">{report.submittedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Assigned To</p>
                        <p className="text-sm text-muted-foreground">{report.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Attachments</p>
                        <p className="text-sm text-muted-foreground">{report.images} images</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                      {report.status === "pending" && (
                        <Button size="sm" className="w-full">
                          Assign Team
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;