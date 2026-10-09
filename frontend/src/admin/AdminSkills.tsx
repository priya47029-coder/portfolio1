import React, { useState, useEffect } from 'react';
import { skillService } from '../services/api';
import { Skill } from '../types';

export const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await skillService.getAll();
      if (res.data.success) {
        setSkills(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load skills from MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingSkill({
      name: '',
      category: 'UI/UX',
      level: 85,
      icon: 'bi-stars',
      description: '',
      order: skills.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill({ ...skill });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      const res = await skillService.delete(id);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Skill deleted successfully!' });
        fetchSkills();
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to delete skill.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    try {
      setSaving(true);
      if (editingSkill._id) {
        await skillService.update(editingSkill._id, editingSkill);
        setAlert({ type: 'success', message: 'Skill updated successfully in MongoDB!' });
      } else {
        await skillService.create(editingSkill);
        setAlert({ type: 'success', message: 'New skill created successfully in MongoDB!' });
      }
      setIsModalOpen(false);
      setEditingSkill(null);
      fetchSkills();
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to save skill.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Skills Management</h2>
          <p className="text-muted small mb-0">
            Add, update, or remove technical skills across UI/UX, Programming, Development, and Tools.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary-gradient rounded-pill px-4">
          <i className="bi bi-plus-lg me-1"></i> Add Skill
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
                  <th>Skill Name</th>
                  <th>Category</th>
                  <th>Proficiency Level</th>
                  <th>Icon</th>
                  <th>Description</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      No skills found. Click Add Skill to create one.
                    </td>
                  </tr>
                ) : (
                  skills.map((skill) => (
                    <tr key={skill._id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <i className={`bi ${skill.icon || 'bi-code-slash'} fs-5 text-primary`}></i>
                          <span className="fw-bold">{skill.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary-subtle text-body-secondary">
                          {skill.category}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2" style={{ maxWidth: '180px' }}>
                          <div className="progress flex-grow-1" style={{ height: '6px' }}>
                            <div
                              className="progress-bar bg-primary"
                              role="progressbar"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <small className="fw-bold">{skill.level}%</small>
                        </div>
                      </td>
                      <td>
                        <code className="small">{skill.icon}</code>
                      </td>
                      <td>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                          {skill.description || '—'}
                        </small>
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => handleOpenEdit(skill)}
                          className="btn btn-sm btn-outline-primary rounded-circle me-2"
                          title="Edit"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(skill._id)}
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
      {isModalOpen && editingSkill && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content portfolio-card border-0">
              <form onSubmit={handleSave}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingSkill._id ? 'Edit Skill' : 'Add New Skill'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Skill Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={editingSkill.name || ''}
                      onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                      placeholder="e.g. Python, Figma, React, Node.js"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Category *</label>
                    <select
                      className="form-select"
                      value={editingSkill.category || 'UI/UX'}
                      onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    >
                      <option value="UI/UX">UI/UX</option>
                      <option value="Programming">Programming</option>
                      <option value="Development">Development</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Proficiency Level (0 - 100)%: <span className="text-primary fw-bold">{editingSkill.level}%</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min={10}
                      max={100}
                      value={editingSkill.level || 80}
                      onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Bootstrap Icon Class</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="bi-bezier2, bi-filetype-py, bi-server, bi-git"
                      value={editingSkill.icon || ''}
                      onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Short Description / Subtitle</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Wireframing & interactive prototypes"
                      value={editingSkill.description || ''}
                      onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-4">
                    {saving ? 'Saving...' : 'Save Skill'}
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
