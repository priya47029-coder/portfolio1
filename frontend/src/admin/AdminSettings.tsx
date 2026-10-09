import React, { useState, useEffect } from 'react';
import { settingsService } from '../services/api';
import { SiteSettings } from '../types';

export const AdminSettings: React.FC = () => {
  const [formData, setFormData] = useState<SiteSettings>({
    websiteTitle: 'Priya P | UI/UX Designer & App Developer',
    metaDescription: 'Portfolio of Priya P - B.Tech IT Student, UI/UX Designer, App Developer, and Python Enthusiast from Chennai, India.',
    logo: '/favicon.svg',
    favicon: '/favicon.svg',
    primaryColor: '#4f46e5',
    secondaryColor: '#ec4899',
    defaultTheme: 'dark',
    footerText: 'Designed & Built with React, TypeScript & MongoDB'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await settingsService.get();
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load site settings from MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setAlert(null);
      const res = await settingsService.update(formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Site settings updated successfully in MongoDB!' });
        setFormData(res.data.data);
        if (formData.websiteTitle) {
          document.title = formData.websiteTitle;
        }
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to update site settings.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">General Site Settings</h2>
          <p className="text-muted small mb-0">
            Configure SEO metadata, color accents, default themes, and system defaults.
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
                <label className="form-label small fw-semibold">Browser Window / Website Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="websiteTitle"
                  value={formData.websiteTitle || ''}
                  onChange={handleChange}
                  placeholder="Priya P | UI/UX Designer & App Developer"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Favicon URL / Path</label>
                <input
                  type="text"
                  className="form-control"
                  name="favicon"
                  value={formData.favicon || ''}
                  onChange={handleChange}
                  placeholder="/favicon.svg"
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold">SEO Meta Description</label>
                <textarea
                  className="form-control"
                  rows={2}
                  name="metaDescription"
                  value={formData.metaDescription || ''}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Primary Brand Color</label>
                <div className="input-group">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    name="primaryColor"
                    value={formData.primaryColor || '#4f46e5'}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="primaryColor"
                    value={formData.primaryColor || '#4f46e5'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Secondary Accent Color</label>
                <div className="input-group">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    name="secondaryColor"
                    value={formData.secondaryColor || '#ec4899'}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="secondaryColor"
                    value={formData.secondaryColor || '#ec4899'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Default Theme Mode</label>
                <select
                  className="form-select"
                  name="defaultTheme"
                  value={formData.defaultTheme || 'dark'}
                  onChange={handleChange}
                >
                  <option value="dark">Dark Mode (Developer Theme)</option>
                  <option value="light">Light Mode</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Footer Tagline</label>
                <input
                  type="text"
                  className="form-control"
                  name="footerText"
                  value={formData.footerText || ''}
                  onChange={handleChange}
                  placeholder="Designed & Built with React, TypeScript & MongoDB"
                />
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end">
                <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-5">
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
