import React, { useState, useEffect } from 'react';
import { contactInfoService } from '../services/api';
import { ContactInfo } from '../types';

export const ContactSection: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
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
    instagram: 'https://instagram.com'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await contactInfoService.get();
      if (res.data.success && res.data.data) {
        setContactInfo(res.data.data);
      }
    } catch (err) {
      console.error('Contact info load fallback:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      const res = await contactInfoService.submitMessage(formData);

      if (res.data.success) {
        setSuccessMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setValidated(false);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact submit error:', err);
      const backendMsg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setErrorMessage(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge rounded-pill text-bg-primary px-3 py-2 text-uppercase mb-2">
            Let's Connect
          </span>
          <h2 className="display-6 fw-bold">{contactInfo.heading || 'Get In Touch'}</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            {contactInfo.description}
          </p>
        </div>

        <div className="row g-5 justify-content-center">
          {/* Left Column: Direct Contact Info */}
          <div className="col-lg-5">
            <div className="portfolio-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="h4 fw-bold mb-3">Contact Information</h4>
                <p className="text-body-secondary mb-4">
                  Feel free to reach out directly through email or connect with me across professional platforms.
                </p>

                <div className="d-flex flex-column gap-4">
                  {/* Location */}
                  {contactInfo.location && (
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-3 bg-primary-subtle text-primary p-3 d-flex align-items-center justify-content-center">
                        <i className="bi bi-geo-alt-fill fs-5"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block text-uppercase fw-semibold">Location</small>
                        <span className="fw-semibold">{contactInfo.location}</span>
                      </div>
                    </div>
                  )}

                  {/* College */}
                  {contactInfo.college && (
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-3 bg-info-subtle text-info p-3 d-flex align-items-center justify-content-center">
                        <i className="bi bi-mortarboard-fill fs-5"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block text-uppercase fw-semibold">College</small>
                        <span className="fw-semibold">{contactInfo.college}</span>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {contactInfo.email && (
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-3 bg-danger-subtle text-danger p-3 d-flex align-items-center justify-content-center">
                        <i className="bi bi-envelope-fill fs-5"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block text-uppercase fw-semibold">Email</small>
                        <a href={`mailto:${contactInfo.email}`} className="fw-semibold text-decoration-none">
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Social & Code profiles */}
                  <div className="d-flex align-items-start gap-3">
                    <div className="rounded-3 bg-success-subtle text-success p-3 d-flex align-items-center justify-content-center">
                      <i className="bi bi-share-fill fs-5"></i>
                    </div>
                    <div>
                      <small className="text-muted d-block text-uppercase fw-semibold">Social Profiles</small>
                      <div className="d-flex flex-wrap gap-2 mt-1">
                        {contactInfo.github && (
                          <a
                            href={contactInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '36px', height: '36px' }}
                            title="GitHub"
                          >
                            <i className="bi bi-github"></i>
                          </a>
                        )}
                        {contactInfo.linkedin && (
                          <a
                            href={contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '36px', height: '36px' }}
                            title="LinkedIn"
                          >
                            <i className="bi bi-linkedin"></i>
                          </a>
                        )}
                        {contactInfo.figma && (
                          <a
                            href={contactInfo.figma}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '36px', height: '36px' }}
                            title="Figma"
                          >
                            <i className="bi bi-bezier2"></i>
                          </a>
                        )}
                        {contactInfo.instagram && (
                          <a
                            href={contactInfo.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-warning rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '36px', height: '36px' }}
                            title="Instagram"
                          >
                            <i className="bi bi-instagram"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              {contactInfo.responseTimeNote && (
                <div className="mt-4 pt-4 border-top">
                  <div className="p-3 rounded-3 bg-body-tertiary border">
                    <div className="d-flex align-items-center gap-2 text-success small fw-semibold">
                      <span className="spinner-grow spinner-grow-sm"></span>
                      <span>{contactInfo.responseTimeNote}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="col-lg-7">
            <div className="portfolio-card p-4 p-md-5">
              <h4 className="h4 fw-bold mb-3">Send a Direct Message</h4>
              <p className="text-body-secondary small mb-4">
                Submissions are processed through our Express REST API and stored dynamically in MongoDB.
              </p>

              {/* Feedback Alerts */}
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-4" role="alert">
                  <i className="bi bi-check-circle-fill fs-5"></i>
                  <div>
                    <strong>Success!</strong> {successMessage}
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSuccessMessage(null)}
                  ></button>
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                  <div>
                    <strong>Error:</strong> {errorMessage}
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setErrorMessage(null)}
                  ></button>
                </div>
              )}

              {/* Form */}
              <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-semibold small">
                      Your Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">Please enter your name.</div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold small">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-3 py-2"
                      id="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">Please provide a valid email address.</div>
                  </div>

                  {/* Subject */}
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label fw-semibold small">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2"
                      id="subject"
                      name="subject"
                      required
                      placeholder="e.g. Project Inquiry / UI/UX Role"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">Please provide a subject.</div>
                  </div>

                  {/* Message */}
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold small">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control rounded-3 py-2"
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    <div className="invalid-feedback">Please enter your message.</div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary-gradient btn-lg rounded-pill w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Sending Message to MongoDB...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-fill"></i>
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
