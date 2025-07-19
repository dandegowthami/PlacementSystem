import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  ArrowLeft,
  FileText,
  BookOpen,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const JobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Mock data - replace with actual API call based on id
  const job = {
    id: parseInt(id || '1'),
    title: 'Software Engineer',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹8-12 LPA',
    description: `We are looking for a skilled Software Engineer to join our dynamic team. You will be responsible for developing high-quality software solutions, collaborating with cross-functional teams, and contributing to the entire software development lifecycle.

Key Responsibilities:
• Develop and maintain web applications using modern technologies
• Collaborate with product managers and designers to implement user-friendly interfaces
• Write clean, efficient, and well-documented code
• Participate in code reviews and contribute to team knowledge sharing
• Debug and resolve technical issues in a timely manner
• Stay updated with emerging technologies and industry trends`,
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong proficiency in React.js and JavaScript/TypeScript',
      'Experience with Node.js and Express.js',
      'Knowledge of database systems (MySQL, MongoDB)',
      'Familiarity with version control systems (Git)',
      'Understanding of RESTful APIs and web services',
      'Good problem-solving and analytical skills',
      'Excellent communication and teamwork abilities'
    ],
    preferredSkills: [
      'Experience with cloud platforms (AWS, Azure)',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Familiarity with CI/CD pipelines',
      'Experience with testing frameworks',
      'Understanding of agile development methodologies'
    ],
    eligibility: { 
      minCGPA: 7.0, 
      branches: ['CSE', 'IT'],
      maxBacklogs: 2,
      passingYear: '2024'
    },
    deadline: '2024-02-15',
    applicants: 145,
    status: 'active',
    companyInfo: {
      about: 'TechCorp Solutions is a leading technology company specializing in innovative software solutions. We work with Fortune 500 companies to deliver cutting-edge applications and systems.',
      size: '500-1000 employees',
      founded: '2010',
      website: 'www.techcorp.com'
    },
    selectionProcess: [
      'Online Application Review',
      'Technical Assessment',
      'Technical Interview Round 1',
      'Technical Interview Round 2',
      'HR Interview',
      'Final Decision'
    ]
  };

  const handleApply = async () => {
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted!",
        description: "Your application has been successfully submitted. You will receive updates via email.",
      });
      setIsApplying(false);
      navigate('/student/applications');
    }, 2000);
  };

  const isEligible = () => {
    // Mock eligibility check
    return true;
  };

  const hasApplied = () => {
    // Mock check for existing application
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Overview */}
          <Card className="border-border shadow-elegant">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg font-medium">
                      {job.company}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={job.status === 'active' ? 'default' : 'secondary'} className="text-sm">
                  {job.status === 'active' ? 'Active' : 'Closed'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Deadline: {job.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.applicants} applicants</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                <div className="whitespace-pre-wrap text-muted-foreground">
                  {job.description}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Preferred Skills */}
          <Card className="border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Preferred Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.preferredSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selection Process */}
          <Card className="border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Selection Process</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {job.selectionProcess.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Section */}
          {user?.role === 'student' && (
            <Card className="border-border shadow-elegant">
              <CardHeader>
                <CardTitle>Apply for this position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEligible() ? (
                  <Badge variant="outline" className="text-success border-success w-full justify-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    You are eligible
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-destructive border-destructive w-full justify-center">
                    Not eligible
                  </Badge>
                )}

                {hasApplied() ? (
                  <Button disabled className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Already Applied
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-primary-glow"
                        disabled={!isEligible() || job.status !== 'active'}
                      >
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                          <Textarea
                            id="cover-letter"
                            placeholder="Tell us why you're the perfect fit for this role..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <Button 
                          onClick={handleApply}
                          disabled={isApplying}
                          className="w-full bg-gradient-to-r from-primary to-primary-glow"
                        >
                          {isApplying ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          )}

          {/* Eligibility Criteria */}
          <Card className="border-border shadow-elegant">
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Min CGPA</span>
                <span className="text-sm font-medium">{job.eligibility.minCGPA}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Branches</span>
                <span className="text-sm font-medium">{job.eligibility.branches.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Max Backlogs</span>
                <span className="text-sm font-medium">{job.eligibility.maxBacklogs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Passing Year</span>
                <span className="text-sm font-medium">{job.eligibility.passingYear}</span>
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card className="border-border shadow-elegant">
            <CardHeader>
              <CardTitle>About {job.company}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{job.companyInfo.about}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Company Size</span>
                  <span className="text-xs font-medium">{job.companyInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Founded</span>
                  <span className="text-xs font-medium">{job.companyInfo.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Website</span>
                  <span className="text-xs font-medium">{job.companyInfo.website}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};