import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUp, Heart } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/content';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-muted)] transition-colors">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#d88ca3] to-[#c9a7eb] dark:from-[#f0a8bd] dark:to-[#d9bdf5] flex items-center justify-center text-[#241a20] font-bold text-sm shadow-md">
                DN
              </div>
              <span className="font-heading font-bold text-lg text-[var(--color-text)]">
                Damsarini Nawela
              </span>
            </div>
            <p className="text-sm text-[var(--color-muted)] max-w-md leading-relaxed">
              Software Engineer & Full-Stack Developer passionate about building high-impact web and mobile applications with React, Node.js, and modern databases.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all hover:scale-105 shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all hover:scale-105 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all hover:scale-105 shadow-sm"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all hover:scale-105 shadow-sm"
                aria-label="Call Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (No Admin link) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[var(--color-accent)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--color-accent)] transition-colors">
                  About Me & Education
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[var(--color-accent)] transition-colors">
                  Projects Archive
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--color-accent)] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-4">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </li>
              <li className="text-xs text-[var(--color-muted)] mt-2">
                Based in {personalInfo.location}. Open for on-site & remote software engineering opportunities.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to top */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="flex items-center gap-1 text-[var(--color-muted)]">
            Crafted with <Heart className="w-3.5 h-3.5 text-[var(--color-accent)] fill-[var(--color-accent)]" /> by Damsarini Nawela • {new Date().getFullYear()}
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;