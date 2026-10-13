import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FolderGit2 } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { defaultProjects } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';

const categories = ['All', 'Full-Stack', 'Web App', 'Mobile App', 'Backend'];

const Projects = () => {
  usePageMeta({
    title: 'Projects Archive | Damsarini Nawela',
    description:
      'Explore full-stack web and mobile engineering projects built by Damsarini Nawela, including FraudGuard AI, Inventory Management System, and Galaxy Cinema.',
  });

  // Pure static data directly from content.js
  const [projects] = useState(defaultProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects by category and real-time search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' ||
        project.category === activeCategory ||
        (Array.isArray(project.categories) && project.categories.includes(activeCategory));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title?.toLowerCase().includes(q) ||
        project.description?.toLowerCase().includes(q) ||
        project.technologies?.some((tech) => tech.toLowerCase().includes(q)) ||
        project.features?.some((feat) => feat.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeading
          badge="Portfolio Showcase"
          title="Featured"
          highlight="Projects"
          subtitle="Explore interactive full-stack applications, mobile apps, and systems engineering projects with live demos and source code."
        />

        {/* CONTROLS BAR: Search & Category Filter Pills */}
        <div className="mb-10 space-y-6">
          {/* Real-Time Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-muted)]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, technology (e.g. React, MySQL), or keywords..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] transition-all text-sm shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Framer Motion layout animation) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#241a20]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface)] hover:bg-[var(--color-accent-soft)]/50 border border-[var(--color-border)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#d88ca3] to-[#c9a7eb] dark:from-[#f0a8bd] dark:to-[#d9bdf5] rounded-2xl shadow-md shadow-[#f0a8bd]/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Active filter summary count */}
          <div className="flex items-center justify-between text-xs text-[var(--color-muted)] max-w-7xl mx-auto px-1">
            <span>
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
            {(activeCategory !== 'All' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-[var(--color-accent)] hover:underline font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* PROJECTS GRID with layout animation */}
        {filteredProjects.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project._id || project.slug || idx}
                  project={project}
                  index={idx}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search Results State */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-4 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation max-w-md mx-auto"
          >
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center mx-auto mb-4">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">
              No Projects Found
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-2 mb-6 leading-relaxed">
              No projects matched your search criteria for "{searchQuery}" in "{activeCategory}".
            </p>
            <Button variant="primary" size="sm" onClick={clearFilters}>
              Reset All Filters
            </Button>
          </motion.div>
        )}

        {/* Extensible note banner */}
        <div className="text-center text-xs text-[var(--color-muted)]">
          Content is statically updated directly from <code className="text-[var(--color-accent)]">src/data/content.js</code>.
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
