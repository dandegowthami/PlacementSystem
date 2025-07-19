import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Search,
  Filter,
  Download,
  Eye
} from 'lucide-react';

export const StudentApplications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const applications = [
    {
      id: 1,
      jobTitle: 'Software Engineer',
      company: 'TechCorp Solutions',
      appliedDate: '2024-01-15',
      status: 'interview_scheduled',
      interviewDate: '2024-01-25',
      interviewTime: '10:00 AM',
      feedback: 'Your technical skills look promising. Good luck!',
      nextStep: 'Technical Interview Round 1'
    },
    {
      id: 2,
      jobTitle: 'Data Analyst',
      company: 'DataFlow Inc',
      appliedDate: '2024-01-12',
      status: 'shortlisted',
      feedback: 'Congratulations! You have been shortlisted for the next round.',
      nextStep: 'Waiting for interview schedule'
    },
    {
      id: 3,
      jobTitle: 'Backend Developer',
      company: 'CloudTech Systems',
      appliedDate: '2024-01-10',
      status: 'pending',
      feedback: 'Application under review',
      nextStep: 'Application review in progress'
    },
    {
      id: 4,
      jobTitle: 'Frontend Developer',
      company: 'WebCorp',
      appliedDate: '2024-01-08',
      status: 'rejected',
      feedback: 'Thank you for your interest. Unfortunately, we have decided to move forward with other candidates.',
      nextStep: 'Application closed'
    },
    {
      id: 5,
      jobTitle: 'Full Stack Developer',
      company: 'InnovateTech',
      appliedDate: '2024-01-05',
      status: 'selected',
      feedback: 'Congratulations! You have been selected for the position.',
      nextStep: 'Offer letter to be sent'
    }
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
      case 'selected':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'Under Review',
      'shortlisted': 'Shortlisted',
      'interview_scheduled': 'Interview Scheduled',
      'rejected': 'Rejected',
      'selected': 'Selected'
    };
    return statusMap[status] || status;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'selected':
        return 'default';
      case 'shortlisted':
      case 'interview_scheduled':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    shortlisted: applications.filter(app => app.status === 'shortlisted').length,
    interview_scheduled: applications.filter(app => app.status === 'interview_scheduled').length,
    selected: applications.filter(app => app.status === 'selected').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
          <p className="text-muted-foreground">Track all your job applications and their status</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{statusCounts.all}</div>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{statusCounts.pending}</div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{statusCounts.shortlisted}</div>
              <p className="text-xs text-muted-foreground">Shortlisted</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{statusCounts.interview_scheduled}</div>
              <p className="text-xs text-muted-foreground">Interviews</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{statusCounts.selected}</div>
              <p className="text-xs text-muted-foreground">Selected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{statusCounts.rejected}</div>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-border shadow-elegant">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="selected">Selected</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="border-border shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{application.jobTitle}</CardTitle>
                    <CardDescription>{application.company}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(application.status)}
                  <Badge variant={getStatusVariant(application.status)}>
                    {getStatusText(application.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Applied on: {application.appliedDate}</span>
                  </div>
                  {application.interviewDate && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Interview: {application.interviewDate} at {application.interviewTime}</span>
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="font-medium">Next Step: </span>
                    <span className="text-muted-foreground">{application.nextStep}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium">Feedback:</span>
                    <p className="text-sm text-muted-foreground mt-1">{application.feedback}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card className="border-border shadow-elegant">
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No applications found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria.'
                : 'You haven\'t applied for any jobs yet.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};