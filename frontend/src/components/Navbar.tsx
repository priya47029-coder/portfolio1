import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { authService, navbarService } from '../services/api';
import { NavbarData } from '../types';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAuthenticated = authService.isAuthenticated();

  const [navData, setNavData] = useState<NavbarData>({
    brandName: 'Priya',
    brandHighlight: 'P',
    logoLetter: 'P',
    resumeButtonText: 'Resume',
    resumeButtonLink: '/resume/Priya-Resume.pdf',
    items: [
      { name: 'Home', href: '#home', visible: true, order: 1 },
      { name: 'About', href: '#about', visible: true, order: 2 },
      { name: 'Skills', href: '#skills', visible: true, order: 3 },
      { name: 'Projects', href: '#projects', visible: true, order: 4 },
      { name: 'Education', href: '#education', visible: true, order: 5 },
      { name: 'Certifications', href: '#certifications', visible: true, order: 6 },
      { name: 'Experience', href: '#experience', visible: true, order: 7 },
      { name: 'Contact', href: '#contact', visible: true, order: 8 }
    ]
  });

  useEffect(() => {
    fetchNavbarData();
  }, []);

  const fetchNavbarData = async () => {
    try {
      const res = await navbarService.get();
      if (res.data.success && res.data.data) {
        setNavData(res.data.data);
      }
    } catch (err) {
      console.error('Navbar load fallback to default:', err);
    }
  };

  const handleNavClick = (sectionId: string) => {
    const cleanId = sectionId.replace('#', '');
    if (isHome) {
      const element = document.getElementById(cleanId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const visibleItems = (navData.items || [])
    .filter((item) => item.visible !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar py-3 shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center text-white"
            style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)'
            }}
          >
            <span className="fw-bold fs-5">{navData.logoLetter || 'P'}</span>
          </div>
          <span>
            {navData.brandName || 'Priya'}{' '}
            <span className="gradient-text">{navData.brandHighlight || 'P'}</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
            {visibleItems.map((item, idx) => (
              <li key={idx} className="nav-item">
                {isHome ? (
                  <a
                    className="nav-link"
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    className="nav-link"
                    to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Action buttons */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center p-2"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              style={{ width: '38px', height: '38px' }}
            >
              {theme === 'dark' ? (
                <i className="bi bi-sun-fill text-warning fs-6"></i>
              ) : (
                <i className="bi bi-moon-stars-fill text-primary fs-6"></i>
              )}
            </button>

            {/* Resume button if configured */}
            {navData.resumeButtonLink && (
              <a
                href={navData.resumeButtonLink}
                download
                className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-none d-xl-inline-flex align-items-center gap-1"
              >
                <i className="bi bi-download"></i>
                <span>{navData.resumeButtonText || 'Resume'}</span>
              </a>
            )}

            {/* Admin Link Button */}
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 rounded-pill px-3"
            >
              <i className="bi bi-shield-lock-fill"></i>
              <span>{isAuthenticated ? 'Admin' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
