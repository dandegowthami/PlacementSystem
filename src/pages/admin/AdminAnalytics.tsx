import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { Users, Briefcase, Calendar, TrendingUp, Download, Building, GraduationCap } from "lucide-react";

// Mock data for charts
const placementByBranch = [
  { branch: "Computer Science", placed: 45, total: 50, percentage: 90 },
  { branch: "Information Technology", placed: 38, total: 45, percentage: 84 },
  { branch: "Electronics", placed: 32, total: 40, percentage: 80 },
  { branch: "Mechanical", placed: 28, total: 35, percentage: 80 },
  { branch: "Civil", placed: 22, total: 30, percentage: 73 },
  { branch: "Electrical", placed: 25, total: 35, percentage: 71 }
];

const companyWiseHiring = [
  { company: "TechCorp", hires: 15, package: 12 },
  { company: "InnovateSoft", hires: 12, package: 10 },
  { company: "DataSystems", hires: 10, package: 15 },
  { company: "CloudTech", hires: 8, package: 8 },
  { company: "StartupXYZ", hires: 6, package: 6 }
];

const monthlyApplications = [
  { month: "Sep", applications: 120, placements: 15 },
  { month: "Oct", applications: 180, placements: 35 },
  { month: "Nov", applications: 250, placements: 60 },
  { month: "Dec", applications: 200, placements: 45 },
  { month: "Jan", applications: 300, placements: 80 }
];

const salaryDistribution = [
  { range: "3-5 LPA", count: 45, color: "#8884d8" },
  { range: "5-8 LPA", count: 35, color: "#82ca9d" },
  { range: "8-12 LPA", count: 25, color: "#ffc658" },
  { range: "12-15 LPA", count: 15, color: "#ff7300" },
  { range: "15+ LPA", count: 8, color: "#ff0000" }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000'];

export const AdminAnalytics = () => {
  const totalStudents = placementByBranch.reduce((sum, branch) => sum + branch.total, 0);
  const totalPlaced = placementByBranch.reduce((sum, branch) => sum + branch.placed, 0);
  const overallPlacementRate = ((totalPlaced / totalStudents) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive placement statistics and insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current-year">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select academic year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-year">2023-24</SelectItem>
              <SelectItem value="prev-year">2022-23</SelectItem>
              <SelectItem value="prev-year-2">2021-22</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Students Placed</p>
                <p className="text-2xl font-bold">{totalPlaced}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Placement Rate</p>
                <p className="text-2xl font-bold">{overallPlacementRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Building className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Partner Companies</p>
                <p className="text-2xl font-bold">{companyWiseHiring.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch-wise Placement */}
        <Card>
          <CardHeader>
            <CardTitle>Branch-wise Placement Statistics</CardTitle>
            <CardDescription>Placement rates across different engineering branches</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={placementByBranch}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="branch" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salary Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Package Distribution</CardTitle>
            <CardDescription>Distribution of salary packages offered</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salaryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, percent }) => `${range} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {salaryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Application & Placement Trends</CardTitle>
            <CardDescription>Track applications and placements over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="placements" 
                  stackId="2" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Company-wise Hiring */}
        <Card>
          <CardHeader>
            <CardTitle>Top Hiring Companies</CardTitle>
            <CardDescription>Companies with highest number of hires</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companyWiseHiring} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="company" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="hires" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Branch Performance</CardTitle>
            <CardDescription>Complete breakdown by engineering branch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {placementByBranch.map((branch) => (
                <div key={branch.branch} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{branch.branch}</h4>
                    <p className="text-sm text-muted-foreground">
                      {branch.placed} of {branch.total} students placed
                    </p>
                  </div>
                  <Badge 
                    variant={branch.percentage >= 80 ? "default" : "secondary"}
                    className="font-bold"
                  >
                    {branch.percentage}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Company Hiring Summary</CardTitle>
            <CardDescription>Overview of partner companies and packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companyWiseHiring.map((company) => (
                <div key={company.company} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{company.company}</h4>
                    <p className="text-sm text-muted-foreground">
                      {company.hires} students hired
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{company.package} LPA</p>
                    <p className="text-sm text-muted-foreground">Avg. Package</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};