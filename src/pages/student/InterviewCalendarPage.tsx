import React from 'react';
import { CalendarDays, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockInterviews = [
  {
    id: 1,
    company: 'TechCorp Inc',
    position: 'Frontend Developer',
    date: '2025-07-25',
    time: '10:00 AM'
  },
  {
    id: 2,
    company: 'DataNest Solutions',
    position: 'Data Scientist',
    date: '2025-07-28',
    time: '02:30 PM'
  }
];

export const InterviewCalendarPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Interview Calendar</h1>
        <p className="text-muted-foreground">
          View and manage your upcoming interviews.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>
            This section shows your scheduled interviews.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockInterviews.length > 0 ? (
            mockInterviews.map((interview) => (
              <div key={interview.id} className="p-4 border rounded-md flex justify-between items-center bg-muted/50">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{interview.company}</h3>
                  <p className="text-sm text-muted-foreground">{interview.position}</p>
                </div>
                <div className="text-right">
                  <p className="flex items-center gap-1 text-sm text-primary">
                    <CalendarDays className="w-4 h-4" />
                    {interview.date}
                  </p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {interview.time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No interviews scheduled yet.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="pt-4">
        <p className="text-sm text-muted-foreground mb-2 italic">
          (Future Enhancement: Integrate with <code>react-big-calendar</code> or <code>FullCalendar</code> to display a monthly view)
        </p>
        <Button variant="outline" className="text-sm">
          + Schedule New Interview
        </Button>
      </div>
    </div>
  );
};
