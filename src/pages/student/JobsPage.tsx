import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Simulated API call
    setJobs([
      {
        id: '1',
        title: 'Frontend Developer',
        company: 'TechCorp',
        location: 'Remote',
        description: 'Work on modern React apps.',
      },
      {
        id: '2',
        title: 'Backend Developer',
        company: 'CodeBase Inc.',
        location: 'Bangalore',
        description: 'Node.js and API development.',
      },
    ]);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
            <p className="mt-2">{job.description}</p>
            <Button className="mt-4">Apply Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobsPage;