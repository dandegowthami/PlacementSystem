import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Layout/Navbar";

// Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Unauthorized } from "./pages/Unauthorized";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { StudentApplications } from "./pages/student/StudentApplications";
import { StudentProfile } from "./pages/student/StudentProfile";
import { RecruiterDashboard } from "./pages/recruiter/RecruiterDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { JobListings } from "./pages/JobListings";
import { JobDetails } from "./pages/JobDetails";
import { Notifications } from "./pages/Notifications";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

const RoleBasedRedirect: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'recruiter':
      return <Navigate to="/recruiter/dashboard" replace />;
    case 'student':
      return <Navigate to="/student/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Index redirect */}
            <Route path="/index" element={<Index />} />
            
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Dashboard Route - Role-based redirect */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <RoleBasedRedirect />
              </ProtectedRoute>
            } />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/student/applications" element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <StudentApplications />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/student/profile" element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <StudentProfile />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Recruiter Routes */}
            <Route path="/recruiter/dashboard" element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <DashboardLayout>
                  <RecruiterDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Shared Routes */}
            <Route path="/jobs" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <JobListings />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/job/:id" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <JobDetails />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
