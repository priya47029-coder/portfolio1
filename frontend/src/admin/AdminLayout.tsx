import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useTheme } from '../hooks/useTheme';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const currentUser = authService.getCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { to: '/admin/home', icon: 'bi-house-door', label: 'Home Page' },
    { to: '/admin/about', icon: 'bi-person-badge', label: 'About' },
    { to: '/admin/skills', icon: 'bi-stars', label: 'Skills' },
    { to: '/admin/projects', icon: 'bi-kanban', label: 'Projects' },
    { to: '/admin/education', icon: 'bi-mortarboard', label: 'Education' },
    { to: '/admin/certifications', icon: 'bi-patch-check', label: 'Certifications' },
    { to: '/admin/experience', icon: 'bi-briefcase', label: 'Experience' },
    { to: '/admin/contact', icon: 'bi-telephone', label: 'Contact Info' },
    { to: '/admin/messages', icon: 'bi-envelope', label: 'Messages' },
    { to: '/admin/navbar', icon: 'bi-layout-text-window-reverse', label: 'Navbar' },
    { to: '/admin/footer', icon: 'bi-layout-sidebar-inset-reverse', label: 'Footer' },
    { to: '/admin/settings', icon: 'bi-gear', label: 'Settings' }
  ];

  return (
    <div className="d-flex min-vh-100 bg-body-tertiary">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-2 d-lg-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-body border-end d-flex flex-column z-3 position-fixed top-0 bottom-0 start-0 transition-all ${
          sidebarOpen ? 'd-flex' : 'd-none d-lg-flex'
        }`}
        style={{ width: '260px' }}
      >
        {/* Brand Header */}
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <Link to="/admin/dashboard" className="text-decoration-none d-flex align-items-center gap-2">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center text-white"
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)'
              }}
            >
              <i className="bi bi-shield-check fs-5"></i>
            </div>
            <div>
              <span className="fw-bold fs-5 text-body">
                Priya <span className="gradient-text">CMS</span>
              </span>
              <span className="badge bg-primary-subtle text-primary d-block" style={{ fontSize: '0.65rem' }}>
                ADMIN PORTAL
              </span>
            </div>
          </Link>

          <button
            className="btn btn-sm btn-outline-secondary d-lg-none"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex-grow-1 overflow-y-auto p-2">
          <ul className="nav nav-pills flex-column gap-1">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item">
                <NavLink
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-semibold ${
                      isActive ? 'active bg-primary text-white shadow-sm' : 'text-body-secondary'
                    }`
                  }
                >
                  <i className={`bi ${item.icon} fs-5`}></i>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-top bg-body-tertiary">
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="rounded-circle bg-primary text-white p-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="overflow-hidden">
              <div className="fw-bold small text-truncate">{currentUser?.name || 'Priya P'}</div>
              <div className="text-muted small text-truncate" style={{ fontSize: '0.72rem' }}>{currentUser?.email || 'admin@priya.dev'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger btn-sm w-100 rounded-pill d-flex align-items-center justify-content-center gap-1"
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100 ms-0 ms-lg-auto" style={{ marginLeft: '260px' }}>
        {/* Top Navbar */}
        <header className="navbar navbar-expand bg-body border-bottom sticky-top py-2 px-3 px-lg-4">
          <div className="container-fluid p-0">
            {/* Mobile Hamburger Toggle */}
            <button
              className="btn btn-outline-secondary btn-sm d-lg-none me-2"
              onClick={() => setSidebarOpen(true)}
            >
              <i className="bi bi-list fs-5"></i>
            </button>

            <span className="fw-bold text-muted small d-none d-sm-inline">
              DYNAMIC PORTFOLIO MANAGEMENT SYSTEM
            </span>

            {/* Top Right Utilities */}
            <div className="d-flex align-items-center gap-2 ms-auto">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3"
              >
                <i className="bi bi-box-arrow-up-right"></i>
                <span className="d-none d-md-inline">Live Website</span>
              </Link>

              <button
                onClick={toggleTheme}
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                title="Toggle Dark/Light Mode"
              >
                {theme === 'dark' ? (
                  <i className="bi bi-sun-fill text-warning"></i>
                ) : (
                  <i className="bi bi-moon-stars-fill text-primary"></i>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Outlet for Management Sub-pages */}
        <main className="p-3 p-md-4 p-xl-5 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
