import React from 'react';
import { Project } from '../types';
import { Link } from 'react-router-dom';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content portfolio-card border-0">
          <div className="modal-header border-0 pb-0">
            <span className="badge bg-primary-subtle text-primary fw-semibold px-3 py-2 rounded-pill">
              {project.category}
            </span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body pt-3">
            <div className="rounded-3 overflow-hidden mb-4 border bg-body-tertiary">
              <img
                src={project.image || '/assets/projects/project-placeholder.svg'}
                alt={project.title}
                className="w-100 img-fluid"
                style={{ maxHeight: '360px', objectFit: 'cover' }}
              />
            </div>

            <h3 className="h4 fw-bold mb-3">{project.title}</h3>
            <p className="text-body-secondary mb-4" style={{ lineHeight: '1.7' }}>
              {project.description}
            </p>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-4">
                <h5 className="h6 fw-bold text-uppercase text-muted mb-2">Key Features &amp; Capabilities</h5>
                <ul className="list-group list-group-flush rounded-3">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="list-group-item bg-transparent px-0 py-2 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-success"></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-4">
              <h5 className="h6 fw-bold text-uppercase text-muted mb-2">Technologies Used</h5>
              <div className="d-flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer border-0 pt-0 d-flex justify-content-between">
            <Link
              to={`/projects/${project._id}`}
              className="btn btn-outline-primary rounded-pill px-3"
              onClick={onClose}
            >
              <i className="bi bi-arrow-up-right-square me-1"></i>
              Open Dedicated Page
            </Link>

            <div className="d-flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary rounded-pill px-3"
                >
                  <i className="bi bi-github me-1"></i>
                  GitHub
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary-gradient rounded-pill px-3"
                >
                  <i className="bi bi-box-arrow-up-right me-1"></i>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
