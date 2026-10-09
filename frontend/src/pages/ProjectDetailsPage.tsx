import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';
import { projectService } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await projectService.getById(projectId);
      if (res.data.success && res.data.data) {
        setProject(res.data.data);
      } else {
        setError('Project details could not be found.');
      }
    } catch (err) {
      console.error('Failed to fetch project:', err);
      setError('Project not found or failed to load from server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="section-padding py-5 min-vh-100">
        <div className="container py-lg-4">
          {/* Back link */}
          <div className="mb-4">
            <Link to="/#projects" className="btn btn-outline-secondary rounded-pill btn-sm d-inline-flex align-items-center gap-2">
              <i className="bi bi-arrow-left"></i>
              <span>Back to All Projects</span>
            </Link>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading project...</span>
              </div>
              <p className="mt-2 text-muted">Loading project details...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger mx-auto text-center" style={{ maxWidth: '600px' }}>
              <i className="bi bi-exclamation-circle-fill fs-4 d-block mb-2"></i>
              <h5>{error}</h5>
              <Link to="/" className="btn btn-primary btn-sm rounded-pill mt-3">
                Return to Home
              </Link>
            </div>
          )}

          {!loading && !error && project && (
            <div className="row g-5">
              {/* Left Column: Image & Media */}
              <div className="col-lg-7">
                <div className="portfolio-card overflow-hidden p-2 shadow-sm mb-4">
                  <img
                    src={project.image || '/assets/projects/project-placeholder.svg'}
                    alt={project.title}
                    className="w-100 rounded-3 img-fluid"
                    style={{ maxHeight: '480px', objectFit: 'contain', backgroundColor: '#090d16' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/projects/project-placeholder.svg';
                    }}
                  />
                </div>

                {/* Features Checklist */}
                {project.features && project.features.length > 0 && (
                  <div className="portfolio-card p-4">
                    <h4 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                      <i className="bi bi-stars text-warning"></i>
                      Key Architecture &amp; Features
                    </h4>
                    <div className="row g-2">
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="col-12">
                          <div className="d-flex align-items-start gap-2 p-2 rounded bg-body-tertiary">
                            <i className="bi bi-check-circle-fill text-success mt-1"></i>
                            <span>{feat}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Meta Info & Actions */}
              <div className="col-lg-5">
                <div className="sticky-top" style={{ top: '100px' }}>
                  <div className="portfolio-card p-4 p-md-5 mb-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill fw-semibold">
                          ⭐ Featured
                        </span>
                      )}
                    </div>

                    <h1 className="h2 fw-bold mb-3">{project.title}</h1>
                    <p className="text-body-secondary mb-4" style={{ lineHeight: '1.8' }}>
                      {project.description}
                    </p>

                    {/* Technologies list */}
                    <div className="mb-4">
                      <h6 className="fw-bold text-uppercase text-muted small mb-2">Technologies Used</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="d-grid gap-3">
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary-gradient btn-lg rounded-pill d-flex align-items-center justify-content-center gap-2"
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                          <span>View Live Demo / Prototype</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-secondary btn-lg rounded-pill d-flex align-items-center justify-content-center gap-2"
                        >
                          <i className="bi bi-github"></i>
                          <span>Explore Source Code on GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};
