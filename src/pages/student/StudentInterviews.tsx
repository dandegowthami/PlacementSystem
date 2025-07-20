import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Video, Phone } from "lucide-react";

interface Interview {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  type: "online" | "offline" | "phone";
  location?: string;
  meetingLink?: string;
  interviewer: string;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  round: number;
}

const mockInterviews: Interview[] = [
  {
    id: "1",
    jobTitle: "Software Engineer",
    company: "TechCorp",
    date: "2024-01-25",
    time: "10:00 AM",
    type: "online",
    meetingLink: "https://meet.google.com/abc-def-ghi",
    interviewer: "John Smith",
    status: "scheduled",
    round: 1
  },
  {
    id: "2",
    jobTitle: "Frontend Developer",
    company: "WebSolutions",
    date: "2024-01-22",
    time: "2:00 PM",
    type: "offline",
    location: "Main Campus, Room 101",
    interviewer: "Sarah Johnson",
    status: "completed",
    round: 2
  }
];

export const StudentInterviews = () => {
  const [interviews] = useState<Interview[]>(mockInterviews);

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
      case "phone": return <Phone className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Interviews</h1>
          <p className="text-muted-foreground">Manage your scheduled interviews</p>
        </div>
      </div>

      <div className="grid gap-6">
        {interviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{interview.jobTitle}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {interview.company}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status}
                  </Badge>
                  <Badge variant="outline">Round {interview.round}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeIcon(interview.type)}
                  <span className="capitalize">{interview.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Interviewer:</span>
                  <span>{interview.interviewer}</span>
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

              <div className="flex gap-2 pt-4">
                {interview.status === "scheduled" && (
                  <>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    {interview.meetingLink && (
                      <Button size="sm">
                        Join Interview
                      </Button>
                    )}
                  </>
                )}
                {interview.status === "completed" && (
                  <Button variant="outline" size="sm">
                    View Feedback
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {interviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No Interviews Scheduled</h3>
            <p className="text-muted-foreground">Your upcoming interviews will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};