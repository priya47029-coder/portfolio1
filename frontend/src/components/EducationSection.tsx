import React, { useEffect, useState } from 'react';
import { Education } from '../types';
import { educationService } from '../services/api';

export const EducationSection: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const res = await educationService.getAll();
      if (res.data.success && Array.isArray(res.data.data)) {
        setEducationList(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load education:', err);
      setError('Could not load education records from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="education" className="section-padding py-5">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge rounded-pill text-bg-primary px-3 py-2 text-uppercase mb-2">
            Academic Background
          </span>
          <h2 className="display-6 fw-bold">Education &amp; Qualifications</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Academic training establishing strong theoretical and practical foundations in Information Technology and Computer Science.
          </p>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Retrieving academic history from MongoDB...</p>
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
                {educationList.map((edu) => (
                  <div key={edu._id} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="card portfolio-card p-4 p-md-5">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
                        <div>
                          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1 mb-2 fw-semibold">
                            {edu.duration}
                          </span>
                          <h4 className="card-title fw-bold mb-1">{edu.degree}</h4>
                          <h5 className="h6 text-primary fw-semibold mb-0">
                            {edu.institution}
                          </h5>
                        </div>

                        {edu.location && (
                          <div className="text-md-end text-muted small">
                            <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                            {edu.location}
                          </div>
                        )}
                      </div>

                      {edu.description && (
                        <p className="text-body-secondary mb-3" style={{ lineHeight: '1.7' }}>
                          {edu.description}
                        </p>
                      )}

                      {edu.highlights && edu.highlights.length > 0 && (
                        <div className="mt-2 pt-2 border-top">
                          <h6 className="fw-bold small text-uppercase text-muted mb-2">Key Highlights</h6>
                          <div className="d-flex flex-column gap-2">
                            {edu.highlights.map((h, i) => (
                              <div key={i} className="d-flex align-items-start gap-2 small text-body-secondary">
                                <i className="bi bi-mortarboard-fill text-primary mt-1"></i>
                                <span>{h}</span>
                              </div>
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
