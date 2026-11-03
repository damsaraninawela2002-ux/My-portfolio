import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, AlertCircle, Sparkles, Briefcase } from 'lucide-react';
import { Github } from './Icons';
import Badge from './Badge';
import Button from './Button';
import { normalizeProject } from '../data/content';

const ProjectDetailModal = ({ project: rawProject, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!rawProject) return null;

  const project = normalizeProject(rawProject);
  const stackList =
    Array.isArray(project.stack) && project.stack.length > 0
      ? project.stack
      : project.technologies || [];
  const liveLink = project.liveUrl || project.liveDemoUrl;
  const githubLink = project.githubUrl || project.github;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0F17]/80 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-2xl bg-[var(--color-surface)] rounded-3xl shadow-2xl border border-[var(--color-border)] overflow-hidden z-10 my-8"
          >
            {/* Header Image */}
            <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-[#131826]">
              <img
                src={project.image || '/images/projects/portfolio-preview.svg'}
                alt={project.title}
                className={`w-full h-full ${
                  project.category === 'Mobile App' || project.slug === 'easy-calculator'
                    ? 'object-contain bg-[#111722]'
                    : 'object-cover'
                } object-center opacity-90`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/projects/portfolio-preview.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#0B0F17]/60 hover:bg-[#0B0F17]/90 text-white backdrop-blur-md transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category Badge overlay */}
              <div className="absolute bottom-4 left-6">
                <Badge variant="rose" size="md">
                  {project.category || 'Full-Stack'}
                </Badge>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
                {project.title}
              </h3>

              {project.role && (
                <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm font-body">
                  <Briefcase className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
                  <span className="font-semibold text-[var(--color-text)]">Role:</span>
                  <span className="text-[var(--color-muted)]">{project.role}</span>
                </div>
              )}

              <p className="mt-3 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-body">
                {project.description}
              </p>

              {/* The Problem */}
              {project.problem && (
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-[var(--color-accent)]" />
                    The Problem
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-body">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Why Explainability Matters */}
              {project.explainability && (
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
                    Why Explainability Matters
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-body">
                    {project.explainability}
                  </p>
                </div>
              )}

              {/* Key Features List */}
              {project.features && project.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                    Key Architecture & Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-muted)] font-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Used */}
              {stackList.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-[var(--color-accent)]" />
                    Technologies & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stackList.map((tech, idx) => (
                      <Badge key={idx} variant="lavender" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {liveLink && (
                    <Button
                      href={liveLink}
                      variant="glow"
                      size="sm"
                      icon={ExternalLink}
                      iconPosition="right"
                    >
                      Live Demo
                    </Button>
                  )}
                  {githubLink && (
                    <Button
                      href={githubLink}
                      variant="secondary"
                      size="sm"
                      icon={Github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                    </Button>
                  )}
                </div>

                <Button variant="ghost" size="sm" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
