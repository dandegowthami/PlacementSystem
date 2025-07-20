import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Plus,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const stats = {
    activeJobs: 5,
    totalApplications: 142,
    interviewsScheduled: 18,
    candidatesHired: 3
  };

  const jobListings = [
    { 
      id: 1, 
      title: 'Software Engineer', 
      applications: 45, 
      status: 'active', 
      deadline: '2024-02-15',
      shortlisted: 12
    },
    { 
      id: 2, 
      title: 'Data Analyst', 
      applications: 32, 
      status: 'active', 
      deadline: '2024-02-20',
      shortlisted: 8
    },
    { 
      id: 3, 
      title: 'Frontend Developer', 
      applications: 28, 
      status: 'closed', 
      deadline: '2024-01-30',
      shortlisted: 6
    }
  ];

  const recentApplications = [
    { id: 1, name: 'Alice Johnson', position: 'Software Engineer', appliedDate: '2024-01-18', cgpa: 8.5 },
    { id: 2, name: 'Bob Smith', position: 'Data Analyst', appliedDate: '2024-01-18', cgpa: 8.2 },
    { id: 3, name: 'Carol Brown', position: 'Software Engineer', appliedDate: '2024-01-17', cgpa: 9.1 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Recruiter Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your job postings and track applications
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-glow">
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">Currently posting</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Total received</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.interviewsScheduled}</div>
            <p className="text-xs text-muted-foreground">Scheduled this week</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.candidatesHired}</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Listings */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle>My Job Postings</CardTitle>
            <CardDescription>Manage your active and closed job listings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobListings.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.applications} applications • {job.shortlisted} shortlisted
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                    {job.status === 'active' ? 'Active' : 'Closed'}
                  </Badge>
                  <p className="text-xs text-muted-foreground">Due: {job.deadline}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Job Postings
            </Button>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest candidate applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {app.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{app.name}</p>
                    <p className="text-sm text-muted-foreground">{app.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">CGPA: {app.cgpa}</p>
                  <p className="text-xs text-muted-foreground">{app.appliedDate}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              Review All Applications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border shadow-elegant">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common recruiting tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6">
              <Plus className="h-6 w-6 text-primary" />
              <span>Create Job Post</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6">
              <Users className="h-6 w-6 text-primary" />
              <span>View Candidates</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6">
              <Calendar className="h-6 w-6 text-primary" />
              <span>Schedule Interview</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span>Shortlist Candidates</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};