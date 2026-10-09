import React, { useEffect, useState } from 'react';
import { Experience } from '../types';
import { experienceService } from '../services/api';

export const ExperienceSection: React.FC = () => {
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const res = await experienceService.getAll();
      if (res.data.success && Array.isArray(res.data.data)) {
        setExperienceList(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load experience:', err);
      setError('Could not load experience history from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="experience" className="section-padding py-5">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge rounded-pill text-bg-primary px-3 py-2 text-uppercase mb-2">
            Career Journey
          </span>
          <h2 className="display-6 fw-bold">Experience &amp; Leadership</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Loaded from MongoDB. Practical work experience, internships, and technical student club leadership.
          </p>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Retrieving experience from MongoDB...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mx-auto text-center" style={{ maxWidth: '600px' }}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="timeline-container">
                {experienceList.map((exp) => (
                  <div key={exp._id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="card portfolio-card p-4 p-md-5">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
                        <div>
                          <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1 mb-2 fw-semibold">
                            {exp.startDate} – {exp.endDate}
                          </span>
                          <h4 className="card-title fw-bold mb-1">{exp.position}</h4>
                          <h5 className="h6 text-primary fw-semibold mb-0">{exp.company}</h5>
                        </div>

                        {exp.location && (
                          <div className="text-md-end text-muted small">
                            <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                            {exp.location}
                          </div>
                        )}
                      </div>

                      <p className="text-body-secondary mb-3" style={{ lineHeight: '1.7' }}>
                        {exp.description}
                      </p>

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="mt-2 pt-2 border-top">
                          <h6 className="fw-bold small text-uppercase text-muted mb-2">Technologies &amp; Tools</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {exp.technologies.map((t, idx) => (
                              <span key={idx} className="tech-pill">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
