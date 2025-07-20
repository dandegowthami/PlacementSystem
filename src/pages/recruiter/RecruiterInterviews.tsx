import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MapPin, Edit, Trash2, Plus } from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: "online" | "offline" | "phone";
  location?: string;
  meetingLink?: string;
  interviewer: string;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  round: number;
  notes?: string;
}

const mockInterviews: Interview[] = [
  {
    id: "1",
    candidateName: "John Doe",
    candidateEmail: "john.doe@college.edu",
    jobTitle: "Software Engineer",
    date: "2024-01-25",
    time: "10:00 AM",
    duration: 60,
    type: "online",
    meetingLink: "https://meet.google.com/abc-def-ghi",
    interviewer: "Alice Johnson",
    status: "scheduled",
    round: 1
  },
  {
    id: "2",
    candidateName: "Jane Smith",
    candidateEmail: "jane.smith@college.edu",
    jobTitle: "Frontend Developer",
    date: "2024-01-24",
    time: "2:00 PM",
    duration: 45,
    type: "offline",
    location: "Conference Room A",
    interviewer: "Bob Wilson",
    status: "completed",
    round: 1,
    notes: "Strong technical skills, good communication"
  },
  {
    id: "3",
    candidateName: "Mike Johnson",
    candidateEmail: "mike.johnson@college.edu",
    jobTitle: "Backend Developer",
    date: "2024-01-26",
    time: "11:00 AM",
    duration: 90,
    type: "online",
    meetingLink: "https://zoom.us/j/123456789",
    interviewer: "Carol Davis",
    status: "scheduled",
    round: 2
  }
];

export const RecruiterInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || interview.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === "today") {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = interview.date === today;
    } else if (dateFilter === "upcoming") {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = interview.date >= today;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "rescheduled": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "online": return <Video className="h-4 w-4" />;
      case "offline": return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const updateInterviewStatus = (interviewId: string, newStatus: Interview["status"]) => {
    setInterviews(prev => 
      prev.map(interview => 
        interview.id === interviewId 
          ? { ...interview, status: newStatus }
          : interview
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interview Management</h1>
          <p className="text-muted-foreground">Schedule and manage candidate interviews</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by candidate, job, or interviewer..."
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
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="rescheduled">Rescheduled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{interviews.length}</div>
            <p className="text-sm text-muted-foreground">Total Interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {interviews.filter(i => i.status === "scheduled").length}
            </div>
            <p className="text-sm text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {interviews.filter(i => i.status === "completed").length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {interviews.filter(i => i.status === "rescheduled").length}
            </div>
            <p className="text-sm text-muted-foreground">Rescheduled</p>
          </CardContent>
        </Card>
      </div>

      {/* Interviews List */}
      <div className="grid gap-4">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {interview.candidateName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{interview.candidateName}</CardTitle>
                    <CardDescription>
                      {interview.jobTitle} • Round {interview.round}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{interview.time} ({interview.duration}min)</span>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeIcon(interview.type)}
                  <span className="capitalize">{interview.type}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Interviewer:</span>
                  <span className="ml-2">{interview.interviewer}</span>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">{interview.candidateEmail}</span>
                </div>
              </div>

              {interview.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{interview.location}</span>
                </div>
              )}

              {interview.meetingLink && (
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={interview.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Join Meeting
                  </a>
                </div>
              )}

              {interview.notes && (
                <div className="p-3 bg-muted rounded-lg">
                  <span className="font-medium">Notes:</span>
                  <p className="mt-1 text-sm">{interview.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {interview.status === "scheduled" && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateInterviewStatus(interview.id, "completed")}
                    >
                      Mark Complete
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateInterviewStatus(interview.id, "rescheduled")}
                    >
                      Reschedule
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInterviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No Interviews Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                ? "No interviews match your current filters"
                : "No interviews scheduled yet"}
            </p>
            <Button>
              Schedule First Interview
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};