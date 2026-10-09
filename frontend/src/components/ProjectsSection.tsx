import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { projectService } from '../services/api';
import { ProjectModal } from './ProjectModal';
import { Link } from 'react-router-dom';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await projectService.getAll();
      if (res.data.success && Array.isArray(res.data.data)) {
        setProjects(res.data.data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
      setError('Unable to load projects from MongoDB. Ensure backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Derive available categories dynamically
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filtering logic
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="section-padding py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge rounded-pill text-bg-primary px-3 py-2 text-uppercase mb-2">
            Selected Work
          </span>
          <h2 className="display-6 fw-bold">Featured Projects &amp; Designs</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Loaded in real time from MongoDB. A showcase of mobile UI/UX prototypes crafted in Figma and full-stack web applications.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="row g-3 justify-content-between align-items-center mb-5">
          {/* Category Filter Pills */}
          <div className="col-lg-8">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn rounded-pill px-3 py-2 btn-sm fw-semibold ${
                    selectedCategory === cat
                      ? 'btn-primary-gradient shadow-sm'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-body border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-body border-start-0 shadow-none ps-0"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-secondary border-start-0"
                  type="button"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading projects...</span>
            </div>
            <p className="mt-2 text-muted">Retrieving projects from MongoDB...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center justify-content-between mx-auto" style={{ maxWidth: '650px' }}>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill fs-5"></i>
              <span>{error}</span>
            </div>
            <button onClick={fetchProjects} className="btn btn-sm btn-outline-danger">
              Retry
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="row g-4">
            {filteredProjects.length === 0 ? (
              <div className="col-12 text-center py-5">
                <i className="bi bi-folder2-open display-4 text-muted mb-3 d-block"></i>
                <h5 className="fw-semibold">No projects matched your search</h5>
                <p className="text-muted small">Try refining your keyword or selected category filter.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="btn btn-outline-primary btn-sm rounded-pill mt-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project._id} className="col-md-6 col-lg-4">
                  <div className="card h-100 portfolio-card overflow-hidden d-flex flex-column">
                    {/* Project Thumbnail Image */}
                    <div
                      className="position-relative overflow-hidden bg-body-secondary"
                      style={{ height: '220px', cursor: 'pointer' }}
                      onClick={() => setSelectedProject(project)}
                    >
                      <img
                        src={project.image || '/assets/projects/project-placeholder.svg'}
                        alt={project.title}
                        className="w-100 h-100 object-fit-cover transition-all"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/projects/project-placeholder.svg';
                        }}
                      />
                      <span className="position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white fw-medium px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="card-body d-flex flex-column p-4">
                      <h4
                        className="card-title h5 fw-bold mb-2 cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                        style={{ cursor: 'pointer' }}
                      >
                        {project.title}
                      </h4>

                      <p className="card-text text-body-secondary small mb-3 flex-grow-1" style={{ lineClamp: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.description}
                      </p>

                      {/* Tech badges */}
                      <div className="d-flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span key={i} className="tech-pill" style={{ fontSize: '0.72rem' }}>
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="tech-pill text-muted" style={{ fontSize: '0.72rem' }}>
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="mt-auto d-flex align-items-center justify-content-between pt-2 border-top">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="btn btn-sm btn-link p-0 text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-1"
                        >
                          <span>Details</span>
                          <i className="bi bi-arrow-right"></i>
                        </button>

                        <div className="d-flex gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '34px', height: '34px' }}
                              title="View GitHub Repository"
                            >
                              <i className="bi bi-github"></i>
                            </a>
                          )}
                          {project.liveDemoUrl && (
                            <a
                              href={project.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-primary-gradient rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '34px', height: '34px' }}
                              title="View Live Demo / Figma"
                            >
                              <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                          )}
                          <Link
                            to={`/projects/${project._id}`}
                            className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '34px', height: '34px' }}
                            title="Dedicated Project Page"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Project Quick View Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
