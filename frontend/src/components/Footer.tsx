import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { footerService } from '../services/api';
import { FooterData } from '../types';

export const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData>({
    brandName: 'Priya',
    brandHighlight: 'P',
    logoLetter: 'P',
    description: 'B.Tech Information Technology Student @ Dhanalakshmi College of Engineering, Chennai (2024–2028). Building intuitive digital experiences & modern software applications.',
    copyrightText: 'Priya P. All rights reserved. Crafted with React, TypeScript & MongoDB.',
    location: 'Chennai, Tamil Nadu, India 📍',
    email: 'priya.p.it@dce.edu.in',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  });

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const res = await footerService.get();
      if (res.data.success && res.data.data) {
        setFooterData(res.data.data);
      }
    } catch (err) {
      console.error('Footer load fallback:', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-top py-5 bg-body">
      <div className="container">
        <div className="row g-4 align-items-center justify-content-between mb-4">
          {/* Brand info */}
          <div className="col-lg-5 text-center text-lg-start">
            <div className="d-inline-flex align-items-center gap-2 mb-2">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center text-white"
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)'
                }}
              >
                <span className="fw-bold">{footerData.logoLetter || 'P'}</span>
              </div>
              <span className="fw-bold fs-5">
                {footerData.brandName || 'Priya'}{' '}
                <span className="gradient-text">{footerData.brandHighlight || 'P'}</span>
              </span>
            </div>
            <p className="text-body-secondary small mb-0">
              {footerData.description}
            </p>
          </div>

          {/* Quick Nav Links & Socials */}
          <div className="col-lg-5 text-center text-lg-end">
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-end gap-3 small mb-3">
              <a href="#home" className="text-decoration-none text-body-secondary">Home</a>
              <a href="#about" className="text-decoration-none text-body-secondary">About</a>
              <a href="#skills" className="text-decoration-none text-body-secondary">Skills</a>
              <a href="#projects" className="text-decoration-none text-body-secondary">Projects</a>
              <a href="#education" className="text-decoration-none text-body-secondary">Education</a>
              <a href="#certifications" className="text-decoration-none text-body-secondary">Certifications</a>
              <a href="#experience" className="text-decoration-none text-body-secondary">Experience</a>
              <a href="#contact" className="text-decoration-none text-body-secondary">Contact</a>
            </div>

            <div className="d-flex align-items-center justify-content-center justify-content-lg-end gap-2">
              {footerData.github && (
                <a href={footerData.github} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '34px', height: '34px' }} title="GitHub">
                  <i className="bi bi-github"></i>
                </a>
              )}
              {footerData.linkedin && (
                <a href={footerData.linkedin} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '34px', height: '34px' }} title="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              <Link to="/admin/login" className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                <i className="bi bi-shield-lock-fill me-1"></i> Admin Portal
              </Link>
              <button
                onClick={scrollToTop}
                className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '34px', height: '34px' }}
                title="Back to Top"
              >
                <i className="bi bi-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4 text-muted opacity-25" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start small text-muted">
            &copy; {new Date().getFullYear()} {footerData.copyrightText}
          </div>
          <div className="col-md-6 text-center text-md-end small text-muted mt-2 mt-md-0">
            {footerData.location}
          </div>
        </div>
      </div>
    </footer>
  );
};
