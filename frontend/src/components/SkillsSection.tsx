import React, { useState, useEffect } from 'react';
import { Skill } from '../types';
import { skillService } from '../services/api';

export const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await skillService.getAll();
      if (res.data.success && Array.isArray(res.data.data)) {
        setSkills(res.data.data);
      } else {
        setSkills([]);
      }
    } catch (err) {
      console.error('Failed to load skills:', err);
      setError('Unable to load skills from the database. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'UI/UX', 'Programming', 'Development', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  // Function to map icon string to Bootstrap Icon or fallback
  const getIconClass = (icon: string) => {
    if (!icon) return 'bi bi-code-slash';
    if (icon.startsWith('bi-')) return `bi ${icon}`;
    return `bi ${icon}`;
  };

  // Color mapping based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'UI/UX':
        return '#ec4899';
      case 'Programming':
        return '#10b981';
      case 'Development':
        return '#4f46e5';
      case 'Tools':
        return '#06b6d4';
      default:
        return '#6366f1';
    }
  };

  return (
    <section id="skills" className="section-padding py-5">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge rounded-pill text-bg-primary px-3 py-2 text-uppercase mb-2">
            Dynamic Expertise
          </span>
          <h2 className="display-6 fw-bold">Technical Skills &amp; Proficiencies</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Loaded dynamically from MongoDB. Constantly evolving skill set refined through coursework, real-world projects, and dedicated prototyping.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn rounded-pill px-4 py-2 fw-semibold transition-all ${
                activeCategory === cat
                  ? 'btn-primary-gradient shadow-sm'
                  : 'btn-outline-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading skills...</span>
            </div>
            <p className="mt-2 text-muted">Retrieving skills from MongoDB...</p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center justify-content-between mx-auto" style={{ maxWidth: '650px' }}>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill fs-5"></i>
              <span>{error}</span>
            </div>
            <button onClick={fetchSkills} className="btn btn-sm btn-outline-danger">
              Retry
            </button>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && !error && (
          <div className="row g-4">
            {filteredSkills.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No skills found for this category.</p>
              </div>
            ) : (
              filteredSkills.map((skill) => {
                const color = getCategoryColor(skill.category);
                return (
                  <div key={skill._id} className="col-md-6 col-lg-3">
                    <div className="card h-100 portfolio-card p-4">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center text-white"
                          style={{
                            width: '46px',
                            height: '46px',
                            backgroundColor: color,
                            boxShadow: `0 4px 12px ${color}40`
                          }}
                        >
                          <i className={`${getIconClass(skill.icon)} fs-5`}></i>
                        </div>
                        <span
                          className="badge rounded-pill fw-semibold"
                          style={{
                            backgroundColor: `${color}15`,
                            color: color,
                            border: `1px solid ${color}30`
                          }}
                        >
                          {skill.category}
                        </span>
                      </div>

                      <h5 className="card-title fw-bold mb-2">{skill.name}</h5>

                      <div className="mt-auto pt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-body-secondary">Proficiency</small>
                          <small className="fw-bold" style={{ color: color }}>
                            {skill.level}%
                          </small>
                        </div>
                        <div className="progress" style={{ height: '7px' }}>
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: color
                            }}
                            aria-valuenow={skill.level}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};
