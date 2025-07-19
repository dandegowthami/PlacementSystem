import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  GraduationCap,
  FileText,
  Upload,
  Plus,
  X,
  Award,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StudentProfile: React.FC = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@college.edu',
      phone: '+91 9876543210',
      dateOfBirth: '2001-05-15',
      address: '123 College Street, City, State - 123456',
      linkedinUrl: 'https://linkedin.com/in/johndoe'
    },
    academicInfo: {
      studentId: 'CS2021001',
      branch: 'Computer Science Engineering',
      currentYear: '4th Year',
      cgpa: '8.5',
      passingYear: '2024',
      backlogs: '0',
      tenthMarks: '92%',
      twelfthMarks: '88%'
    },
    skills: ['JavaScript', 'React.js', 'Node.js', 'Python', 'SQL', 'Git'],
    projects: [
      {
        id: 1,
        title: 'E-commerce Website',
        description: 'Full-stack e-commerce platform built with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        githubUrl: 'https://github.com/johndoe/ecommerce',
        liveUrl: 'https://myecommerce.vercel.app'
      }
    ],
    experience: [
      {
        id: 1,
        company: 'TechStart Inc.',
        position: 'Frontend Developer Intern',
        duration: 'Jun 2023 - Aug 2023',
        description: 'Developed responsive web applications using React.js and worked on improving user experience.'
      }
    ],
    achievements: ['Winner - College Hackathon 2023', 'Best Project Award - Final Year'],
    resume: {
      fileName: 'John_Doe_Resume.pdf',
      uploadDate: '2024-01-10',
      size: '2.1 MB'
    }
  });

  const [newSkill, setNewSkill] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const calculateProfileCompletion = () => {
    const sections = [
      profileData.personalInfo.name,
      profileData.personalInfo.email,
      profileData.personalInfo.phone,
      profileData.academicInfo.cgpa,
      profileData.skills.length > 0,
      profileData.projects.length > 0,
      profileData.resume.fileName
    ];
    
    const completedSections = sections.filter(Boolean).length;
    return Math.round((completedSections / sections.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal and academic information</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium">Profile Completion</div>
            <div className="text-2xl font-bold text-primary">{profileCompletion}%</div>
          </div>
          <Progress value={profileCompletion} className="w-24" />
          <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={isEditing ? "bg-gradient-to-r from-primary to-primary-glow" : ""}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.personalInfo.name}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, name: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.personalInfo.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.personalInfo.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={profileData.personalInfo.dateOfBirth}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={profileData.personalInfo.address}
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, address: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                value={profileData.personalInfo.linkedinUrl}
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, linkedinUrl: e.target.value }
                }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>Academic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={profileData.academicInfo.studentId}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Select 
                  value={profileData.academicInfo.branch} 
                  disabled={!isEditing}
                  onValueChange={(value) => setProfileData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, branch: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science Engineering">Computer Science Engineering</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year">Current Year</Label>
                <Select 
                  value={profileData.academicInfo.currentYear} 
                  disabled={!isEditing}
                  onValueChange={(value) => setProfileData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, currentYear: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cgpa">CGPA</Label>
                <Input
                  id="cgpa"
                  value={profileData.academicInfo.cgpa}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, cgpa: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="passingYear">Passing Year</Label>
                <Input
                  id="passingYear"
                  value={profileData.academicInfo.passingYear}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, passingYear: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="backlogs">Active Backlogs</Label>
                <Input
                  id="backlogs"
                  value={profileData.academicInfo.backlogs}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, backlogs: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="tenth">10th Marks</Label>
                <Input
                  id="tenth"
                  value={profileData.academicInfo.tenthMarks}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, tenthMarks: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="twelfth">12th Marks</Label>
                <Input
                  id="twelfth"
                  value={profileData.academicInfo.twelfthMarks}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    academicInfo: { ...prev.academicInfo, twelfthMarks: e.target.value }
                  }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Skills</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resume */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Resume</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData.resume.fileName ? (
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{profileData.resume.fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded on {profileData.resume.uploadDate} • {profileData.resume.size}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">No resume uploaded</p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX. Maximum size: 5MB
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects and Experience - Full Width */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Projects */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span>Projects</span>
              </div>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData.projects.map((project) => (
              <div key={project.id} className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-4 mt-3">
                  <a href={project.githubUrl} className="text-sm text-primary hover:underline">
                    GitHub
                  </a>
                  <a href={project.liveUrl} className="text-sm text-primary hover:underline">
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="border-border shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span>Experience</span>
              </div>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData.experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-sm font-medium text-primary">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.duration}</p>
                <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};