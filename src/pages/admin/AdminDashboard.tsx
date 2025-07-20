import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Building2,
  FileText,
  Calendar,
  Settings,
  Download,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
<<<<<<< HEAD
import {  Settings as SettingsIcon } from 'lucide-react';

import dashboardPreview from '@/assets/dashboard-preview.jpg';
import { Link } from 'react-router-dom';
=======
import dashboardPreview from '@/assets/dashboard-preview.jpg';
>>>>>>> caabc2acc5ab5c4223b6884a1ae572faa0399306

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const stats = {
    totalStudents: 1247,
    activeRecruiters: 28,
    activePlacements: 12,
    placementRate: 78,
    totalApplications: 2145,
    scheduledInterviews: 89
  };

  const placementDrives = [
    { 
      id: 1, 
      company: 'TechCorp Solutions', 
      positions: ['Software Engineer', 'Data Analyst'], 
      applications: 156, 
      status: 'active',
      deadline: '2024-02-15'
    },
    { 
      id: 2, 
      company: 'DataFlow Inc', 
      positions: ['Backend Developer'], 
      applications: 89, 
      status: 'active',
      deadline: '2024-02-20'
    },
    { 
      id: 3, 
      company: 'CloudTech Systems', 
      positions: ['DevOps Engineer', 'Cloud Architect'], 
      applications: 124, 
      status: 'completed',
      deadline: '2024-01-30'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'registration', description: 'New recruiter registration: Microsoft Corp', time: '2 hours ago' },
    { id: 2, type: 'application', description: '45 new applications for Google SWE role', time: '4 hours ago' },
    { id: 3, type: 'interview', description: 'Interview scheduled for Amazon positions', time: '6 hours ago' },
    { id: 4, type: 'placement', description: '3 students placed at TechCorp Solutions', time: '1 day ago' }
  ];

  const departmentStats = [
    { department: 'Computer Science', students: 420, placed: 340, rate: 81 },
    { department: 'Information Technology', students: 380, placed: 285, rate: 75 },
    { department: 'Electronics', students: 320, placed: 240, rate: 75 },
    { department: 'Mechanical', students: 127, placed: 89, rate: 70 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage the entire placement system and track analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary-glow">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border shadow-elegant col-span-2 lg:col-span-1">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Placement Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <img 
              src={dashboardPreview} 
              alt="Analytics Preview" 
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.placementRate}%</div>
              <p className="text-sm text-muted-foreground">Overall Placement Rate</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          <Card className="border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Registered students</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Recruiters</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.activeRecruiters}</div>
              <p className="text-xs text-muted-foreground">Companies recruiting</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">Total this year</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.scheduledInterviews}</div>
              <p className="text-xs text-muted-foreground">Scheduled this month</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Placement Drives */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle>Active Placement Drives</CardTitle>
            <CardDescription>Currently running recruitment drives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {placementDrives.map((drive) => (
              <div key={drive.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{drive.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {drive.positions.join(', ')}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={drive.status === 'active' ? 'default' : 'secondary'}>
                    {drive.status === 'active' ? 'Active' : 'Completed'}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{drive.applications} applications</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Manage All Drives
            </Button>
          </CardContent>
        </Card>

        {/* Department-wise Stats */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Placement statistics by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{dept.department}</span>
                  <span className="text-sm text-muted-foreground">{dept.rate}%</span>
                </div>
                <Progress value={dept.rate} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{dept.placed} placed</span>
                  <span>{dept.students} total</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="border-border shadow-elegant">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest system activities and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-border shadow-elegant">
<<<<<<< HEAD
  <CardHeader>
    <CardTitle>Administrative Actions</CardTitle>
    <CardDescription>Common administrative tasks</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid gap-4 md:grid-cols-4">
      
      <Link to="/admin/verify-users">
        <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6 w-full">
          <UserCheck className="h-6 w-6 text-primary" />
          <span>Verify Users</span>
        </Button>
      </Link>

      <Link to="/admin/manage-drives">
        <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6 w-full">
          <Briefcase className="h-6 w-6 text-primary" />
          <span>Manage Drives</span>
        </Button>
      </Link>

      <Link to="/admin/view-analytics">
        <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6 w-full">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span>View Analytics</span>
        </Button>
      </Link>

      <Link to="/admin/export-report">
        <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6 w-full">
          <FileText className="h-6 w-6 text-primary" />
          <span>Export Report</span>
        </Button>
      </Link>

      <Link to="/admin/settings">
        <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6 w-full">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <span>Settings</span>
        </Button>
      </Link>

    </div>
  </CardContent>
</Card>

=======
        <CardHeader>
          <CardTitle>Administrative Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6">
              <UserCheck className="h-6 w-6 text-primary" />
              <span>Verify Users</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <span>Manage Drives</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 p-6">
              <FileText className="h-6 w-6 text-primary" />
              <span>Generate Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
>>>>>>> caabc2acc5ab5c4223b6884a1ae572faa0399306
    </div>
  );
};