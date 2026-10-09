import React, { useState, useEffect } from 'react';
import { projectService } from '../services/api';
import { Project } from '../types';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectService.getAll();
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load projects from MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProject({
      title: '',
      shortDescription: '',
      description: '',
      image: '/assets/projects/project-placeholder.svg',
      category: 'UI/UX Design',
      technologies: [],
      features: [],
      githubUrl: '',
      liveDemoUrl: '',
      startDate: '',
      endDate: '',
      featured: false,
      order: projects.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project from MongoDB?')) return;
    try {
      const res = await projectService.delete(id);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Project deleted successfully!' });
        fetchProjects();
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to delete project.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      setSaving(true);
      if (editingProject._id) {
        await projectService.update(editingProject._id, editingProject);
        setAlert({ type: 'success', message: 'Project updated successfully in MongoDB!' });
      } else {
        await projectService.create(editingProject);
        setAlert({ type: 'success', message: 'New project created successfully in MongoDB!' });
      }
      setIsModalOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to save project.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Projects Management</h2>
          <p className="text-muted small mb-0">
            Create, edit, or remove project showcases. All updates reflect instantly on the public website.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary-gradient rounded-pill px-4">
          <i className="bi bi-plus-lg me-1"></i> Add Project
        </button>
      </div>

      {/* Alert feedback */}
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <i className={`bi bi-${alert.type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'} me-2`}></i>
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="card portfolio-card p-4 border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Project Title</th>
                  <th>Category</th>
                  <th>Technologies</th>
                  <th>Featured</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      No projects found. Click Add Project to publish one.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project._id}>
                      <td style={{ width: '60px' }}>
                        <img
                          src={project.image || '/assets/projects/project-placeholder.svg'}
                          alt={project.title}
                          className="rounded border object-fit-cover"
                          style={{ width: '48px', height: '48px' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/projects/project-placeholder.svg';
                          }}
                        />
                      </td>
                      <td>
                        <div className="fw-bold">{project.title}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '260px' }}>
                          {project.shortDescription || project.description}
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-secondary-subtle text-body-secondary">
                          {project.category}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1" style={{ maxWidth: '200px' }}>
                          {project.technologies.slice(0, 3).map((t, i) => (
                            <span key={i} className="badge bg-light text-dark border small">
                              {t}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="small text-muted">+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        {project.featured ? (
                          <span className="badge bg-warning text-dark">⭐ Featured</span>
                        ) : (
                          <span className="text-muted small">Standard</span>
                        )}
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => setViewingProject(project)}
                          className="btn btn-sm btn-outline-secondary rounded-circle me-1"
                          title="View Details"
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="btn btn-sm btn-outline-primary rounded-circle me-1"
                          title="Edit Project"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          title="Delete Project"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && editingProject && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content portfolio-card border-0">
              <form onSubmit={handleSave}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingProject._id ? 'Edit Project' : 'Add New Project'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small fw-semibold">Project Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        placeholder="e.g. Coffee Ordering App UI"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Category *</label>
                      <select
                        className="form-select"
                        value={editingProject.category || 'UI/UX Design'}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      >
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Full-Stack Development">Full-Stack Development</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Python Application">Python Application</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Short Summary / Tagline</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingProject.shortDescription || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                        placeholder="Brief one-line summary for cards"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Full Description *</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        required
                        value={editingProject.description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        placeholder="Detailed project description..."
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Technologies (Comma Separated) *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="Figma, UI/UX, React, Node.js"
                        value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : editingProject.technologies || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Project Image URL or SVG Path</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="/assets/projects/coffee-app.svg"
                        value={editingProject.image || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">GitHub Repository URL</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://github.com/priyap/..."
                        value={editingProject.githubUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Live Demo / Figma Community URL</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://..."
                        value={editingProject.liveDemoUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Start Date</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 2025-01-01"
                        value={editingProject.startDate || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">End Date</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 2025-02-15 or Present"
                        value={editingProject.endDate || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, endDate: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Key Features (One per line)</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Login &amp; User Profile&#10;Artisan brew customization&#10;Animated cart management"
                        value={Array.isArray(editingProject.features) ? editingProject.features.join('\n') : editingProject.features || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            features: e.target.value.split('\n').filter(Boolean)
                          })
                        }
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="featuredCheck"
                          checked={Boolean(editingProject.featured)}
                          onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        />
                        <label className="form-check-label small" htmlFor="featuredCheck">
                          Mark as Featured Project on Homepage
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-5">
                    {saving ? 'Saving...' : 'Save Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingProject && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content portfolio-card border-0">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{viewingProject.title}</h5>
                <button type="button" className="btn-close" onClick={() => setViewingProject(null)}></button>
              </div>
              <div className="modal-body">
                <div className="rounded overflow-hidden mb-3 bg-body-secondary text-center p-2">
                  <img
                    src={viewingProject.image || '/assets/projects/project-placeholder.svg'}
                    alt=""
                    style={{ maxHeight: '240px', objectFit: 'contain' }}
                    className="img-fluid"
                  />
                </div>
                <p className="text-body-secondary">{viewingProject.description}</p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {viewingProject.technologies.map((t, idx) => (
                    <span key={idx} className="tech-pill">{t}</span>
                  ))}
                </div>
                {viewingProject.features && viewingProject.features.length > 0 && (
                  <div>
                    <h6 className="fw-bold small text-uppercase text-muted">Features</h6>
                    <ul>
                      {viewingProject.features.map((f, i) => (
                        <li key={i} className="small">{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary btn-sm rounded-pill" onClick={() => setViewingProject(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
