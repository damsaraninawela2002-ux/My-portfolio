import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Github } from './Icons';
import Badge from './Badge';

const ProjectCard = ({ project, onSelect, index = 0 }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation hover:border-[var(--color-accent)]/50 transition-all duration-300"
    >
      {/* Thumbnail Container */}
      <div
        className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#131826] cursor-pointer"
        onClick={() => onSelect(project)}
      >
        <img
          src={project.image || '/images/projects/portfolio-preview.svg'}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/projects/portfolio-preview.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="rose" size="xs">
            {project.category || 'Full-Stack'}
          </Badge>
        </div>

        {/* Hover Quick-inspect Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#0B0F17]/40 backdrop-blur-[2px] transition-opacity duration-300">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-text)] shadow-lg border border-[var(--color-border)]">
            <span>Inspect Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3
          onClick={() => onSelect(project)}
          className="font-heading text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors cursor-pointer line-clamp-1"
          title={project.title}
        >
          {project.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-[var(--color-muted)] line-clamp-2 leading-relaxed flex-1 font-body">
          {project.description}
        </p>

        {/* Feature Highlights (Bullet points) */}
        {project.features && project.features.length > 0 && (
          <ul className="mt-3.5 space-y-1.5 pt-3 border-t border-[var(--color-border)]">
            {project.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-[var(--color-muted)] line-clamp-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies?.slice(0, 4).map((tech, idx) => (
            <Badge key={idx} variant="lavender" size="xs">
              {tech}
            </Badge>
          ))}
          {project.technologies?.length > 4 && (
            <span className="text-[10px] text-[var(--color-muted)] self-center">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-2.5">
          <button
            onClick={() => onSelect(project)}
            className="text-xs font-semibold text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 cursor-pointer py-1"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {(project.github || project.githubUrl) && (
              <a
                href={project.github || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--color-text)] bg-[var(--color-surface)] hover:bg-[var(--color-accent-soft)]/70 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all hover:scale-102 shadow-sm"
                title="View on GitHub"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]/50 border border-[var(--color-border)] transition-colors"
                title="Live Demo"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
