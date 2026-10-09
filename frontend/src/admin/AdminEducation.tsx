import React, { useState, useEffect } from 'react';
import { educationService } from '../services/api';
import { Education } from '../types';

export const AdminEducation: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const [editingEdu, setEditingEdu] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    fieldOfStudy: 'Information Technology',
    duration: '2024 – 2028',
    startYear: '2024',
    endYear: '2028',
    location: 'Chennai, Tamil Nadu, India',
    grade: '',
    description: '',
    highlights: [],
    order: 1
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const res = await educationService.getAll();
      if (res.data.success) {
        setEducationList(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load education from MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingEdu({
      institution: '',
      degree: '',
      fieldOfStudy: 'Information Technology',
      duration: '2024 – 2028',
      startYear: '2024',
      endYear: '2028',
      location: 'Chennai, Tamil Nadu, India',
      grade: '',
      description: '',
      highlights: [],
      order: educationList.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingEdu({ ...edu });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this education record?')) return;
    try {
      const res = await educationService.delete(id);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Education record deleted.' });
        fetchEducation();
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to delete.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingEdu._id) {
        await educationService.update(editingEdu._id, editingEdu);
        setAlert({ type: 'success', message: 'Education record updated!' });
      } else {
        await educationService.create(editingEdu);
        setAlert({ type: 'success', message: 'New education record created!' });
      }
      setIsModalOpen(false);
      fetchEducation();
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
          <h2 className="fw-bold mb-1">Education Management</h2>
          <p className="text-muted small mb-0">
            Add, update, or remove academic qualifications and degree milestones.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary-gradient rounded-pill px-4">
          <i className="bi bi-plus-lg me-1"></i> Add Education
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
                  <th>Degree / Program</th>
                  <th>Institution</th>
                  <th>Duration</th>
                  <th>Location</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {educationList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      No education records found.
                    </td>
                  </tr>
                ) : (
                  educationList.map((edu) => (
                    <tr key={edu._id}>
                      <td className="fw-bold">{edu.degree}</td>
                      <td>{edu.institution}</td>
                      <td>
                        <span className="badge bg-primary-subtle text-primary">
                          {edu.duration}
                        </span>
                      </td>
                      <td>{edu.location || '—'}</td>
                      <td className="text-end">
                        <button
                          onClick={() => handleOpenEdit(edu)}
                          className="btn btn-sm btn-outline-primary rounded-circle me-2"
                          title="Edit"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(edu._id)}
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
                    {editingEdu._id ? 'Edit Education Record' : 'Add Education Record'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Degree / Program *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingEdu.degree || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                        placeholder="e.g. Bachelor of Technology – Information Technology"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Institution Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingEdu.institution || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                        placeholder="e.g. Dhanalakshmi College of Engineering"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Field of Study</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingEdu.fieldOfStudy || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, fieldOfStudy: e.target.value })}
                        placeholder="Information Technology"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Duration Text (e.g. 2024 – 2028) *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingEdu.duration || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, duration: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingEdu.location || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, location: e.target.value })}
                        placeholder="Chennai, Tamil Nadu, India"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Grade / Score</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingEdu.grade || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                        placeholder="e.g. First Class (Pursuing)"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Academic Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={editingEdu.description || ''}
                        onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Highlights (one per line)</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Core subjects: Data Structures, Python, DBMS&#10;Member of Coding Club"
                        value={Array.isArray(editingEdu.highlights) ? editingEdu.highlights.join('\n') : ''}
                        onChange={(e) =>
                          setEditingEdu({
                            ...editingEdu,
                            highlights: e.target.value.split('\n').filter(Boolean)
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-5">
                    {saving ? 'Saving...' : 'Save Education'}
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
