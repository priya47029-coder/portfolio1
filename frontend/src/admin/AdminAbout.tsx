import React, { useState, useEffect } from 'react';
import { aboutService } from '../services/api';
import { AboutData, AboutCard } from '../types';

export const AdminAbout: React.FC = () => {
  const [formData, setFormData] = useState<AboutData>({
    badge: 'Get To Know Me',
    heading: 'About Me',
    subheading: 'Bridging aesthetics and code to create digital experiences that delight users and solve practical real-world problems.',
    bioParagraph1: '',
    bioParagraph2: '',
    profileImage: '/assets/images/priya-profile.svg',
    careerInterests: ['UI/UX Design', 'Mobile Application Development', 'Python Programming', 'Web Technologies', 'Data Analytics'],
    location: 'Chennai, Tamil Nadu',
    degree: 'B.Tech – IT (2024–2028)',
    languages: 'English, Tamil',
    focusTitle: 'My Core Focus Areas',
    focusDescription: '',
    focusPoints: [],
    cards: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  // Card modal state
  const [editingCard, setEditingCard] = useState<AboutCard | null>(null);
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await aboutService.get();
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Failed to load about section data.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.value.split(',').map((i) => i.trim()).filter(Boolean);
    setFormData({ ...formData, careerInterests: list });
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setAlert(null);
      const res = await aboutService.update(formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'About section and cards saved to MongoDB!' });
        setFormData(res.data.data);
      }
    } catch (err: any) {
      setAlert({ type: 'danger', message: err.response?.data?.message || 'Failed to save data.' });
    } finally {
      setSaving(false);
    }
  };

  // Card operations
  const handleOpenAddCard = () => {
    setEditingCard({
      title: '',
      description: '',
      icon: 'bi-stars',
      badge: '',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
      order: (formData.cards || []).length + 1
    });
    setCardIndex(null);
    setIsCardModalOpen(true);
  };

  const handleOpenEditCard = (card: AboutCard, index: number) => {
    setEditingCard({ ...card });
    setCardIndex(index);
    setIsCardModalOpen(true);
  };

  const handleDeleteCard = (index: number) => {
    if (!window.confirm('Delete this card?')) return;
    const updatedCards = [...formData.cards];
    updatedCards.splice(index, 1);
    setFormData({ ...formData, cards: updatedCards });
  };

  const handleSaveCardModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    const updatedCards = [...(formData.cards || [])];
    if (cardIndex !== null) {
      updatedCards[cardIndex] = editingCard;
    } else {
      updatedCards.push(editingCard);
    }

    setFormData({ ...formData, cards: updatedCards });
    setIsCardModalOpen(false);
    setEditingCard(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">About Section CMS</h2>
          <p className="text-muted small mb-0">
            Customize biographical narratives, specialization pillars, and career interest tags.
          </p>
        </div>

        <button onClick={handleSaveAll} disabled={saving} className="btn btn-primary-gradient rounded-pill px-4">
          {saving ? (
            <>
              <span className="spinner-border spinner-border-sm me-1"></span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="bi bi-floppy-fill me-1"></i> Save Changes
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
          {/* Main Info Card */}
          <div className="col-lg-7">
            <div className="card portfolio-card p-4 p-md-5 border-0 shadow-sm h-100">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <i className="bi bi-file-text text-primary"></i>
                <span>About Content &amp; Narrative</span>
              </h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Badge Text</label>
                  <input
                    type="text"
                    className="form-control"
                    name="badge"
                    value={formData.badge || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Section Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    name="heading"
                    value={formData.heading || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small">Subheading / Brief Summary</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subheading"
                    value={formData.subheading || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small">Bio Paragraph 1</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    name="bioParagraph1"
                    value={formData.bioParagraph1 || ''}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small">Bio Paragraph 2</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    name="bioParagraph2"
                    value={formData.bioParagraph2 || ''}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small">Career Interests (Comma Separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={Array.isArray(formData.careerInterests) ? formData.careerInterests.join(', ') : ''}
                    onChange={handleInterestsChange}
                    placeholder="UI/UX Design, Mobile Apps, Python, Web Technologies, Data Analytics"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cards Manager */}
          <div className="col-lg-5">
            <div className="card portfolio-card p-4 p-md-5 border-0 shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  <i className="bi bi-grid-fill text-primary"></i>
                  <span>About Cards ({formData.cards?.length || 0})</span>
                </h5>
                <button type="button" onClick={handleOpenAddCard} className="btn btn-primary-gradient btn-sm rounded-pill px-3">
                  <i className="bi bi-plus-lg me-1"></i> Add Card
                </button>
              </div>

              <div className="d-flex flex-column gap-3">
                {(formData.cards || []).length === 0 ? (
                  <p className="text-muted small">No cards added. Click Add Card above.</p>
                ) : (
                  formData.cards.map((card, idx) => (
                    <div key={idx} className="p-3 rounded-3 bg-body-tertiary border d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2 overflow-hidden">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '36px', height: '36px', background: card.gradient || '#4f46e5' }}
                        >
                          <i className={`bi ${card.icon || 'bi-stars'}`}></i>
                        </div>
                        <div className="overflow-hidden">
                          <div className="fw-bold small text-truncate">{card.title}</div>
                          <div className="text-muted small text-truncate" style={{ fontSize: '0.75rem' }}>{card.description}</div>
                        </div>
                      </div>

                      <div className="d-flex gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEditCard(card, idx)}
                          className="btn btn-sm btn-outline-primary rounded-circle"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCard(idx)}
                          className="btn btn-sm btn-outline-danger rounded-circle"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Edit Modal */}
      {isCardModalOpen && editingCard && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content portfolio-card border-0">
              <form onSubmit={handleSaveCardModal}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {cardIndex !== null ? 'Edit About Card' : 'Add About Card'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setIsCardModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Card Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={editingCard.title}
                      onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                      placeholder="e.g. B.Tech IT, UI/UX Design, Python"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Description *</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      required
                      value={editingCard.description}
                      onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Bootstrap Icon Class</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCard.icon}
                      onChange={(e) => setEditingCard({ ...editingCard, icon: e.target.value })}
                      placeholder="bi-mortarboard-fill, bi-palette-fill, bi-phone-fill, bi-filetype-py"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Badge Pill Text</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCard.badge}
                      onChange={(e) => setEditingCard({ ...editingCard, badge: e.target.value })}
                      placeholder="e.g. 2024 – 2028, Figma & Prototyping"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">CSS Gradient Background</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCard.gradient}
                      onChange={(e) => setEditingCard({ ...editingCard, gradient: e.target.value })}
                      placeholder="linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setIsCardModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-gradient rounded-pill px-4">
                    Save Card
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
