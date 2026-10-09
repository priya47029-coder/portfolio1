import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { statsService, messageService } from '../services/api';
import { DashboardStats, ContactMessage } from '../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, msgRes] = await Promise.all([
        statsService.getStats().catch(() => null),
        messageService.getAll().catch(() => null)
      ]);

      if (statsRes?.data?.success) setStats(statsRes.data.data);
      if (msgRes?.data?.success) setRecentMessages(msgRes.data.data.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard Overview</h2>
          <p className="text-muted small mb-0">
            Real-time analytics and statistics fetched dynamically from MongoDB.
          </p>
        </div>
        <button onClick={fetchDashboardData} className="btn btn-outline-secondary btn-sm rounded-pill d-inline-flex align-items-center gap-1">
          <i className="bi bi-arrow-clockwise"></i>
          <span>Refresh Data</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Retrieving statistics from MongoDB...</p>
        </div>
      ) : (
        <>
          {/* Statistics Grid */}
          <div className="row g-4 mb-5">
            {/* Total Projects */}
            <div className="col-sm-6 col-xl-4">
              <div className="card portfolio-card p-4 h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-muted small fw-semibold text-uppercase">Total Projects</span>
                    <h2 className="display-6 fw-bold mt-1 mb-0">{stats?.totalProjects ?? 0}</h2>
                  </div>
                  <div className="p-3 rounded-4 bg-primary-subtle text-primary">
                    <i className="bi bi-kanban fs-3"></i>
                  </div>
                </div>
                <Link to="/admin/projects" className="small text-primary text-decoration-none fw-semibold d-inline-flex align-items-center gap-1">
                  <span>Manage Projects</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Total Skills */}
            <div className="col-sm-6 col-xl-4">
              <div className="card portfolio-card p-4 h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-muted small fw-semibold text-uppercase">Total Skills</span>
                    <h2 className="display-6 fw-bold mt-1 mb-0">{stats?.totalSkills ?? 0}</h2>
                  </div>
                  <div className="p-3 rounded-4 bg-warning-subtle text-warning">
                    <i className="bi bi-stars fs-3"></i>
                  </div>
                </div>
                <Link to="/admin/skills" className="small text-warning text-decoration-none fw-semibold d-inline-flex align-items-center gap-1">
                  <span>Manage Skills</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Total Certifications */}
            <div className="col-sm-6 col-xl-4">
              <div className="card portfolio-card p-4 h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-muted small fw-semibold text-uppercase">Certifications</span>
                    <h2 className="display-6 fw-bold mt-1 mb-0">{stats?.totalCertifications ?? 0}</h2>
                  </div>
                  <div className="p-3 rounded-4 bg-success-subtle text-success">
                    <i className="bi bi-patch-check fs-3"></i>
                  </div>
                </div>
                <Link to="/admin/certifications" className="small text-success text-decoration-none fw-semibold d-inline-flex align-items-center gap-1">
                  <span>Manage Certifications</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Total Experience */}
            <div className="col-sm-6 col-xl-4">
              <div className="card portfolio-card p-4 h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-muted small fw-semibold text-uppercase">Experience Records</span>
                    <h2 className="display-6 fw-bold mt-1 mb-0">{stats?.totalExperience ?? 0}</h2>
                  </div>
                  <div className="p-3 rounded-4 bg-info-subtle text-info">
                    <i className="bi bi-briefcase fs-3"></i>
                  </div>
                </div>
                <Link to="/admin/experience" className="small text-info text-decoration-none fw-semibold d-inline-flex align-items-center gap-1">
                  <span>Manage Experience</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Total Messages */}
            <div className="col-sm-6 col-xl-4">
              <div className="card portfolio-card p-4 h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-muted small fw-semibold text-uppercase">Contact Inquiries</span>
                    <h2 className="display-6 fw-bold mt-1 mb-0">{stats?.totalMessages ?? 0}</h2>
                  </div>
                  <div className="p-3 rounded-4 bg-danger-subtle text-danger">
                    <i className="bi bi-envelope fs-3"></i>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/admin/messages" className="small text-danger text-decoration-none fw-semibold d-inline-flex align-items-center gap-1">
                    <span>View Messages</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                  {stats?.unreadMessages ? (
                    <span className="badge bg-danger">{stats.unreadMessages} New Unread</span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Education Records */}
            <div className="col-sm-6 col-xl-4">
              <div className="card portfolio-card p-4 h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-muted small fw-semibold text-uppercase">Education Records</span>
                    <h2 className="display-6 fw-bold mt-1 mb-0">{stats?.totalEducation ?? 0}</h2>
                  </div>
                  <div className="p-3 rounded-4 bg-secondary-subtle text-secondary">
                    <i className="bi bi-mortarboard fs-3"></i>
                  </div>
                </div>
                <Link to="/admin/education" className="small text-secondary text-decoration-none fw-semibold d-inline-flex align-items-center gap-1">
                  <span>Manage Education</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick CMS Jump Grid */}
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card portfolio-card p-4 h-100 border-0 shadow-sm">
                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-sliders text-primary"></i>
                  <span>CMS Section Shortcuts</span>
                </h5>
                <p className="text-muted small mb-4">
                  Select any section to modify text, images, or configuration without editing React code.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/admin/home" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                    <i className="bi bi-house-door me-1"></i> Edit Home Page
                  </Link>
                  <Link to="/admin/about" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                    <i className="bi bi-person-badge me-1"></i> Edit About
                  </Link>
                  <Link to="/admin/skills" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                    <i className="bi bi-stars me-1"></i> Manage Skills
                  </Link>
                  <Link to="/admin/projects" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                    <i className="bi bi-kanban me-1"></i> Manage Projects
                  </Link>
                  <Link to="/admin/contact" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                    <i className="bi bi-telephone me-1"></i> Edit Contact Info
                  </Link>
                  <Link to="/admin/navbar" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                    <i className="bi bi-layout-text-window-reverse me-1"></i> Navbar Settings
                  </Link>
                  <Link to="/admin/footer" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                    <i className="bi bi-layout-sidebar-inset-reverse me-1"></i> Footer Settings
                  </Link>
                  <Link to="/admin/settings" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                    <i className="bi bi-gear me-1"></i> General Settings
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card portfolio-card p-4 h-100 border-0 shadow-sm">
                <h5 className="fw-bold mb-3 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-envelope text-danger"></i>
                    <span>Recent Inquiries</span>
                  </div>
                  <Link to="/admin/messages" className="small text-decoration-none">
                    View All
                  </Link>
                </h5>

                {recentMessages.length === 0 ? (
                  <p className="text-muted small">No inquiries received yet.</p>
                ) : (
                  <div className="list-group list-group-flush">
                    {recentMessages.map((msg) => (
                      <div key={msg._id} className="list-group-item px-0 py-2 bg-transparent d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-semibold small">{msg.name} <span className="text-muted">({msg.email})</span></div>
                          <div className="text-body-secondary small text-truncate" style={{ maxWidth: '280px' }}>{msg.subject}</div>
                        </div>
                        <span className={`badge rounded-pill ${msg.read ? 'bg-secondary' : 'bg-danger'}`}>
                          {msg.read ? 'Read' : 'New'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
