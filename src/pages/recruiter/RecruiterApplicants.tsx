import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { Eye, Download, Check, X, Calendar, GraduationCap, Star } from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  cgpa: number;
  branch: string;
  graduationYear: number;
  skills: string[];
  appliedDate: string;
  status: "pending" | "shortlisted" | "rejected" | "interview-scheduled";
  resumeUrl?: string;
  portfolio?: string;
}

const mockApplicants: Applicant[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@college.edu",
    cgpa: 8.5,
    branch: "Computer Science",
    graduationYear: 2024,
    skills: ["React", "Node.js", "Python", "MongoDB"],
    appliedDate: "2024-01-20",
    status: "pending",
    resumeUrl: "/resume.pdf",
    portfolio: "https://johndoe.dev"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@college.edu",
    cgpa: 9.2,
    branch: "Information Technology",
    graduationYear: 2024,
    skills: ["JavaScript", "React", "CSS", "HTML"],
    appliedDate: "2024-01-19",
    status: "shortlisted",
    resumeUrl: "/resume.pdf"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@college.edu",
    cgpa: 7.8,
    branch: "Computer Science",
    graduationYear: 2024,
    skills: ["Java", "Spring Boot", "MySQL", "AWS"],
    appliedDate: "2024-01-18",
    status: "interview-scheduled",
    resumeUrl: "/resume.pdf"
  }
];

export const RecruiterApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || applicant.status === statusFilter;
    const matchesBranch = branchFilter === "all" || applicant.branch === branchFilter;
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "interview-scheduled": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const updateApplicationStatus = (applicantId: string, newStatus: Applicant["status"]) => {
    setApplicants(prev => 
      prev.map(applicant => 
        applicant.id === applicantId 
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
  };

  const branches = ["Computer Science", "Information Technology", "Electronics", "Mechanical"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Applicants</h1>
          <p className="text-muted-foreground">
            Review and manage applications for Job ID: {jobId}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button>
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search applicants by name, email, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {branches.map(branch => (
              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{applicants.length}</div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {applicants.filter(a => a.status === "pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {applicants.filter(a => a.status === "shortlisted").length}
            </div>
            <p className="text-sm text-muted-foreground">Shortlisted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {applicants.filter(a => a.status === "interview-scheduled").length}
            </div>
            <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
          </CardContent>
        </Card>
      </div>

      {/* Applicants List */}
      <div className="grid gap-4">
        {filteredApplicants.map((applicant) => (
          <Card key={applicant.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={applicant.avatar} />
                    <AvatarFallback>
                      {applicant.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">{applicant.name}</h3>
                      <p className="text-muted-foreground">{applicant.email}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{applicant.branch}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>CGPA: {applicant.cgpa}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Class of {applicant.graduationYear}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {applicant.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(applicant.status)}>
                    {applicant.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Applied on {applicant.appliedDate}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                  {applicant.resumeUrl && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Resume
                    </Button>
                  )}
                  {applicant.status === "pending" && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => updateApplicationStatus(applicant.id, "shortlisted")}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Shortlist
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => updateApplicationStatus(applicant.id, "rejected")}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  {applicant.status === "shortlisted" && (
                    <Button 
                      size="sm"
                      onClick={() => updateApplicationStatus(applicant.id, "interview-scheduled")}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule Interview
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplicants.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium">No Applicants Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" || branchFilter !== "all"
                ? "No applicants match your current filters"
                : "No applications received yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};