import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

import { 
  Briefcase, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Bell,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();


  // Mock data - replace with actual API calls
  const stats = {
    applicationsSubmitted: 8,
    interviewsScheduled: 3,
    offersReceived: 1,
    profileCompletion: 85
  };

  const applications = [
    { id: 1, company: 'TechCorp Solutions', position: 'Software Engineer', status: 'pending', appliedDate: '2024-01-15' },
    { id: 2, company: 'DataFlow Inc', position: 'Data Analyst', status: 'shortlisted', appliedDate: '2024-01-12' },
    { id: 3, company: 'CloudTech Systems', position: 'Backend Developer', status: 'interview_scheduled', appliedDate: '2024-01-10' }
  ];

  const upcomingInterviews = [
    { id: 1, company: 'DataFlow Inc', position: 'Data Analyst', date: '2024-01-20', time: '10:00 AM' },
    { id: 2, company: 'CloudTech Systems', position: 'Backend Developer', date: '2024-01-22', time: '2:00 PM' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'shortlisted':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'interview_scheduled':
        return <Calendar className="h-4 w-4 text-primary" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Track your placement progress and manage applications
          </p>
        </div>
        <Button 
          className="bg-gradient-to-r from-primary to-primary-glow"
          onClick={() => navigate( '/notifications')}
        >
          <Bell className="mr-2 h-4 w-4" />
          View Notifications
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.applicationsSubmitted}</div>
            <p className="text-xs text-muted-foreground">Applications submitted</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.interviewsScheduled}</div>
            <p className="text-xs text-muted-foreground">Scheduled interviews</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.offersReceived}</div>
            <p className="text-xs text-muted-foreground">Job offers received</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.profileCompletion}%</div>
            <p className="text-xs text-muted-foreground">Profile completed</p>
            <Progress value={stats.profileCompletion} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Applications */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your latest job applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(app.status)}
                  <div>
                    <p className="font-medium text-foreground">{app.company}</p>
                    <p className="text-sm text-muted-foreground">{app.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">
                    {getStatusText(app.status)}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{app.appliedDate}</p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/student/applications'}
            >
              View All Applications
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled interviews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-accent/50">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{interview.company}</p>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{interview.date}</p>
                  <p className="text-xs text-muted-foreground">{interview.time}</p>
                </div>
              </div>
            ))}
            {upcomingInterviews.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No upcoming interviews scheduled
              </p>
            )}
            <Button variant="outline" className="w-full">
              View Interview Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border shadow-elegant">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center space-y-2 p-6"
              onClick={() => navigate('/jobs')}
            >
              <Briefcase className="h-6 w-6 text-primary" />
              <span>Browse Jobs</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center space-y-2 p-6"
              onClick={() => navigate('/student/profile')}
            >
              <FileText className="h-6 w-6 text-primary" />
              <span>Update Profile</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6"
            onClick={() => navigate('/student/interview-calendar')}>
              <Calendar className="h-6 w-6 text-primary" />
              <span>Schedule Mock Interview</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};