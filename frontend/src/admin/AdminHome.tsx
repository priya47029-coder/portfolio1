import React, { useState, useEffect } from 'react';
import { homeService } from '../services/api';
import { HomeData } from '../types';

export const AdminHome: React.FC = () => {
  const [formData, setFormData] = useState<HomeData>({
    greeting: "Hi, I'm Priya 👋",
    name: 'PRIYA P',
    title: 'B.Tech Information Technology Student',
    subtitle: 'UI/UX Designer | App Developer | Python Enthusiast',
    description: 'I create user-friendly digital experiences and practical applications.',
    profileImage: '/assets/images/priya-profile.svg',
    resumeUrl: '/resume/Priya-Resume.pdf',
    availabilityText: 'Open to Internships & Opportunities',
    location: 'Chennai, Tamil Nadu, India',
    collegeText: 'Dhanalakshmi College of Engineering (2024–2028)',
    primaryButtonText: 'View My Projects',
    primaryButtonLink: '#projects',
    secondaryButtonText: 'Download Resume',
    secondaryButtonLink: '/resume/Priya-Resume.pdf',
    tertiaryButtonText: 'Contact Me',
    tertiaryButtonLink: '#contact',
    techPills: ['Figma', 'Python', 'React', 'Node.js', 'MongoDB']
  });

  const [initialData, setInitialData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const res = await homeService.get();
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
        setInitialData(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load home section data.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTechPillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pills = e.target.value.split(',').map((p) => p.trim()).filter(Boolean);
    setFormData({ ...formData, techPills: pills });
  };

  const handleCancel = () => {
    if (initialData) setFormData(initialData);
    setIsEditing(false);
    setAlert(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setAlert(null);
      const res = await homeService.update(formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Home section data updated successfully in MongoDB!' });
        setInitialData(res.data.data);
        setIsEditing(false);
      } else {
        setAlert({ type: 'danger', message: 'Failed to update home section.' });
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to update data.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Home Section CMS</h2>
          <p className="text-muted small mb-0">
            Edit text, headings, profile image, and CTA links displayed on the main hero banner.
          </p>
        </div>

        <div className="d-flex gap-2">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn btn-primary-gradient rounded-pill px-4">
              <i className="bi bi-pencil-fill me-1"></i> Enable Edit Mode
            </button>
          ) : (
            <>
              <button onClick={handleCancel} disabled={saving} className="btn btn-outline-secondary rounded-pill px-3">
                <i className="bi bi-x-lg me-1"></i> Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="btn btn-success rounded-pill px-4">
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-floppy-fill me-1"></i> Save to MongoDB
                  </>
                )}
              </button>
            </>
          )}
        </div>
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
              {/* Greeting */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Greeting Headline</label>
                <input
                  type="text"
                  className="form-control"
                  name="greeting"
                  disabled={!isEditing}
                  value={formData.greeting}
                  onChange={handleChange}
                  placeholder="Hi, I'm Priya 👋"
                />
              </div>

              {/* Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="PRIYA P"
                />
              </div>

              {/* Title */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Primary Degree / Major Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  disabled={!isEditing}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="B.Tech Information Technology Student"
                />
              </div>

              {/* Subtitle */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Role Subtitle</label>
                <input
                  type="text"
                  className="form-control"
                  name="subtitle"
                  disabled={!isEditing}
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="UI/UX Designer | App Developer | Python Enthusiast"
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label fw-semibold small">Bio Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  name="description"
                  disabled={!isEditing}
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Availability Note */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Availability Status Badge</label>
                <input
                  type="text"
                  className="form-control"
                  name="availabilityText"
                  disabled={!isEditing}
                  value={formData.availabilityText}
                  onChange={handleChange}
                  placeholder="Open to Internships & Opportunities"
                />
              </div>

              {/* Location */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Location Text</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  disabled={!isEditing}
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Chennai, Tamil Nadu, India"
                />
              </div>

              {/* College text */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">College / University Tag</label>
                <input
                  type="text"
                  className="form-control"
                  name="collegeText"
                  disabled={!isEditing}
                  value={formData.collegeText}
                  onChange={handleChange}
                  placeholder="Dhanalakshmi College of Engineering (2024–2028)"
                />
              </div>

              {/* Profile Image URL */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Profile Image URL / Path</label>
                <input
                  type="text"
                  className="form-control"
                  name="profileImage"
                  disabled={!isEditing}
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="/assets/images/priya-profile.svg"
                />
              </div>

              {/* Buttons Configuration */}
              <div className="col-12">
                <hr className="my-2" />
                <h5 className="fw-bold mt-2 mb-3">Buttons &amp; Call to Actions</h5>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Primary Button Text</label>
                <input
                  type="text"
                  className="form-control"
                  name="primaryButtonText"
                  disabled={!isEditing}
                  value={formData.primaryButtonText}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Primary Button Link</label>
                <input
                  type="text"
                  className="form-control"
                  name="primaryButtonLink"
                  disabled={!isEditing}
                  value={formData.primaryButtonLink}
                  onChange={handleChange}
                  placeholder="#projects"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Secondary Button Text</label>
                <input
                  type="text"
                  className="form-control"
                  name="secondaryButtonText"
                  disabled={!isEditing}
                  value={formData.secondaryButtonText}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Secondary Button Link / Resume PDF</label>
                <input
                  type="text"
                  className="form-control"
                  name="secondaryButtonLink"
                  disabled={!isEditing}
                  value={formData.secondaryButtonLink}
                  onChange={handleChange}
                  placeholder="/resume/Priya-Resume.pdf"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Tertiary Button Text</label>
                <input
                  type="text"
                  className="form-control"
                  name="tertiaryButtonText"
                  disabled={!isEditing}
                  value={formData.tertiaryButtonText}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Tertiary Button Link</label>
                <input
                  type="text"
                  className="form-control"
                  name="tertiaryButtonLink"
                  disabled={!isEditing}
                  value={formData.tertiaryButtonLink}
                  onChange={handleChange}
                  placeholder="#contact"
                />
              </div>

              {/* Quick Tech Pills */}
              <div className="col-12">
                <label className="form-label fw-semibold small">Skill Badge Pills (Comma Separated)</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={!isEditing}
                  value={Array.isArray(formData.techPills) ? formData.techPills.join(', ') : ''}
                  onChange={handleTechPillsChange}
                  placeholder="Figma, Python, React, Node.js, MongoDB"
                />
              </div>

              {isEditing && (
                <div className="col-12 mt-4 d-flex justify-content-end gap-2">
                  <button type="button" onClick={handleCancel} className="btn btn-secondary rounded-pill px-4">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary-gradient rounded-pill px-5">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
