import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Terminal,
  Code2,
  Globe,
  Smartphone,
  Server,
  Database,
  Wrench,
  Sparkles,
  Layers,
  Brain,
  Cpu,
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import { personalInfo, whatIDo, skillCategories, defaultProjects, heroStats } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';

const iconMap = {
  Globe: Globe,
  Smartphone: Smartphone,
  Server: Server,
  Database: Database,
  Layout: Layers,
  Wrench: Wrench,
  Brain: Brain,
  Cpu: Cpu,
};

const Home = () => {
  usePageMeta({
    title: 'Damsarini Nawela | Software Engineer & Full-Stack Developer',
    description:
      'Portfolio of Damsarini Nawela, a software engineer and full-stack developer proficient in React, Node.js, Python, MongoDB, and MySQL.',
  });

  // Typewriter effect state
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Selected project for detail modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Static featured projects directly from content.js (top 4 in order)
  const featuredProjects = defaultProjects.filter((p) => p.featured).slice(0, 4);

  useEffect(() => {
    const roles = personalInfo.roles;
    const currentRole = roles[currentRoleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 45);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText === currentRole) {
          timer = setTimeout(() => setIsDeleting(true), 1900);
        }
      }, 95);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <div className="min-h-screen pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
        {/* Gentle low-opacity rose-to-lavender gradient overlay sitting subtly on top of base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/5 via-transparent to-[var(--color-accent-2)]/5 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[550px] sm:h-[550px] bg-[#d88ca3]/12 dark:bg-[#f0a8bd]/8 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#c9a7eb]/12 dark:bg-[#d9bdf5]/8 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Name Heading in Playfair Display */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.18]"
              >
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d88ca3] via-[#c9a7eb] to-[#d4af7a] dark:from-[#f0a8bd] dark:via-[#d9bdf5] dark:to-[#e6c894]">
                  {personalInfo.name}
                </span>
              </motion.h1>

              {/* Animated Role Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--color-text)] min-h-[36px] font-body"
              >
                <Terminal className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                <span>{displayedText}</span>
                <span className="w-0.5 h-6 bg-[var(--color-accent)] animate-pulse" />
              </motion.div>

              {/* Short Intro */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-5 text-base sm:text-lg text-[var(--color-muted)] max-w-xl leading-relaxed font-body"
              >
                {personalInfo.shortBio}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <Button to="/projects" variant="glow" size="lg" icon={ArrowRight} iconPosition="right">
                  View Projects
                </Button>

                <Button to="/contact" variant="secondary" size="lg">
                  Contact Me
                </Button>

                <Button
                  href="/cv.pdf"
                  variant="outline"
                  size="lg"
                  icon={Download}
                  title="Download Resume"
                  download
                >
                  Download CV
                </Button>
              </motion.div>

              {/* Key Highlights Metrics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-[var(--color-border)] w-full max-w-md font-body"
              >
                <div>
                  <div className="font-heading text-2xl font-bold text-[var(--color-text)]">
                    {heroStats.completedCertifications}
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">Completed Certifications</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-[var(--color-text)]">
                    {heroStats.projectsCount}
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">Projects</div>
                </div>
                <div>
                  <div className="font-heading text-2xl font-bold text-[var(--color-text)]">
                    {heroStats.techSkillsCount}
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">Tech Skills</div>
                </div>
              </motion.div>
            </div>

            {/* Right Visual / Avatar Column */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Soft Rose/Lavender Glow ring effect */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#f0a8bd] via-[#d9bdf5] to-[#e6c894] opacity-40 blur-xl animate-pulse" />

                {/* Outer frame */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-b from-[#f0a8bd]/50 to-[#d9bdf5]/30 border-2 border-[#f0a8bd]/40 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[var(--color-surface)]">
                    <img
                      src="/images/profile.jpeg"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/favicon.svg';
                      }}
                    />
                  </div>
                </div>

                {/* Floating badge 1: Full-Stack */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-2 -right-4 bg-[var(--color-surface)] backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[var(--color-border)] flex items-center gap-2 card-elevation"
                >
                  <Code2 className="w-4 h-4 text-[var(--color-accent)]" />
                  <span className="text-xs font-semibold text-[var(--color-text)]">
                    Full-Stack
                  </span>
                </motion.div>

                {/* Floating badge 2: Fast Learner */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-[var(--color-surface)] backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[var(--color-border)] flex items-center gap-2 card-elevation"
                >
                  <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
                  <span className="text-xs font-semibold text-[var(--color-text)]">
                    Fast Learner
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHORT ABOUT SECTION */}
      <section className="py-16 sm:py-20 bg-[var(--color-surface)]/30 border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              badge="About Me"
              title="Driven by Curiosity,"
              highlight="Committed to Code"
              subtitle="Get to know the person behind the software."
            />

            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed font-body">
              I am an Information Technology student at the Advanced Technological Institute, with a keen focus on web applications, backend engineering, and intuitive mobile interfaces. I pride myself on turning software engineering concepts into reliable, elegant, and user-friendly digital experiences.
            </p>

            <div className="mt-8 flex justify-center">
              <Button to="/about" variant="outline" size="md" icon={ArrowRight} iconPosition="right">
                Learn More About My Background
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS / TECH STACK SECTION */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Technical Arsenal"
            title="Skills &"
            highlight="Technologies"
            subtitle=""
          />

          <div className="flex flex-wrap justify-center gap-6">
            {skillCategories.map((category, catIdx) => {
              const CategoryIcon = iconMap[category.icon] || Code2;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: catIdx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation hover:border-[var(--color-accent)]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">
                        {category.name}
                      </h3>
                    </div>

                    {/* Skill Items */}
                    <div className="space-y-4">
                      {category.skills.map((skill) => {
                        const dotsCount = skill.dots || Math.min(5, Math.max(1, Math.round((skill.level / 100) * 5)));
                        return (
                          <div key={skill.name}>
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="font-semibold text-[var(--color-text)] font-body">
                                {skill.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-[var(--color-muted)] font-body">
                                  {skill.level}%
                                </span>
                                {/* Dot Indicators */}
                                <div className="flex items-center gap-1" title={`${dotsCount}/5 rating`}>
                                  {[...Array(5)].map((_, i) => (
                                    <span
                                      key={i}
                                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                        i < dotsCount
                                          ? 'bg-[var(--color-accent)]'
                                          : 'bg-[var(--color-border)]'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Dynamic Animated Progress Bar bound to skill.level */}
                            <div className="w-full h-1.5 rounded-full bg-[var(--color-border)]/50 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                style={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full rounded-full bg-gradient-to-r from-[#d88ca3] to-[#c9a7eb] dark:from-[#f0a8bd] dark:to-[#d9bdf5]"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border)] text-[11px] text-[var(--color-muted)] text-center font-body">
                    Practical Project Experience
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SECTION */}
      <section className="py-16 sm:py-24 bg-[var(--color-surface)]/30 border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/30 mb-3 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                Featured Work
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)]">
                Selected{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d88ca3] via-[#c9a7eb] to-[#d4af7a] dark:from-[#f0a8bd] dark:via-[#d9bdf5] dark:to-[#e6c894]">
                  Projects
                </span>
              </h2>
            </div>

            <div className="mt-4 sm:mt-0">
              <Button to="/projects" variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View All Projects
              </Button>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project._id || project.slug || idx}
                project={project}
                index={idx}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT I DO SECTION (4 Icon Cards) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Expertise"
            title="What I"
            highlight="Do"
            subtitle="Delivering end-to-end software solutions across web, mobile, and backend architectures."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatIDo.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Globe;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation hover:border-[var(--color-accent)]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d88ca3] to-[#c9a7eb] dark:from-[#f0a8bd] dark:to-[#d9bdf5] text-[#241a20] flex items-center justify-center shadow-md shadow-[#f0a8bd]/20 mb-5">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mb-4 font-body">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-1.5 font-body">
                    {item.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-accent-soft)] text-[var(--color-text)] font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-[#131826] via-[#1f1a2e] to-[#0B0F17] text-[#f7ecef] shadow-2xl border border-[var(--color-accent)]/30"
          >
            {/* Ambient light effects inside banner */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f0a8bd]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#d9bdf5]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/30 mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Let's Collaborate
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
                Let's build something together.
              </h2>

              <p className="text-base sm:text-lg text-[#f7ecef]/80 mb-8 max-w-xl mx-auto leading-relaxed font-body">
                Whether you have a project in mind or just want to connect — my inbox is always open.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button to="/contact" variant="glow" size="lg" icon={ArrowRight} iconPosition="right">
                  Contact Me Now
                </Button>
                <Button to="/projects" variant="secondary" size="lg">
                  Explore Projects
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Home;
