import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Target,
  Compass,
  Lightbulb,
  Rocket,
  Download,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import SectionHeading from '../components/SectionHeading';
import { personalInfo, education, skillCategories } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';

const About = () => {
  usePageMeta({
    title: 'About Me | Damsarini Nawela - Software Engineer',
    description:
      'Learn about Damsarini Nawela, an Information Technology student specializing in Full-Stack Web and Mobile Application Development.',
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Heading */}
        <SectionHeading
          badge="Profile Overview"
          title="About"
          highlight="Me"
          subtitle="Education, technical competencies, and aspirations of a future Full-Stack Software Engineer."
        />

        {/* 1. ABOUT ME & CAREER OBJECTIVE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left Column: Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[var(--color-text)]">
                Who I Am 🌸
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-body">
              <p>
                I am an HNDIT student at the Advanced Technological Institute with a strong interest in software development, web applications, and mobile app development.
              </p>
              <p>
                I enjoy learning new technologies and turning ideas into practical, user-friendly applications. Through my academic work and personal projects, I have gained hands-on experience in building modern web applications and developing full-stack solutions.
              </p>
              <p>
                I am passionate about solving problems, writing clean code, and continuously improving my skills. My goal is to grow as a software developer and gain real-world industry experience.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center gap-4 font-body">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)]" />
                <span>Available for Work</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Career Objective */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#1f1a2e]/40 via-[var(--color-surface)] to-[var(--color-surface)] border border-[var(--color-accent)]/30 card-elevation"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[var(--color-text)]">
                Career Objective
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[var(--color-text)] leading-relaxed italic border-l-2 border-[var(--color-gold)] pl-4 my-4 font-body">
              "{personalInfo.objective}"
            </p>

            <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mt-4 font-body">
              Passionate about software development, building user-friendly applications, and continuously learning new technologies to create practical digital solutions.
            </p>

            <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex justify-start">
              <Button href="/cv.pdf" variant="outline" size="sm" icon={Download} download>
                Download Complete CV (PDF)
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 2. EDUCATION TIMELINE LAYOUT */}
        <section className="mb-16">
          <SectionHeading
            badge="Academic Journey"
            title="Education &"
            highlight="Qualifications"
            subtitle="My academic trajectory in technology and science."
            align="left"
          />

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--color-gold)]/40 space-y-10">
            {education.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-8 h-8 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)] shadow-md">
                  <GraduationCap className="w-4 h-4" />
                </div>

                <div className="rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation hover:border-[var(--color-gold)]/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="font-heading text-xl font-bold text-[var(--color-text)]">
                      {item.degree}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] w-fit font-body">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      {item.period}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-[var(--color-accent)] mb-3 font-body">
                    {item.institution}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-body">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. DETAILED TECHNICAL SKILLS */}
        <section className="mb-16">
          <SectionHeading
            badge="Deep Dive"
            title="Comprehensive"
            highlight="Technical Skills"
            subtitle="Full breakdown of languages, frameworks, databases, and development utilities."
            align="left"
          />

          <div className="flex flex-wrap justify-center gap-6">
            {skillCategories.map((category, catIdx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: catIdx * 0.1 }}
                className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation flex flex-col justify-between"
              >
                <h4 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4 flex items-center justify-between">
                  <span>{category.name} Proficiency</span>
                  <Badge variant="rose" size="xs">
                    {category.skills.length} Technologies
                  </Badge>
                </h4>

                <div className="space-y-4 font-body">
                  {category.skills.map((s) => {
                    const dotsCount = s.dots || Math.min(5, Math.max(1, Math.round((s.level / 100) * 5)));
                    return (
                      <div key={s.name}>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-[var(--color-text)]">
                            {s.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium text-[var(--color-muted)]">
                              {s.level}%
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

                        {/* Dynamic Animated Progress Bar bound to s.level */}
                        <div className="w-full h-1.5 rounded-full bg-[var(--color-border)]/50 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.level}%` }}
                            style={{ width: `${s.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="h-full rounded-full bg-gradient-to-r from-[#d88ca3] to-[#c9a7eb] dark:from-[#f0a8bd] dark:to-[#d9bdf5]"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. INTERESTS, CURRENTLY EXPLORING, FUTURE GOALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 font-body">
          {/* Development Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">
                Development Interests
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-muted)]">
                {personalInfo.interests.map((interest, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Currently Exploring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#c9a7eb]/20 text-[#c9a7eb] dark:text-[#d9bdf5] flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">
                Currently Exploring
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-muted)]">
                {personalInfo.currentlyExploring.map((tech, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent-2)] mt-1.5 flex-shrink-0" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Future Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#d4af7a]/20 text-[#d4af7a] dark:text-[#e6c894] flex items-center justify-center mb-4">
                <Rocket className="w-5 h-5" />
              </div>
              <h4 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">
                Future Goals
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-muted)]">
                {personalInfo.futureGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#d4af7a] dark:text-[#e6c894] mt-0.5 flex-shrink-0" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA Footer in About */}
        <div className="text-center pt-8 border-t border-[var(--color-border)] font-body">
          <p className="text-base text-[var(--color-text)] mb-4 font-heading">
            Interested in viewing what I have built?
          </p>
          <div className="flex justify-center gap-4">
            <Button to="/projects" variant="glow" size="md" icon={ArrowRight} iconPosition="right">
              Explore Projects
            </Button>
            <Button to="/contact" variant="secondary" size="md">
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;