import React, { useEffect, useState } from 'react';
import { Certification } from '../types';
import { certificationService } from '../services/api';

export const CertificationsSection: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const res = await certificationService.getAll();
      if (res.data.success && Array.isArray(res.data.data)) {
        setCertifications(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load certifications:', err);
      setError('Could not load certifications from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="certifications" className="section-padding py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge rounded-pill text-bg-primary px-3 py-2 text-uppercase mb-2">
            Verified Credentials
          </span>
          <h2 className="display-6 fw-bold">Certifications &amp; Achievements</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Loaded from MongoDB. Continuous professional certifications across UI/UX, programming, and database development.
          </p>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Retrieving certifications...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mx-auto text-center" style={{ maxWidth: '600px' }}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="row g-4">
            {certifications.map((cert) => (
              <div key={cert._id} className="col-md-6 col-lg-3">
                <div className="card h-100 portfolio-card overflow-hidden d-flex flex-column">
                  {/* Certificate preview visual */}
                  <div
                    className="p-3 bg-body-secondary d-flex align-items-center justify-content-center overflow-hidden"
                    style={{ height: '160px' }}
                  >
                    <img
                      src={cert.image || '/assets/certifications/google-ux.svg'}
                      alt={cert.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: '130px', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/certifications/google-ux.svg';
                      }}
                    />
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-secondary-subtle text-body-secondary fw-semibold">
                        {cert.date}
                      </span>
                      <span className="text-success small fw-semibold d-flex align-items-center gap-1">
                        <i className="bi bi-patch-check-fill"></i>
                        Verified
                      </span>
                    </div>

                    <h5 className="card-title fw-bold mb-1 fs-6">{cert.name}</h5>
                    <p className="text-primary small fw-semibold mb-3">{cert.organization}</p>

                    {/* Skills learned badges */}
                    {cert.skillsLearned && cert.skillsLearned.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {cert.skillsLearned.map((skill, i) => (
                          <span
                            key={i}
                            className="badge text-bg-light border text-muted fw-normal"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action link */}
                    <div className="mt-auto pt-2 border-top">
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary rounded-pill w-100 d-flex align-items-center justify-content-center gap-1"
                        >
                          <span>Show Credential</span>
                          <i className="bi bi-box-arrow-up-right"></i>
                        </a>
                      ) : (
                        <button disabled className="btn btn-sm btn-light rounded-pill w-100 text-muted">
                          Certificate Verified
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
