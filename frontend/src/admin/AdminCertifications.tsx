import React, { useState, useEffect } from 'react';
import { certificationService } from '../services/api';
import { Certification } from '../types';

export const AdminCertifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const [editingCert, setEditingCert] = useState<Partial<Certification>>({
    name: '',
    organization: '',
    date: '2025',
    description: '',
    image: '/assets/certifications/google-ux.svg',
    certificatePdf: '',
    credentialUrl: '',
    skillsLearned: [],
    order: 1
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const res = await certificationService.getAll();
      if (res.data.success) {
        setCertifications(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load certifications from MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingCert({
      name: '',
      organization: '',
      date: new Date().getFullYear().toString(),
      description: '',
      image: '/assets/certifications/google-ux.svg',
      certificatePdf: '',
      credentialUrl: '',
      skillsLearned: [],
      order: certifications.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: Certification) => {
    setEditingCert({ ...cert });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      const res = await certificationService.delete(id);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Certification deleted.' });
        fetchCertifications();
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to delete.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingCert._id) {
        await certificationService.update(editingCert._id, editingCert);
        setAlert({ type: 'success', message: 'Certification updated!' });
      } else {
        await certificationService.create(editingCert);
        setAlert({ type: 'success', message: 'New certification created!' });
      }
      setIsModalOpen(false);
      fetchCertifications();
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
          <h2 className="fw-bold mb-1">Certifications Management</h2>
          <p className="text-muted small mb-0">
            Publish verified certificates, credentials, and course achievements.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary-gradient rounded-pill px-4">
          <i className="bi bi-plus-lg me-1"></i> Add Certification
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
                  <th>Preview</th>
                  <th>Certificate Name</th>
                  <th>Organization</th>
                  <th>Date</th>
                  <th>Credential Link</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {certifications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      No certifications found.
                    </td>
                  </tr>
                ) : (
                  certifications.map((cert) => (
                    <tr key={cert._id}>
                      <td style={{ width: '60px' }}>
                        <img
                          src={cert.image || '/assets/certifications/google-ux.svg'}
                          alt=""
                          className="rounded border object-fit-contain p-1"
                          style={{ width: '48px', height: '40px' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/certifications/google-ux.svg';
                          }}
                        />
                      </td>
                      <td>
                        <div className="fw-bold">{cert.name}</div>
                        {cert.description && (
                          <small className="text-muted text-truncate d-block" style={{ maxWidth: '240px' }}>
                            {cert.description}
                          </small>
                        )}
                      </td>
                      <td>{cert.organization}</td>
                      <td>
                        <span className="badge bg-secondary-subtle text-body-secondary">{cert.date}</span>
                      </td>
                      <td>
                        {cert.credentialUrl ? (
                          <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="small text-truncate d-inline-block" style={{ maxWidth: '160px' }}>
                            View Link
                          </a>
                        ) : (
                          <span className="text-muted small">None</span>
                        )}
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => handleOpenEdit(cert)}
                          className="btn btn-sm btn-outline-primary rounded-circle me-2"
                          title="Edit"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(cert._id)}
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
                    {editingCert._id ? 'Edit Certification' : 'Add Certification'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small fw-semibold">Certification Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingCert.name || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                        placeholder="e.g. Google UX Design Professional Certificate"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Year / Date *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingCert.date || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                        placeholder="2025"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Issuing Organization *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={editingCert.organization || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, organization: e.target.value })}
                        placeholder="e.g. Google / Coursera, Meta, MongoDB"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Credential Verification URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={editingCert.credentialUrl || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                        placeholder="https://coursera.org/verify/..."
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Certificate Badge / Image Path</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingCert.image || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, image: e.target.value })}
                        placeholder="/assets/certifications/google-ux.svg"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Skills Learned (Comma Separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={Array.isArray(editingCert.skillsLearned) ? editingCert.skillsLearned.join(', ') : ''}
                        onChange={(e) =>
                          setEditingCert({
                            ...editingCert,
                            skillsLearned: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          })
                        }
                        placeholder="Wireframing, Prototyping, React, UX Research"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={editingCert.description || ''}
                        onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-5">
                    {saving ? 'Saving...' : 'Save Certification'}
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
