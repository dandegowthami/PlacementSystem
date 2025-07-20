import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Edit, Trash2, Eye, Download, UserPlus } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "recruiter" | "admin";
  status: "active" | "pending" | "suspended";
  registrationDate: string;
  lastLogin?: string;
  avatar?: string;
  // Student specific
  studentId?: string;
  branch?: string;
  graduationYear?: number;
  cgpa?: number;
  // Recruiter specific
  company?: string;
  position?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@college.edu",
    role: "student",
    status: "active",
    registrationDate: "2024-01-15",
    lastLogin: "2024-01-20",
    studentId: "CS2024001",
    branch: "Computer Science",
    graduationYear: 2024,
    cgpa: 8.5
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.recruiter@techcorp.com",
    role: "recruiter",
    status: "pending",
    registrationDate: "2024-01-18",
    company: "TechCorp Inc.",
    position: "Senior HR Manager"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.admin@college.edu",
    role: "admin",
    status: "active",
    registrationDate: "2024-01-10",
    lastLogin: "2024-01-21"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.student@college.edu",
    role: "student",
    status: "suspended",
    registrationDate: "2024-01-12",
    lastLogin: "2024-01-19",
    studentId: "IT2024002",
    branch: "Information Technology",
    graduationYear: 2024,
    cgpa: 7.8
  }
];

export const AdminUserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "recruiter": return "bg-blue-100 text-blue-800";
      case "student": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const updateUserStatus = (userId: string, newStatus: User["status"]) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus }
          : user
      )
    );
    
    toast({
      title: "User Status Updated",
      description: `User status has been changed to ${newStatus}`,
    });
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been removed from the system",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage all users in the system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search users by name, email, student ID, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="recruiter">Recruiters</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.role === "student").length}
            </div>
            <p className="text-sm text-muted-foreground">Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === "recruiter").length}
            </div>
            <p className="text-sm text-muted-foreground">Recruiters</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {users.filter(u => u.status === "pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    
                    {user.role === "student" && (
                      <div className="text-sm text-muted-foreground">
                        <p>Student ID: {user.studentId}</p>
                        <p>{user.branch} • Class of {user.graduationYear} • CGPA: {user.cgpa}</p>
                      </div>
                    )}
                    
                    {user.role === "recruiter" && (
                      <div className="text-sm text-muted-foreground">
                        <p>{user.position} at {user.company}</p>
                      </div>
                    )}
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Registered: {user.registrationDate}</p>
                      {user.lastLogin && <p>Last login: {user.lastLogin}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex gap-2">
                  {user.status === "pending" && (
                    <>
                      <Button 
                        size="sm" 
                        className="text-green-600 hover:text-green-700"
                        variant="outline"
                        onClick={() => updateUserStatus(user.id, "active")}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => updateUserStatus(user.id, "suspended")}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {user.status === "active" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => updateUserStatus(user.id, "suspended")}
                    >
                      Suspend
                    </Button>
                  )}
                  
                  {user.status === "suspended" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => updateUserStatus(user.id, "active")}
                    >
                      Reactivate
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium">No Users Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "No users match your current filters"
                : "No users in the system yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};