import React, { useEffect, useState } from 'react';
import { homeService } from '../services/api';
import { HomeData } from '../types';

export const Hero: React.FC = () => {
  const [homeData, setHomeData] = useState<HomeData>({
    greeting: "Hi, I'm Priya 👋",
    name: 'PRIYA P',
    title: 'B.Tech Information Technology Student',
    subtitle: 'UI/UX Designer | App Developer | Python Enthusiast',
    description: 'I create user-friendly digital experiences and practical applications.',
    profileImage: '/assets/images/priya-profile.svg',
    resumeUrl: '/resume/Priya-Resume.pdf',
    availabilityText: 'Open to Internships & Opportunities',
    location: 'Chennai, Tamil Nadu, India',
    collegeText: 'Dhanalakshmi College of Engineering (2024–2028)',
    primaryButtonText: 'View My Projects',
    primaryButtonLink: '#projects',
    secondaryButtonText: 'Download Resume',
    secondaryButtonLink: '/resume/Priya-Resume.pdf',
    tertiaryButtonText: 'Contact Me',
    tertiaryButtonLink: '#contact',
    techPills: ['Figma', 'Python', 'React', 'Node.js', 'MongoDB']
  });

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const res = await homeService.get();
      if (res.data.success && res.data.data) {
        setHomeData(res.data.data);
      }
    } catch (err) {
      console.error('Home data load fallback:', err);
    }
  };

  const handleButtonClick = (link: string) => {
    if (link.startsWith('#')) {
      const el = document.getElementById(link.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = link;
    }
  };

  return (
    <section id="home" className="hero-wrapper section-padding py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          {/* Left Column: Introductions & CTAs */}
          <div className="col-lg-7 text-center text-lg-start animate-fade-in">
            {/* Availability Pill */}
            {homeData.availabilityText && (
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-success-subtle text-success border border-success-subtle mb-3">
                <span className="spinner-grow spinner-grow-sm text-success" style={{ width: '8px', height: '8px' }} />
                <small className="fw-semibold">{homeData.availabilityText}</small>
              </div>
            )}

            {/* Greeting & Name */}
            <h1 className="display-4 fw-extrabold mb-2 lh-tight">
              {homeData.greeting}
            </h1>

            {/* Title & Subtitle */}
            <h2 className="h4 fw-bold text-primary mb-2">
              {homeData.title}
            </h2>
            <h3 className="h5 fw-medium text-body-secondary mb-3">
              {homeData.subtitle}
            </h3>

            {/* Location & College Tag */}
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-4 text-muted small">
              {homeData.location && (
                <span className="d-inline-flex align-items-center gap-1">
                  <i className="bi bi-geo-alt-fill text-danger"></i>
                  {homeData.location}
                </span>
              )}
              {homeData.collegeText && (
                <span className="d-inline-flex align-items-center gap-1">
                  <i className="bi bi-mortarboard-fill text-primary"></i>
                  {homeData.collegeText}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="lead text-body-secondary mb-4 col-lg-11 px-0" style={{ fontSize: '1.15rem' }}>
              {homeData.description}
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-lg-start gap-3">
              {homeData.primaryButtonText && (
                <button
                  onClick={() => handleButtonClick(homeData.primaryButtonLink)}
                  className="btn btn-primary-gradient btn-lg px-4 py-2 w-100 w-sm-auto rounded-pill shadow-sm"
                >
                  <i className="bi bi-grid-fill me-2"></i>
                  {homeData.primaryButtonText}
                </button>
              )}

              {homeData.secondaryButtonText && (
                <a
                  href={homeData.secondaryButtonLink}
                  download
                  className="btn btn-outline-gradient btn-lg px-4 py-2 w-100 w-sm-auto rounded-pill"
                >
                  <i className="bi bi-file-earmark-arrow-down-fill me-2"></i>
                  {homeData.secondaryButtonText}
                </a>
              )}

              {homeData.tertiaryButtonText && (
                <button
                  onClick={() => handleButtonClick(homeData.tertiaryButtonLink)}
                  className="btn btn-outline-secondary btn-lg px-4 py-2 w-100 w-sm-auto rounded-pill"
                >
                  <i className="bi bi-chat-dots-fill me-2"></i>
                  {homeData.tertiaryButtonText}
                </button>
              )}
            </div>

            {/* Quick Skills Pills */}
            {homeData.techPills && homeData.techPills.length > 0 && (
              <div className="mt-4 pt-2 d-flex flex-wrap justify-content-center justify-content-lg-start gap-2">
                {homeData.techPills.map((pill, idx) => (
                  <span key={idx} className="tech-pill">
                    <i className="bi bi-code-slash"></i> {pill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Avatar / Profile Art */}
          <div className="col-lg-5 text-center">
            <div className="hero-avatar-wrapper">
              <div className="avatar-glow"></div>
              <img
                src={homeData.profileImage || '/assets/images/priya-profile.svg'}
                alt={homeData.name || 'Priya P'}
                className="img-fluid avatar-img shadow-lg"
                style={{ maxHeight: '420px', width: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/priya-profile.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
