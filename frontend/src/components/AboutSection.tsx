import React, { useEffect, useState } from 'react';
import { aboutService } from '../services/api';
import { AboutData } from '../types';

export const AboutSection: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    badge: 'Get To Know Me',
    heading: 'About Me',
    subheading: 'Bridging aesthetics and code to create digital experiences that delight users and solve practical real-world problems.',
    bioParagraph1: 'I am currently pursuing my Bachelor of Technology in Information Technology (Batch 2024 – 2028) at Dhanalakshmi College of Engineering, Chennai. My journey revolves around crafting intuitive, user-first interfaces and transforming those ideas into fully functional applications.',
    bioParagraph2: 'Whether I am orchestrating fluid micro-interactions in Figma, building responsive web applications using React & Node.js, or scripting intelligent automation and algorithmic problem solving with Python, I strive for clean architecture and thoughtful craftsmanship.',
    profileImage: '/assets/images/priya-profile.svg',
    careerInterests: ['UI/UX Design', 'Mobile Application Development', 'Python Programming', 'Web Technologies', 'Data Analytics'],
    location: 'Chennai, Tamil Nadu',
    degree: 'B.Tech – IT (2024–2028)',
    languages: 'English, Tamil',
    focusTitle: 'My Core Focus Areas',
    focusDescription: 'Committed to continuous learning across the entire product lifecycle—from user research and wireframing to backend database engineering.',
    focusPoints: [
      {
        title: 'User-Centric Interface Design',
        description: 'Focusing on wireframing, high-fidelity Figma prototypes, and accessibility standards.',
        icon: 'bi-check-lg'
      },
      {
        title: 'Modern Web & Mobile Development',
        description: 'Building reactive, cross-device interfaces using modern component frameworks and REST APIs.',
        icon: 'bi-check-lg'
      },
      {
        title: 'Python & Algorithmic Thinking',
        description: 'Automating workflows, exploring data analytics, and solving complex programmatic tasks.',
        icon: 'bi-check-lg'
      }
    ],
    cards: [
      {
        title: 'B.Tech IT',
        description: 'Building an engineering foundation in Data Structures, Database Systems, Computer Networks, and Object-Oriented Software Engineering at Dhanalakshmi College of Engineering.',
        icon: 'bi-mortarboard-fill',
        badge: '2024 – 2028',
        gradient: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
        order: 1
      },
      {
        title: 'UI/UX Design',
        description: 'Creating interactive mobile and web prototypes in Figma. Experienced in empathetic user research, wireframing, color theory, design systems, and micro-interactions.',
        icon: 'bi-palette-fill',
        badge: 'Figma & Prototyping',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
        order: 2
      },
      {
        title: 'App Development',
        description: 'Designing and building mobile applications and full-stack web applications with responsive design, component modularity, and smooth state management.',
        icon: 'bi-phone-fill',
        badge: 'Android & React',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
        order: 3
      },
      {
        title: 'Python',
        description: 'Passionate about Python programming for algorithmic challenges, backend integration, web scraping, and exploring emerging data analytics workflows.',
        icon: 'bi-filetype-py',
        badge: 'Python 3 & Logic',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        order: 4
      }
    ]
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await aboutService.get();
      if (res.data.success && res.data.data) {
        setAboutData(res.data.data);
      }
    } catch (err) {
      console.error('About data load fallback:', err);
    }
  };

  const sortedCards = (aboutData.cards || []).slice().sort((a, b) => a.order - b.order);

  return (
    <section id="about" className="section-padding py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge rounded-pill text-bg-primary px-3 py-2 text-uppercase mb-2">
            {aboutData.badge || 'Get To Know Me'}
          </span>
          <h2 className="display-6 fw-bold">{aboutData.heading || 'About Me'}</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            {aboutData.subheading}
          </p>
        </div>

        {/* Narrative & Highlights */}
        <div className="row align-items-center g-4 mb-5">
          <div className="col-lg-6">
            <h3 className="h3 fw-bold mb-3">
              Passionate Tech Student &amp; <span className="gradient-text">Product Designer</span>
            </h3>
            <p className="text-body-secondary mb-3" style={{ lineHeight: '1.8' }}>
              {aboutData.bioParagraph1}
            </p>
            <p className="text-body-secondary mb-4" style={{ lineHeight: '1.8' }}>
              {aboutData.bioParagraph2}
            </p>

            <div className="row g-3">
              {aboutData.location && (
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt-fill text-danger fs-5"></i>
                    <div>
                      <small className="text-muted d-block">Location</small>
                      <span className="fw-semibold">{aboutData.location}</span>
                    </div>
                  </div>
                </div>
              )}

              {aboutData.degree && (
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-mortarboard-fill text-primary fs-5"></i>
                    <div>
                      <small className="text-muted d-block">Degree</small>
                      <span className="fw-semibold">{aboutData.degree}</span>
                    </div>
                  </div>
                </div>
              )}

              {aboutData.careerInterests && aboutData.careerInterests.length > 0 && (
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-lightbulb-fill text-warning fs-5"></i>
                    <div>
                      <small className="text-muted d-block">Interests</small>
                      <span className="fw-semibold">{aboutData.careerInterests.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}

              {aboutData.languages && (
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-globe2 text-info fs-5"></i>
                    <div>
                      <small className="text-muted d-block">Languages</small>
                      <span className="fw-semibold">{aboutData.languages}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="p-4 p-md-5 rounded-4 bg-body border shadow-sm">
              <h4 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-compass-fill text-primary"></i>
                {aboutData.focusTitle || 'My Core Focus Areas'}
              </h4>
              <p className="text-muted small mb-4">
                {aboutData.focusDescription}
              </p>

              <div className="d-flex flex-column gap-3">
                {(aboutData.focusPoints || []).map((point, idx) => (
                  <div key={idx} className="d-flex align-items-start gap-3">
                    <div className="badge bg-primary-subtle text-primary p-2 rounded-circle">
                      <i className={`bi ${point.icon || 'bi-check-lg'} fs-6`}></i>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold">{point.title}</h6>
                      <small className="text-body-secondary">{point.description}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic About Cards */}
        {sortedCards.length > 0 && (
          <>
            <h4 className="text-center fw-bold mb-4">Specialization Pillars</h4>
            <div className="row g-4">
              {sortedCards.map((card, idx) => (
                <div key={idx} className="col-md-6 col-lg-3">
                  <div className="card h-100 portfolio-card p-4">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center text-white mb-3"
                      style={{
                        width: '50px',
                        height: '50px',
                        background: card.gradient || 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)'
                      }}
                    >
                      <i className={`bi ${card.icon || 'bi-code-slash'} fs-4`}></i>
                    </div>
                    <h5 className="card-title fw-bold">{card.title}</h5>
                    <p className="card-text text-body-secondary small mb-3">
                      {card.description}
                    </p>
                    {card.badge && (
                      <div className="mt-auto">
                        <span className="badge bg-primary-subtle text-primary">
                          {card.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
