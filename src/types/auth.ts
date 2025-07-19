export type UserRole = 'student' | 'recruiter' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  profileComplete: boolean;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  cgpa?: number;
  branch?: string;
  graduationYear?: number;
  skills?: string[];
  resumeUrl?: string;
  phone?: string;
}

export interface Recruiter extends User {
  role: 'recruiter';
  company: string;
  designation: string;
  phone?: string;
  companyWebsite?: string;
}

export interface Admin extends User {
  role: 'admin';
  designation: string;
  department: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  // Role-specific fields
  studentId?: string;
  company?: string;
  designation?: string;
  department?: string;
}