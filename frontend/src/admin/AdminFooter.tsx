import React, { useState, useEffect } from 'react';
import { footerService } from '../services/api';
import { FooterData } from '../types';

export const AdminFooter: React.FC = () => {
  const [formData, setFormData] = useState<FooterData>({
    brandName: 'Priya',
    brandHighlight: 'P',
    logoLetter: 'P',
    description: 'B.Tech Information Technology Student @ Dhanalakshmi College of Engineering, Chennai (2024–2028). Building intuitive digital experiences & modern software applications.',
    copyrightText: 'Priya P. All rights reserved. Crafted with React, TypeScript & MongoDB.',
    location: 'Chennai, Tamil Nadu, India 📍',
    email: 'priya.p.it@dce.edu.in',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      setLoading(true);
      const res = await footerService.get();
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load footer data from MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setAlert(null);
      const res = await footerService.update(formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Footer configuration updated in MongoDB!' });
        setFormData(res.data.data);
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to save footer.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Footer CMS Management</h2>
          <p className="text-muted small mb-0">
            Customize footer copyright text, summary bio, location line, and social links.
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
        <div className="card portfolio-card p-4 p-md-5 border-0 shadow-sm">
          <form onSubmit={handleSave}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Brand Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="brandName"
                  value={formData.brandName || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Brand Highlight</label>
                <input
                  type="text"
                  className="form-control"
                  name="brandHighlight"
                  value={formData.brandHighlight || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold">Footer Description Bio</label>
                <textarea
                  className="form-control"
                  rows={2}
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Copyright Text Line</label>
                <input
                  type="text"
                  className="form-control"
                  name="copyrightText"
                  value={formData.copyrightText || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Location Display Line</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Footer Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">GitHub URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="github"
                  value={formData.github || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">LinkedIn URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="linkedin"
                  value={formData.linkedin || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Instagram URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="instagram"
                  value={formData.instagram || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end">
                <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-5">
                  {saving ? 'Saving...' : 'Save Footer Settings'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
