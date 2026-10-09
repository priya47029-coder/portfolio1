import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { AdminLogin } from './admin/AdminLogin';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminHome } from './admin/AdminHome';
import { AdminAbout } from './admin/AdminAbout';
import { AdminSkills } from './admin/AdminSkills';
import { AdminProjects } from './admin/AdminProjects';
import { AdminEducation } from './admin/AdminEducation';
import { AdminCertifications } from './admin/AdminCertifications';
import { AdminExperience } from './admin/AdminExperience';
import { AdminContact } from './admin/AdminContact';
import { AdminMessages } from './admin/AdminMessages';
import { AdminNavbar } from './admin/AdminNavbar';
import { AdminFooter } from './admin/AdminFooter';
import { AdminSettings } from './admin/AdminSettings';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portfolio Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Suite */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/skills" element={<AdminSkills />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/education" element={<AdminEducation />} />
            <Route path="/admin/certifications" element={<AdminCertifications />} />
            <Route path="/admin/experience" element={<AdminExperience />} />
            <Route path="/admin/contact" element={<AdminContact />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/navbar" element={<AdminNavbar />} />
            <Route path="/admin/footer" element={<AdminFooter />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
