import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  Save,
  X,
  Image as ImageIcon,
  LogOut,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { defaultProjects, normalizeProject } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';

const emptyForm = {
  title: '',
  slug: '',
  role: 'Solo Full-Stack Project',
  category: 'Full-Stack',
  description: '',
  problem: '',
  explainability: '',
  stackText: '',
  featuresText: '',
  images: ['/projects/agrolens-ai/2.jpeg'],
  githubUrl: '',
  liveUrl: '',
  featured: true,
  order: 1,
};

const AdminDashboard = () => {
  usePageMeta({
    title: 'Admin Dashboard | Damsarini Nawela',
    description: 'Manage portfolio projects, stack, and screenshot galleries.',
  });

  const navigate = useNavigate();
  const [projects, setProjects] = useState(() =>
    defaultProjects.map(normalizeProject)
  );
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [newImagePath, setNewImagePath] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const startCreate = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      order: projects.length + 1,
      images: [],
    });
    setNewImagePath('');
  };

  const startEdit = (proj) => {
    const normalized = normalizeProject(proj);
    setEditingId(normalized._id || normalized.slug);
    setForm({
      title: normalized.title || '',
      slug: normalized.slug || '',
      role: normalized.role || 'Solo Full-Stack Project',
      category: normalized.category || 'Full-Stack',
      description: normalized.description || '',
      problem: normalized.problem || '',
      explainability: normalized.explainability || '',
      stackText: (normalized.stack || []).join(', '),
      featuresText: (normalized.features || []).join('\n'),
      images: (normalized.images || []).slice(0, 6),
      githubUrl: normalized.githubUrl || '',
      liveUrl: normalized.liveUrl || '',
      featured: Boolean(normalized.featured),
      order: normalized.order || 1,
    });
    setNewImagePath('');
  };

  // Image management (add / remove / reorder, 1 to 6 images)
  const handleAddImage = () => {
    const trimmed = newImagePath.trim();
    if (!trimmed) return;
    if (form.images.length >= 6) {
      setStatusMessage({
        type: 'error',
        text: 'Maximum of 6 images allowed per project.',
      });
      return;
    }
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, trimmed],
    }));
    setNewImagePath('');
  };

  const handleUpdateImageAt = (idx, value) => {
    setForm((prev) => {
      const next = [...prev.images];
      next[idx] = value;
      return { ...prev, images: next };
    });
  };

  const handleRemoveImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleMoveImage = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= form.images.length) return;
    setForm((prev) => {
      const next = [...prev.images];
      const [moved] = next.splice(idx, 1);
      next.splice(targetIdx, 0, moved);
      return { ...prev, images: next };
    });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Title and description are required.',
      });
      return;
    }

    const slug =
      form.slug.trim() ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const stack = form.stackText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const features = form.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const cleanedImages = form.images
      .map((img) => img.trim())
      .filter(Boolean)
      .slice(0, 6);

    if (cleanedImages.length < 1 || cleanedImages.length > 6) {
      setStatusMessage({
        type: 'error',
        text: 'Please provide between 1 and 6 screenshot paths per project.',
      });
      return;
    }

    const payload = normalizeProject({
      _id: editingId || `project-${slug}`,
      title: form.title.trim(),
      slug,
      role: form.role.trim() || 'Solo Full-Stack Project',
      category: form.category,
      description: form.description.trim(),
      problem: form.problem.trim(),
      explainability: form.explainability.trim(),
      stack,
      technologies: stack,
      features,
      images: cleanedImages,
      image: cleanedImages[0] || '/images/projects/portfolio-preview.svg',
      githubUrl: form.githubUrl.trim(),
      liveUrl: form.liveUrl.trim(),
      liveDemoUrl: form.liveUrl.trim(),
      featured: Boolean(form.featured),
      order: Number(form.order) || 1,
    });

    // Try syncing with backend if available
    const token = sessionStorage.getItem('admin_token');
    try {
      if (token && token !== 'local-demo-token') {
        const endpoint = editingId
          ? `http://localhost:8000/api/projects/${editingId}`
          : 'http://localhost:8000/api/projects';
        await fetch(endpoint, {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }
    } catch {
      // Fallback to in-memory state update
    }

    setProjects((prev) => {
      if (editingId) {
        return prev.map((p) =>
          (p._id || p.slug) === editingId ? payload : p
        );
      }
      return [...prev, payload];
    });

    setStatusMessage({
      type: 'success',
      text: editingId
        ? `Updated "${payload.title}" successfully.`
        : `Created "${payload.title}" successfully.`,
    });
    setEditingId(payload._id);
  };

  const handleDeleteProject = (proj) => {
    const id = proj._id || proj.slug;
    setProjects((prev) => prev.filter((p) => (p._id || p.slug) !== id));
    if (editingId === id) {
      startCreate();
    }
    setStatusMessage({
      type: 'success',
      text: `Removed "${proj.title}".`,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--color-border)]">
          <div>
            <Badge variant="rose" size="xs">
              Portfolio CMS
            </Badge>
            <h1 className="font-heading text-3xl font-bold text-[var(--color-text)] mt-2">
              Project Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] font-body">
              Add, edit, or reorder project details and 1–6 screenshot paths per project.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" icon={Plus} onClick={startCreate}>
              New Project
            </Button>
            <Button variant="outline" size="sm" icon={LogOut} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {statusMessage && (
          <div
            role="status"
            className={`mb-6 p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm border ${
              statusMessage.type === 'success'
                ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-accent)]/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="p-1 hover:opacity-75 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project List */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-heading text-lg font-bold text-[var(--color-text)]">
              Projects ({projects.length})
            </h2>

            {projects.map((proj, idx) => {
              const id = proj._id || proj.slug;
              const isSelected = editingId === id;
              return (
                <motion.div
                  key={id}
                  layout
                  className={`p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-[var(--color-accent-soft)]/40 border-[var(--color-accent)]'
                      : 'bg-[var(--color-surface)] border-[var(--color-border)]'
                  } card-elevation flex items-center justify-between gap-3`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[var(--color-accent)]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-heading text-sm font-bold text-[var(--color-text)] truncate">
                        {proj.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--color-muted)] truncate mt-0.5 font-body">
                      {proj.role} · {(proj.images || []).length} image(s)
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(proj)}
                      aria-label={`Edit ${proj.title}`}
                      className="p-2 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-accent-soft)] text-[var(--color-text)] border border-[var(--color-border)] transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj)}
                      aria-label={`Delete ${proj.title}`}
                      className="p-2 rounded-xl bg-[var(--color-surface)] hover:bg-rose-500/20 text-rose-400 border border-[var(--color-border)] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Project Form */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation">
            <h2 className="font-heading text-xl font-bold text-[var(--color-text)] mb-6">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSaveProject} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="AgroLens AI – Explainable Crop Disease Detection"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                    placeholder="agrolens-ai"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                    Role
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    placeholder="Solo full-stack & AI project"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                  Stack (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.stackText}
                  onChange={(e) => setForm((p) => ({ ...p, stackText: e.target.value }))}
                  placeholder="React, FastAPI, MongoDB"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                />
              </div>

              {/* Screenshot Paths Manager (1 to 6 images, add/remove/reorder) */}
              <div className="p-4 rounded-2xl bg-[var(--color-accent-soft)]/25 border border-[var(--color-border)] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[var(--color-accent)]" />
                    <span>Project Screenshots ({form.images.length} / 6)</span>
                  </label>
                  <span className="text-[11px] text-[var(--color-muted)]">
                    e.g. /projects/&lt;slug&gt;/1.png
                  </span>
                </div>

                {/* Existing Image Rows */}
                <div className="space-y-2">
                  {form.images.map((imgPath, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-[var(--color-surface)] p-2 rounded-xl border border-[var(--color-border)]"
                    >
                      <span className="text-xs font-mono font-bold text-[var(--color-accent)] px-1.5">
                        0{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={imgPath}
                        onChange={(e) => handleUpdateImageAt(idx, e.target.value)}
                        aria-label={`Screenshot ${idx + 1} path`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-transparent border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                      />
                      <button
                        type="button"
                        onClick={() => handleMoveImage(idx, -1)}
                        disabled={idx === 0}
                        title="Move up"
                        aria-label={`Move screenshot ${idx + 1} up`}
                        className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveImage(idx, 1)}
                        disabled={idx === form.images.length - 1}
                        title="Move down"
                        aria-label={`Move screenshot ${idx + 1} down`}
                        className="p-1.5 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        title="Remove image"
                        aria-label={`Remove screenshot ${idx + 1}`}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/15 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Image Input */}
                {form.images.length < 6 && (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={newImagePath}
                      onChange={(e) => setNewImagePath(e.target.value)}
                      placeholder={`/projects/${form.slug || 'project-slug'}/${
                        form.images.length + 1
                      }.png`}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      icon={Plus}
                      onClick={handleAddImage}
                    >
                      Add Image
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm((p) => ({ ...p, githubUrl: e.target.value }))}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                    Live URL (optional)
                  </label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm((p) => ({ ...p, liveUrl: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5">
                  Key Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={form.featuresText}
                  onChange={(e) => setForm((p) => ({ ...p, featuresText: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button type="submit" variant="glow" size="md" icon={Save}>
                  {editingId ? 'Save Changes' : 'Create Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
