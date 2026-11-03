import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, CheckCircle2, Briefcase, Layers } from 'lucide-react';
import { Github } from './Icons';
import Badge from './Badge';
import Button from './Button';
import ProjectCarousel from './ProjectCarousel';
import { normalizeProject } from '../data/content';

const ProjectCard = ({ project: rawProject, onSelect, index = 0 }) => {
  const project = normalizeProject(rawProject);
  const numberLabel = String(index + 1).padStart(2, '0');
  const isImageRightOnDesktop = index % 2 === 1;

  const stackList =
    Array.isArray(project.stack) && project.stack.length > 0
      ? project.stack
      : project.technologies || [];

  const liveLink = project.liveUrl || project.liveDemoUrl;
  const githubLink = project.githubUrl || project.github;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.25) }}
      className="group relative rounded-3xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation hover:border-[var(--color-accent)]/50 transition-all duration-300 p-5 sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
        {/* Carousel Column (alternates left / right on desktop, stacked top on mobile) */}
        <div
          className={`lg:col-span-6 ${
            isImageRightOnDesktop ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <ProjectCarousel
            images={project.images}
            title={project.title}
            isPhone={project.category === 'Mobile App' || project.slug === 'easy-calculator'}
          />
        </div>

        {/* Details Column */}
        <div
          className={`lg:col-span-6 flex flex-col justify-between ${
            isImageRightOnDesktop ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div>
            {/* Top Meta Row: Number Label + Category Badge */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="font-heading text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d88ca3] via-[#c9a7eb] to-[#d4af7a] dark:from-[#f0a8bd] dark:via-[#d9bdf5] dark:to-[#e6c894]">
                  {numberLabel}
                </span>
                <span className="h-4 w-[1.5px] bg-[var(--color-border)]" />
                <Badge variant="rose" size="xs">
                  {project.category || 'Full-Stack'}
                </Badge>
              </div>
            </div>

            {/* Title */}
            <h3
              onClick={() => onSelect && onSelect(project)}
              className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors cursor-pointer leading-snug"
              title={project.title}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-muted)] line-clamp-2 leading-relaxed font-body">
              {project.description}
            </p>

            {/* Role Line */}
            {project.role && (
              <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-body">
                <Briefcase className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
                <span className="font-semibold text-[var(--color-text)]">Role:</span>
                <span className="text-[var(--color-muted)]">{project.role}</span>
              </div>
            )}

            {/* Stack Line ("React · FastAPI · MongoDB") */}
            {stackList.length > 0 && (
              <div className="mt-2.5 flex items-start gap-2 text-xs sm:text-sm font-body">
                <Layers className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[var(--color-text)] mr-1.5">
                    Stack:
                  </span>
                  <span className="text-[var(--color-muted)] leading-relaxed">
                    {stackList.join(' · ')}
                  </span>
                </div>
              </div>
            )}

            {/* Feature Highlights (first 2 bullets) */}
            {project.features && project.features.length > 0 && (
              <ul className="mt-4 space-y-1.5 pt-3.5 border-t border-[var(--color-border)]">
                {project.features.slice(0, 2).map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[var(--color-muted)] line-clamp-1 font-body"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                    <span className="truncate">{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action Buttons: GitHub, Live demo (if liveUrl present), View details */}
          <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center gap-3">
            {githubLink && (
              <Button
                href={githubLink}
                variant="secondary"
                size="sm"
                icon={Github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
              >
                GitHub
              </Button>
            )}

            {liveLink && (
              <Button
                href={liveLink}
                variant="glow"
                size="sm"
                icon={ExternalLink}
                iconPosition="right"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title}`}
              >
                Live demo
              </Button>
            )}

            {onSelect && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(project)}
                icon={ArrowUpRight}
                iconPosition="right"
              >
                View details
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
