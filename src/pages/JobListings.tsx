import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign,
  Search,
  Filter,
  Calendar,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const JobListings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data - replace with actual API calls
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'TechCorp Solutions',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹8-12 LPA',
      description: 'We are looking for a skilled Software Engineer to join our team...',
      requirements: ['Bachelor\'s in Computer Science', 'React.js', 'Node.js'],
      eligibility: { minCGPA: 7.0, branches: ['CSE', 'IT'] },
      deadline: '2024-02-15',
      applicants: 145,
      status: 'active'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'DataFlow Inc',
      location: 'Mumbai, India',
      type: 'Full-time',
      salary: '₹6-10 LPA',
      description: 'Join our data analytics team to drive business insights...',
      requirements: ['Bachelor\'s in any field', 'Python', 'SQL', 'Power BI'],
      eligibility: { minCGPA: 6.5, branches: ['CSE', 'IT', 'ECE'] },
      deadline: '2024-02-20',
      applicants: 89,
      status: 'active'
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'CloudTech Systems',
      location: 'Hyderabad, India',
      type: 'Full-time',
      salary: '₹7-11 LPA',
      description: 'Create amazing user experiences with modern frontend technologies...',
      requirements: ['Bachelor\'s in Computer Science', 'React.js', 'TypeScript'],
      eligibility: { minCGPA: 7.5, branches: ['CSE', 'IT'] },
      deadline: '2024-01-30',
      applicants: 67,
      status: 'closed'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || 
                             job.eligibility.branches.some(branch => 
                               branch.toLowerCase().includes(selectedDepartment.toLowerCase())
                             );
    return matchesSearch && matchesDepartment;
  });

  const handleJobClick = (jobId: number) => {
    navigate(`/job/${jobId}`);
  };

  const isEligible = (job: any) => {
    // Mock eligibility check - replace with actual logic
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Opportunities</h1>
          <p className="text-muted-foreground">Browse and apply for available positions</p>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="border-border shadow-elegant">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cse">Computer Science</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="ece">Electronics & Communication</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Job Cards */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card 
            key={job.id} 
            className="border-border shadow-elegant hover:shadow-glow transition-all duration-300 cursor-pointer"
            onClick={() => handleJobClick(job.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="text-base font-medium">
                      {job.company}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                    {job.status === 'active' ? 'Active' : 'Closed'}
                  </Badge>
                  {isEligible(job) ? (
                    <Badge variant="outline" className="text-success border-success">Eligible</Badge>
                  ) : (
                    <Badge variant="outline" className="text-destructive border-destructive">Not Eligible</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground line-clamp-2">{job.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{job.applicants} applicants</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.requirements.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-muted-foreground">
                    Min CGPA: {job.eligibility.minCGPA} • Branches: {job.eligibility.branches.join(', ')}
                  </div>
                  {user?.role === 'student' && job.status === 'active' && (
                    <Button 
                      className="bg-gradient-to-r from-primary to-primary-glow"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle apply logic
                      }}
                      disabled={!isEligible(job)}
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="border-border shadow-elegant">
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};