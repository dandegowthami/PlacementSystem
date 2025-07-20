import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  Briefcase,
  MessageSquare,
  Settings
} from 'lucide-react';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'interview',
      title: 'Interview Scheduled - TechCorp Solutions',
      message: 'Your interview for Software Engineer position has been scheduled for Jan 25, 2024 at 10:00 AM.',
      timestamp: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Data Analyst at DataFlow Inc has been shortlisted for the next round.',
      timestamp: '5 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Application Deadline Reminder',
      message: 'The application deadline for Frontend Developer at WebCorp is approaching (3 days left).',
      timestamp: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'placement',
      title: 'New Job Posting',
      message: 'A new job posting for Full Stack Developer at InnovateTech has been added.',
      timestamp: '2 days ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Completion Reminder',
      message: 'Complete your profile to increase your chances of getting selected. Your profile is 85% complete.',
      timestamp: '3 days ago',
      read: true,
      priority: 'low'
    },
    {
      id: 6,
      type: 'interview',
      title: 'Interview Feedback Available',
      message: 'Feedback for your interview with CloudTech Systems is now available in your dashboard.',
      timestamp: '4 days ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 7,
      type: 'application',
      title: 'Application Rejected',
      message: 'Unfortunately, your application for Backend Developer at ServerTech was not selected.',
      timestamp: '5 days ago',
      read: true,
      priority: 'low'
    },
    {
      id: 8,
      type: 'placement',
      title: 'Mock Interview Available',
      message: 'Schedule a mock interview to improve your chances. Book your slot now.',
      timestamp: '1 week ago',
      read: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Calendar className="h-5 w-5 text-primary" />;
      case 'application':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'deadline':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'placement':
        return <Briefcase className="h-5 w-5 text-info" />;
      case 'system':
        return <Settings className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-destructive bg-destructive/5';
      case 'medium':
        return 'border-l-warning bg-warning/5';
      case 'low':
        return 'border-l-muted bg-muted/20';
      default:
        return 'border-l-border';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your application status and important announcements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {unreadCount} unread
          </Badge>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Notification Categories */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium">Interviews</div>
                <div className="text-xs text-muted-foreground">
                  {notifications.filter(n => n.type === 'interview').length} notifications
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <div className="text-sm font-medium">Applications</div>
                <div className="text-xs text-muted-foreground">
                  {notifications.filter(n => n.type === 'application').length} notifications
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-info" />
              <div>
                <div className="text-sm font-medium">Placements</div>
                <div className="text-xs text-muted-foreground">
                  {notifications.filter(n => n.type === 'placement').length} notifications
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-elegant">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div>
                <div className="text-sm font-medium">Reminders</div>
                <div className="text-xs text-muted-foreground">
                  {notifications.filter(n => n.type === 'deadline').length} notifications
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`border-border shadow-elegant border-l-4 ${getPriorityColor(notification.priority)} ${
              !notification.read ? 'ring-1 ring-primary/20' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block" />
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          notification.priority === 'high' ? 'border-destructive text-destructive' :
                          notification.priority === 'medium' ? 'border-warning text-warning' :
                          'border-muted-foreground text-muted-foreground'
                        }`}
                      >
                        {notification.priority}
                      </Badge>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card className="border-border shadow-elegant">
          <CardContent className="py-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};