import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, Building, MapPin, DollarSign, Eye, Edit, Trash2, Plus, CheckCircle, XCircle } from "lucide-react";

interface JobDrive {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: "campus" | "pool" | "virtual";
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  date: string;
  registrationDeadline: string;
  location: string;
  package: { min: number; max: number };
  positions: number;
  applicants: number;
  shortlisted: number;
  selected: number;
  eligibility: {
    branches: string[];
    minCGPA: number;
    maxBacklogs: number;
  };
  rounds: string[];
  coordinator: string;
}

const mockJobDrives: JobDrive[] = [
  {
    id: "1",
    title: "Software Engineer Recruitment",
    company: "TechCorp Inc.",
    type: "campus",
    status: "upcoming",
    date: "2024-02-15",
    registrationDeadline: "2024-02-10",
    location: "Main Campus",
    package: { min: 8, max: 12 },
    positions: 15,
    applicants: 45,
    shortlisted: 0,
    selected: 0,
    eligibility: {
      branches: ["Computer Science", "Information Technology"],
      minCGPA: 7.0,
      maxBacklogs: 2
    },
    rounds: ["Online Test", "Technical Interview", "HR Interview"],
    coordinator: "Prof. John Smith"
  },
  {
    id: "2",
    title: "Graduate Trainee Program",
    company: "InnovateSoft",
    type: "virtual",
    status: "ongoing",
    date: "2024-01-25",
    registrationDeadline: "2024-01-20",
    location: "Virtual",
    package: { min: 6, max: 10 },
    positions: 20,
    applicants: 65,
    shortlisted: 25,
    selected: 8,
    eligibility: {
      branches: ["Computer Science", "Information Technology", "Electronics"],
      minCGPA: 6.5,
      maxBacklogs: 3
    },
    rounds: ["Aptitude Test", "Technical Round", "Final Interview"],
    coordinator: "Dr. Sarah Johnson"
  },
  {
    id: "3",
    title: "Data Analyst Position",
    company: "DataSystems Ltd.",
    type: "campus",
    status: "completed",
    date: "2024-01-15",
    registrationDeadline: "2024-01-10",
    location: "Seminar Hall",
    package: { min: 10, max: 15 },
    positions: 8,
    applicants: 32,
    shortlisted: 12,
    selected: 6,
    eligibility: {
      branches: ["Computer Science", "Information Technology", "Mathematics"],
      minCGPA: 8.0,
      maxBacklogs: 1
    },
    rounds: ["Written Test", "Technical Interview", "Case Study", "HR Round"],
    coordinator: "Prof. Mike Davis"
  }
];

export const AdminJobDrives = () => {
  const { toast } = useToast();
  const [jobDrives, setJobDrives] = useState<JobDrive[]>(mockJobDrives);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredDrives = jobDrives.filter(drive => {
    const matchesSearch = drive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.coordinator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || drive.status === statusFilter;
    const matchesType = typeFilter === "all" || drive.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "ongoing": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "campus": return "bg-purple-100 text-purple-800";
      case "virtual": return "bg-cyan-100 text-cyan-800";
      case "pool": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const updateDriveStatus = (driveId: string, newStatus: JobDrive["status"]) => {
    setJobDrives(prev => 
      prev.map(drive => 
        drive.id === driveId 
          ? { ...drive, status: newStatus }
          : drive
      )
    );
    
    toast({
      title: "Drive Status Updated",
      description: `Job drive status has been changed to ${newStatus}`,
    });
  };

  const deleteDrive = (driveId: string) => {
    setJobDrives(prev => prev.filter(drive => drive.id !== driveId));
    toast({
      title: "Job Drive Deleted",
      description: "Job drive has been removed from the system",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Drives Management</h1>
          <p className="text-muted-foreground">Manage placement drives and recruitment events</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Drive
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by company, position, or coordinator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="campus">Campus</SelectItem>
            <SelectItem value="virtual">Virtual</SelectItem>
            <SelectItem value="pool">Pool Campus</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{jobDrives.length}</div>
            <p className="text-sm text-muted-foreground">Total Drives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {jobDrives.filter(d => d.status === "upcoming").length}
            </div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {jobDrives.filter(d => d.status === "ongoing").length}
            </div>
            <p className="text-sm text-muted-foreground">Ongoing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {jobDrives.filter(d => d.status === "completed").length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Drives List */}
      <div className="grid gap-6">
        {filteredDrives.map((drive) => (
          <Card key={drive.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{drive.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {drive.company}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(drive.status)}>
                    {drive.status}
                  </Badge>
                  <Badge className={getTypeColor(drive.type)}>
                    {drive.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{drive.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{drive.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>₹{drive.package.min}-{drive.package.max} LPA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{drive.positions} positions</span>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{drive.applicants}</div>
                  <p className="text-sm text-muted-foreground">Applicants</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{drive.shortlisted}</div>
                  <p className="text-sm text-muted-foreground">Shortlisted</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{drive.selected}</div>
                  <p className="text-sm text-muted-foreground">Selected</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {drive.applicants > 0 ? Math.round((drive.selected / drive.applicants) * 100) : 0}%
                  </div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>

              {/* Eligibility & Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Branches: {drive.eligibility.branches.join(", ")}</p>
                    <p>Min CGPA: {drive.eligibility.minCGPA}</p>
                    <p>Max Backlogs: {drive.eligibility.maxBacklogs}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Selection Process</h4>
                  <div className="flex flex-wrap gap-1">
                    {drive.rounds.map((round, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {round}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Coordinator: {drive.coordinator}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Registration Deadline: {drive.registrationDeadline}
                </div>
                
                <div className="flex gap-2">
                  {drive.status === "upcoming" && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => updateDriveStatus(drive.id, "ongoing")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Start Drive
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => updateDriveStatus(drive.id, "cancelled")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {drive.status === "ongoing" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-gray-600 hover:text-gray-700"
                      onClick={() => updateDriveStatus(drive.id, "completed")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Complete
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteDrive(drive.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDrives.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No Job Drives Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                ? "No drives match your current filters"
                : "No job drives scheduled yet"}
            </p>
            <Button>
              Schedule First Drive
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};