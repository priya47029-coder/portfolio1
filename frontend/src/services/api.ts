import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import {
  Project,
  Skill,
  Education,
  Certification,
  Experience,
  ContactInfo,
  ContactMessage,
  AdminUser,
  HomeData,
  AboutData,
  NavbarData,
  FooterData,
  SiteSettings,
  DashboardStats,
  ApiResponse,
  AuthResponse
} from '../types';

// Create Centralized Axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Interceptor to automatically attach JWT Bearer token if available
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('priya_portfolio_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle global 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('priya_portfolio_token');
        localStorage.removeItem('priya_portfolio_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// ==========================================
// Centralized Service Functions
// ==========================================

// Home CMS Service
export const homeService = {
  get: () => api.get<ApiResponse<HomeData>>('/home'),
  update: (data: Partial<HomeData>) => api.put<ApiResponse<HomeData>>('/home', data)
};

// About CMS Service
export const aboutService = {
  get: () => api.get<ApiResponse<AboutData>>('/about'),
  update: (data: Partial<AboutData>) => api.put<ApiResponse<AboutData>>('/about', data)
};

// Projects CMS Service
export const projectService = {
  getAll: (params?: { category?: string; search?: string }) =>
    api.get<ApiResponse<Project[]>>('/projects', { params }),
  getById: (id: string) =>
    api.get<ApiResponse<Project>>(`/projects/${id}`),
  create: (data: Partial<Project>) =>
    api.post<ApiResponse<Project>>('/projects', data),
  update: (id: string, data: Partial<Project>) =>
    api.put<ApiResponse<Project>>(`/projects/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse<Project>>(`/projects/${id}`)
};

// Skills CMS Service
export const skillService = {
  getAll: () =>
    api.get<ApiResponse<Skill[]>>('/skills'),
  create: (data: Partial<Skill>) =>
    api.post<ApiResponse<Skill>>('/skills', data),
  update: (id: string, data: Partial<Skill>) =>
    api.put<ApiResponse<Skill>>(`/skills/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse<Skill>>(`/skills/${id}`)
};

// Education CMS Service
export const educationService = {
  getAll: () =>
    api.get<ApiResponse<Education[]>>('/education'),
  create: (data: Partial<Education>) =>
    api.post<ApiResponse<Education>>('/education', data),
  update: (id: string, data: Partial<Education>) =>
    api.put<ApiResponse<Education>>(`/education/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse<Education>>(`/education/${id}`)
};

// Certifications CMS Service
export const certificationService = {
  getAll: () =>
    api.get<ApiResponse<Certification[]>>('/certifications'),
  create: (data: Partial<Certification>) =>
    api.post<ApiResponse<Certification>>('/certifications', data),
  update: (id: string, data: Partial<Certification>) =>
    api.put<ApiResponse<Certification>>(`/certifications/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse<Certification>>(`/certifications/${id}`)
};

// Experience CMS Service
export const experienceService = {
  getAll: () =>
    api.get<ApiResponse<Experience[]>>('/experience'),
  create: (data: Partial<Experience>) =>
    api.post<ApiResponse<Experience>>('/experience', data),
  update: (id: string, data: Partial<Experience>) =>
    api.put<ApiResponse<Experience>>(`/experience/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse<Experience>>(`/experience/${id}`)
};

// Contact Info CMS Service
export const contactInfoService = {
  get: () => api.get<ApiResponse<ContactInfo>>('/contact'),
  update: (data: Partial<ContactInfo>) => api.put<ApiResponse<ContactInfo>>('/contact', data),
  submitMessage: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post<ApiResponse<ContactMessage>>('/contact', data)
};

// Messages CMS Service
export const messageService = {
  getAll: () => api.get<ApiResponse<ContactMessage[]>>('/messages'),
  markRead: (id: string) => api.put<ApiResponse<ContactMessage>>(`/messages/${id}/read`),
  delete: (id: string) => api.delete<ApiResponse<ContactMessage>>(`/messages/${id}`)
};

// Navbar CMS Service
export const navbarService = {
  get: () => api.get<ApiResponse<NavbarData>>('/navbar'),
  update: (data: Partial<NavbarData>) => api.put<ApiResponse<NavbarData>>('/navbar', data)
};

// Footer CMS Service
export const footerService = {
  get: () => api.get<ApiResponse<FooterData>>('/footer'),
  update: (data: Partial<FooterData>) => api.put<ApiResponse<FooterData>>('/footer', data)
};

// Site Settings CMS Service
export const settingsService = {
  get: () => api.get<ApiResponse<SiteSettings>>('/settings'),
  update: (data: Partial<SiteSettings>) => api.put<ApiResponse<SiteSettings>>('/settings', data)
};

// Dashboard Stats Service
export const statsService = {
  getStats: () => api.get<ApiResponse<DashboardStats>>('/stats')
};

// Auth Service
export const authService = {
  login: (credentials: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', credentials),
  getMe: () =>
    api.get<{ success: boolean; user: AdminUser }>('/auth/me'),
  logout: () => {
    localStorage.removeItem('priya_portfolio_token');
    localStorage.removeItem('priya_portfolio_user');
  },
  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem('priya_portfolio_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
  isAuthenticated: (): boolean => {
    return Boolean(localStorage.getItem('priya_portfolio_token'));
  }
};
