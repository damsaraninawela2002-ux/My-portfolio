import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/content';

const Hero = ({
  name = personalInfo.name,
  roles = personalInfo.roles,
  bio = personalInfo.objective,
  cvUrl = '/cv.pdf',
  profileImage = '/images/profile.jpg',
  socials = {
    github: personalInfo.github || 'https://github.com',
    linkedin: personalInfo.linkedin || 'https://linkedin.com',
    email: personalInfo.email,
  },
}) => {
  // Lightweight native typewriter effect without external libraries
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const currentWord = roles[roleIndex % roles.length];

    if (isPaused) {
      const pauseDuration = isDeleting ? 350 : 1800; // Pause after typing vs after deleting
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting((prev) => !prev);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    const typingSpeed = isDeleting ? 40 : 85;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (subIndex < currentWord.length) {
          setSubIndex((prev) => prev + 1);
        } else {
          setIsPaused(true);
        }
      } else {
        if (subIndex > 0) {
          setSubIndex((prev) => prev - 1);
        } else {
          setIsPaused(true);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [subIndex, isDeleting, isPaused, roleIndex, roles]);

  const currentRole = roles[roleIndex % roles.length] || '';
  const displayedText = currentRole.substring(0, subIndex);

  return (
    <section className="hero-section" aria-label="Hero Section">
      <div className="container hero-container">
        {/* Left Column: Intro & Call-to-Actions */}
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">{name}</h1>

          {/* Animated Typewriter Role */}
          <div
            className="hero-role-wrapper"
            aria-live="polite"
            aria-atomic="true"
            aria-label={`Role: ${currentRole}`}
          >
            <span>I build solutions as a&nbsp;</span>
            <span className="hero-role-dynamic">
              {displayedText}
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>
          </div>

          {/* Props-driven Intro Paragraph */}
          <p className="hero-bio">{bio}</p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <Link to="/projects" className="btn btn-primary">
              View Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <a
              href={cvUrl}
              download="Damsarini_CV.pdf"
              className="btn btn-outline"
              aria-label="Download CV as PDF"
            >
              Download CV
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials" aria-label="Social Profiles">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}

            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}

            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                className="social-link"
                aria-label="Send Email"
                title="Email Me"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Floating Profile Image */}
        <div className="hero-image-col">
          <div className="hero-image-frame">
            <div className="hero-image-glow" aria-hidden="true" />
            <img
              src={profileImage}
              alt={`${name} portrait`}
              className="hero-profile-img"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
