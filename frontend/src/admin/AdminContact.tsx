import React, { useState, useEffect } from 'react';
import { contactInfoService } from '../services/api';
import { ContactInfo } from '../types';

export const AdminContact: React.FC = () => {
  const [formData, setFormData] = useState<ContactInfo>({
    heading: 'Get In Touch',
    description: 'Have a project in mind, an internship opportunity, or want to discuss UI/UX design & Python development? Drop a message below!',
    email: 'priya.p.it@dce.edu.in',
    phone: '+91 98765 43210',
    location: 'Chennai, Tamil Nadu, India',
    college: 'Dhanalakshmi College of Engineering',
    responseTimeNote: 'Currently responding within 24 hours',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    figma: 'https://figma.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const res = await contactInfoService.get();
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load contact info from MongoDB.' });
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
      const res = await contactInfoService.update(formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Contact details updated successfully in MongoDB!' });
        setFormData(res.data.data);
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to save contact info.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Contact Information CMS</h2>
          <p className="text-muted small mb-0">
            Edit your public email, phone, location address, and social media handles.
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
                <label className="form-label fw-semibold small">Contact Section Heading</label>
                <input
                  type="text"
                  className="form-control"
                  name="heading"
                  value={formData.heading || ''}
                  onChange={handleChange}
                  placeholder="Get In Touch"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="priya.p.it@dce.edu.in"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold small">Contact Intro Description</label>
                <textarea
                  className="form-control"
                  rows={2}
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Phone / Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Location Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  placeholder="Chennai, Tamil Nadu, India"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">College / Institution</label>
                <input
                  type="text"
                  className="form-control"
                  name="college"
                  value={formData.college || ''}
                  onChange={handleChange}
                  placeholder="Dhanalakshmi College of Engineering"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Response Time Status Badge</label>
                <input
                  type="text"
                  className="form-control"
                  name="responseTimeNote"
                  value={formData.responseTimeNote || ''}
                  onChange={handleChange}
                  placeholder="Currently responding within 24 hours"
                />
              </div>

              {/* Social Profiles */}
              <div className="col-12">
                <hr className="my-2" />
                <h5 className="fw-bold mt-2 mb-3">Social &amp; Platform Profiles</h5>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">LinkedIn Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="linkedin"
                  value={formData.linkedin || ''}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">GitHub Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="github"
                  value={formData.github || ''}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Figma Profile / Community URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="figma"
                  value={formData.figma || ''}
                  onChange={handleChange}
                  placeholder="https://figma.com/@..."
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Instagram Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="instagram"
                  value={formData.instagram || ''}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="col-12 mt-4 d-flex justify-content-end">
                <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-5">
                  {saving ? 'Saving...' : 'Save Contact Details'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
