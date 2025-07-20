import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const RecruiterPostJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Job Posted Successfully",
      description: "Your job posting has been created and is now live.",
    });
    
    setIsSubmitting(false);
    navigate("/recruiter/my-jobs");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Post New Job</h1>
        <p className="text-muted-foreground">Create a new job posting for your company</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential details about the job position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input id="jobTitle" placeholder="e.g. Software Engineer" required />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" placeholder="e.g. San Francisco, CA" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minSalary">Minimum Salary (₹)</Label>
                  <Input id="minSalary" type="number" placeholder="e.g. 300000" />
                </div>
                <div>
                  <Label htmlFor="maxSalary">Maximum Salary (₹)</Label>
                  <Input id="maxSalary" type="number" placeholder="e.g. 800000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Detailed information about the role and responsibilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  className="min-h-32"
                  required 
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea 
                  id="requirements" 
                  placeholder="List the required skills, experience, and qualifications..."
                  className="min-h-32"
                  required 
                />
              </div>

              <div>
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <Textarea 
                  id="benefits" 
                  placeholder="Health insurance, flexible hours, remote work, etc..."
                  className="min-h-24"
                />
              </div>
            </CardContent>
          </Card>

          {/* Eligibility Criteria */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
              <CardDescription>Set criteria for student applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minCGPA">Minimum CGPA</Label>
                  <Input id="minCGPA" type="number" step="0.1" min="0" max="10" placeholder="e.g. 7.0" />
                </div>
                <div>
                  <Label htmlFor="maxBacklogs">Maximum Backlogs Allowed</Label>
                  <Input id="maxBacklogs" type="number" min="0" placeholder="e.g. 2" />
                </div>
              </div>

              <div>
                <Label>Eligible Branches</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Electrical"].map((branch) => (
                    <div key={branch} className="flex items-center space-x-2">
                      <Checkbox id={branch} />
                      <Label htmlFor={branch} className="text-sm">{branch}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Configure application deadlines and process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                  <Input id="applicationDeadline" type="date" required />
                </div>
                <div>
                  <Label htmlFor="interviewDate">Expected Interview Date</Label>
                  <Input id="interviewDate" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalPositions">Total Positions Available</Label>
                  <Input id="totalPositions" type="number" min="1" placeholder="e.g. 5" />
                </div>
                <div>
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                      <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/recruiter/dashboard")}>
              Cancel
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};