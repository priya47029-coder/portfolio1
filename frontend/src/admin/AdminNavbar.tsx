import React, { useState, useEffect } from 'react';
import { navbarService } from '../services/api';
import { NavbarData, NavbarItem } from '../types';

export const AdminNavbar: React.FC = () => {
  const [formData, setFormData] = useState<NavbarData>({
    brandName: 'Priya',
    brandHighlight: 'P',
    logoLetter: 'P',
    logoUrl: '',
    resumeButtonText: 'Resume',
    resumeButtonLink: '/resume/Priya-Resume.pdf',
    items: [
      { name: 'Home', href: '#home', visible: true, order: 1 },
      { name: 'About', href: '#about', visible: true, order: 2 },
      { name: 'Skills', href: '#skills', visible: true, order: 3 },
      { name: 'Projects', href: '#projects', visible: true, order: 4 },
      { name: 'Education', href: '#education', visible: true, order: 5 },
      { name: 'Certifications', href: '#certifications', visible: true, order: 6 },
      { name: 'Experience', href: '#experience', visible: true, order: 7 },
      { name: 'Contact', href: '#contact', visible: true, order: 8 }
    ]
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  // New item modal
  const [newItemName, setNewItemName] = useState('');
  const [newItemHref, setNewItemHref] = useState('');

  useEffect(() => {
    fetchNavbarData();
  }, []);

  const fetchNavbarData = async () => {
    try {
      setLoading(true);
      const res = await navbarService.get();
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load navbar config from MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisible = (index: number) => {
    const updated = [...formData.items];
    updated[index].visible = !updated[index].visible;
    setFormData({ ...formData, items: updated });
  };

  const handleItemNameChange = (index: number, newName: string) => {
    const updated = [...formData.items];
    updated[index].name = newName;
    setFormData({ ...formData, items: updated });
  };

  const handleItemOrderChange = (index: number, newOrder: number) => {
    const updated = [...formData.items];
    updated[index].order = newOrder;
    setFormData({ ...formData, items: updated });
  };

  const handleDeleteItem = (index: number) => {
    const updated = [...formData.items];
    updated.splice(index, 1);
    setFormData({ ...formData, items: updated });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemHref) return;

    const updated = [
      ...formData.items,
      {
        name: newItemName,
        href: newItemHref,
        visible: true,
        order: formData.items.length + 1
      }
    ];

    setFormData({ ...formData, items: updated });
    setNewItemName('');
    setNewItemHref('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setAlert(null);
      const res = await navbarService.update(formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Navbar configuration saved to MongoDB!' });
        setFormData(res.data.data);
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to save navbar.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Navbar CMS Management</h2>
          <p className="text-muted small mb-0">
            Customize navigation menu items, order, show/hide toggles, brand letters, and resume buttons.
          </p>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn btn-primary-gradient rounded-pill px-4">
          {saving ? (
            <>
              <span className="spinner-border spinner-border-sm me-1"></span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="bi bi-floppy-fill me-1"></i> Save to MongoDB
            </>
          )}
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
        <div className="row g-4">
          {/* Brand & Resume settings */}
          <div className="col-lg-5">
            <div className="card portfolio-card p-4 p-md-5 border-0 shadow-sm h-100">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-badge-ad text-primary"></i>
                <span>Brand &amp; Logo Settings</span>
              </h5>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Brand Primary Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.brandName || ''}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="Priya"
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Brand Highlight Word/Letter</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.brandHighlight || ''}
                  onChange={(e) => setFormData({ ...formData, brandHighlight: e.target.value })}
                  placeholder="P"
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Icon Avatar Letter</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.logoLetter || ''}
                  onChange={(e) => setFormData({ ...formData, logoLetter: e.target.value })}
                  placeholder="P"
                  maxLength={2}
                />
              </div>

              <hr className="my-4" />

              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-file-earmark-arrow-down text-primary"></i>
                <span>Resume Navbar Button</span>
              </h5>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Button Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.resumeButtonText || ''}
                  onChange={(e) => setFormData({ ...formData, resumeButtonText: e.target.value })}
                  placeholder="Resume"
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Download File URL / Path</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.resumeButtonLink || ''}
                  onChange={(e) => setFormData({ ...formData, resumeButtonLink: e.target.value })}
                  placeholder="/resume/Priya-Resume.pdf"
                />
              </div>
            </div>
          </div>

          {/* Menu Items Table & Manager */}
          <div className="col-lg-7">
            <div className="card portfolio-card p-4 p-md-5 border-0 shadow-sm h-100">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-list-nested text-primary"></i>
                <span>Navigation Menu Items</span>
              </h5>
              <p className="text-muted small mb-3">
                Edit label names, change display order, or toggle item visibility.
              </p>

              <div className="table-responsive mb-4">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Order</th>
                      <th>Menu Label</th>
                      <th>Target Link</th>
                      <th>Visible</th>
                      <th className="text-end">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(formData.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            style={{ width: '55px' }}
                            value={item.order}
                            onChange={(e) => handleItemOrderChange(idx, Number(e.target.value))}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.name}
                            onChange={(e) => handleItemNameChange(idx, e.target.value)}
                          />
                        </td>
                        <td>
                          <code className="small text-muted">{item.href}</code>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Boolean(item.visible)}
                              onChange={() => handleToggleVisible(idx)}
                            />
                          </div>
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(idx)}
                            className="btn btn-sm btn-outline-danger rounded-circle"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Menu Item Mini Form */}
              <div className="p-3 rounded-3 bg-body-tertiary border">
                <h6 className="fw-bold small mb-2">Add Custom Menu Item</h6>
                <form onSubmit={handleAddItem} className="row g-2 align-items-center">
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Menu Name (e.g. Blog)"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Link (#blog or /blog)"
                      value={newItemHref}
                      onChange={(e) => setNewItemHref(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-2">
                    <button type="submit" className="btn btn-sm btn-primary-gradient w-100 rounded-pill">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
