import React, { useState, useEffect } from 'react';
import { messageService } from '../services/api';
import { ContactMessage } from '../types';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await messageService.getAll();
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load contact messages.' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id: string) => {
    try {
      const res = await messageService.markRead(id);
      if (res.data.success) {
        fetchMessages();
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: 'Failed to toggle message read status.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message from MongoDB?')) return;
    try {
      const res = await messageService.delete(id);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Message deleted successfully.' });
        if (viewingMessage?._id === id) setViewingMessage(null);
        fetchMessages();
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: 'Failed to delete message.' });
    }
  };

  const handleOpenView = (msg: ContactMessage) => {
    setViewingMessage(msg);
    if (!msg.read) {
      handleToggleRead(msg._id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Contact Messages</h2>
          <p className="text-muted small mb-0">
            View, review, and reply to client and visitor inquiries submitted from the public contact form.
          </p>
        </div>

        <button onClick={fetchMessages} className="btn btn-outline-secondary btn-sm rounded-pill d-inline-flex align-items-center gap-1">
          <i className="bi bi-arrow-clockwise"></i>
          <span>Refresh Messages</span>
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
                  <th>Sender Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      No inquiries received yet.
                    </td>
                  </tr>
                ) : (
                  messages.map((m) => (
                    <tr key={m._id} className={!m.read ? 'table-active' : ''}>
                      <td className="fw-bold">{m.name}</td>
                      <td>
                        <a href={`mailto:${m.email}`} className="text-decoration-none">
                          {m.email}
                        </a>
                      </td>
                      <td>
                        <div className="text-truncate" style={{ maxWidth: '240px' }}>
                          {m.subject}
                        </div>
                      </td>
                      <td>
                        <small className="text-muted">
                          {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'}
                        </small>
                      </td>
                      <td>
                        <span
                          onClick={() => handleToggleRead(m._id)}
                          style={{ cursor: 'pointer' }}
                          className={`badge rounded-pill ${m.read ? 'bg-secondary' : 'bg-danger'}`}
                          title="Click to toggle read status"
                        >
                          {m.read ? 'Read' : 'New'}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => handleOpenView(m)}
                          className="btn btn-sm btn-outline-primary rounded-circle me-2"
                          title="View Message Details"
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(m._id)}
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          title="Delete Message"
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

      {/* View Details Modal */}
      {viewingMessage && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content portfolio-card border-0">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Message from {viewingMessage.name}</h5>
                <button type="button" className="btn-close" onClick={() => setViewingMessage(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <small className="text-muted d-block text-uppercase fw-semibold">Email</small>
                  <a href={`mailto:${viewingMessage.email}`} className="fw-semibold text-primary">
                    {viewingMessage.email}
                  </a>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block text-uppercase fw-semibold">Subject</small>
                  <div className="fw-semibold">{viewingMessage.subject}</div>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block text-uppercase fw-semibold">Sent Date</small>
                  <div className="small text-muted">
                    {viewingMessage.createdAt ? new Date(viewingMessage.createdAt).toLocaleString() : '—'}
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block text-uppercase fw-semibold">Message</small>
                  <div className="p-3 rounded bg-body-tertiary border mt-1" style={{ whiteSpace: 'pre-wrap' }}>
                    {viewingMessage.message}
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  onClick={() => handleDelete(viewingMessage._id)}
                >
                  <i className="bi bi-trash me-1"></i> Delete
                </button>
                <div className="d-flex gap-2">
                  <a
                    href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(viewingMessage.subject)}`}
                    className="btn btn-primary-gradient btn-sm rounded-pill"
                  >
                    <i className="bi bi-reply-fill me-1"></i> Reply via Email
                  </a>
                  <button type="button" className="btn btn-secondary btn-sm rounded-pill" onClick={() => setViewingMessage(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
