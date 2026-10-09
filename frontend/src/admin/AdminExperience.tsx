import React, { useState, useEffect } from 'react';
import { experienceService } from '../services/api';
import { Experience } from '../types';

export const AdminExperience: React.FC = () => {
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const [editingExp, setEditingExp] = useState<Partial<Experience>>({
    position: '',
    company: '',
    location: 'Chennai, India',
    startDate: '',
    endDate: 'Present',
    description: '',
    technologies: [],
    companyLogo: '',
    order: 1
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const res = await experienceService.getAll();
      if (res.data.success) {
        setExperienceList(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load experience from MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingExp({
      position: '',
      company: '',
      location: 'Chennai, India',
      startDate: '',
      endDate: 'Present',
      description: '',
      technologies: [],
      companyLogo: '',
      order: experienceList.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp({ ...exp });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      const res = await experienceService.delete(id);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Experience record deleted.' });
        fetchExperience();
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to delete.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingExp._id) {
        await experienceService.update(editingExp._id, editingExp);
        setAlert({ type: 'success', message: 'Experience record updated!' });
      } else {
        await experienceService.create(editingExp);
        setAlert({ type: 'success', message: 'New experience record added!' });
      }
      setIsModalOpen(false);
      fetchExperience();
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Experience Management</h2>
          <p className="text-muted small mb-0">
            Manage internships, leadership roles, and technical project positions.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary-gradient rounded-pill px-4">
          <i className="bi bi-plus-lg me-1"></i> Add Experience
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
                  <th>Job Title / Role</th>
                  <th>Company / Team</th>
                  <th>Duration</th>
                  <th>Location</th>
                  <th>Technologies</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experienceList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      No experience records found.
                    </td>
                  </tr>
                ) : (
                  experienceList.map((exp) => (
                    <tr key={exp._id}>
                      <td className="fw-bold">{exp.position}</td>
                      <td>{exp.company}</td>
                      <td>
                        <span className="badge bg-success-subtle text-success">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </td>
                      <td>{exp.location || '—'}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-1" style={{ maxWidth: '200px' }}>
                          {(exp.technologies || []).slice(0, 3).map((t, i) => (
                            <span key={i} className="badge bg-light text-dark border small">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => handleOpenEdit(exp)}
                          className="btn btn-sm btn-outline-primary rounded-circle me-2"
                          title="Edit"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(exp._id)}
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          title="Delete"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content portfolio-card border-0">
              <form onSubmit={handleSave}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingExp._id ? 'Edit Experience' : 'Add Experience Entry'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Position / Job Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingExp.position || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                        placeholder="e.g. UI/UX Design Intern"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Company / Organization *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingExp.company || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                        placeholder="e.g. TechSprint Digital Studio"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Start Date *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingExp.startDate || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                        placeholder="e.g. Jan 2025"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">End Date</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingExp.endDate || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                        placeholder="e.g. Present"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingExp.location || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                        placeholder="Chennai, India"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Technologies (Comma Separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={Array.isArray(editingExp.technologies) ? editingExp.technologies.join(', ') : ''}
                        onChange={(e) =>
                          setEditingExp({
                            ...editingExp,
                            technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          })
                        }
                        placeholder="Figma, Wireframing, React, Python"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Job Description *</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        required
                        value={editingExp.description || ''}
                        onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-5">
                    {saving ? 'Saving...' : 'Save Experience'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
