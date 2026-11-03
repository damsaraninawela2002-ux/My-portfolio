import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { Github, Linkedin, WhatsApp } from '../components/Icons';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import SectionDivider from '../components/SectionDivider';
import { CONTACT } from '../config/contact';
import { usePageMeta } from '../hooks/usePageMeta';

const Contact = () => {
  usePageMeta({
    title: 'Contact | Damsarini Nawela - Get in Touch',
    description:
      'Send a message to Damsarini Nawela for internship opportunities, project collaborations, or ideas.',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const name = formData.name.trim();
    const email = formData.email.trim() || 'Not provided';
    const subject = formData.subject.trim() || 'Not provided';
    const message = formData.message.trim();

    const text = `Hi Damsarini, I found your portfolio.\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank', 'noopener,noreferrer');

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setShowSuccess(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Let's Connect"
          title="Let's build something"
          highlight="together."
          subtitle="Have an internship opportunity, a project, or an idea? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Contact Links */}
          <div className="lg:col-span-5 w-full space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation space-y-5"
            >
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">
                Contact Information
              </h3>

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--color-accent-soft)]/40 hover:bg-[var(--color-accent-soft)]/70 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all group"
              >
                <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[var(--color-muted)] font-body">
                    Email
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors font-body truncate">
                    {CONTACT.email}
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--color-accent-soft)]/40 hover:bg-[var(--color-accent-soft)]/70 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all group"
              >
                <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex-shrink-0">
                  <WhatsApp className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[var(--color-muted)] font-body">
                    WhatsApp
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors font-body truncate">
                    {CONTACT.whatsappDisplay}
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--color-accent-soft)]/40 hover:bg-[var(--color-accent-soft)]/70 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all group"
              >
                <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex-shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[var(--color-muted)] font-body">
                    LinkedIn
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors font-body break-all">
                    {CONTACT.linkedin}
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--color-accent-soft)]/40 hover:bg-[var(--color-accent-soft)]/70 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all group"
              >
                <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex-shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[var(--color-muted)] font-body">
                    GitHub
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors font-body break-all">
                    {CONTACT.github}
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 w-full rounded-3xl p-6 sm:p-10 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">
                  Send Me a Message
                </h3>
                <p className="text-xs text-[var(--color-muted)] font-body">
                  Fill in the details below to message me directly on WhatsApp.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name Field (Required) */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
                  >
                    Name <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border text-[var(--color-text)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-rose-400 focus:ring-rose-400/30'
                        : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field (Optional) */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
                  >
                    Email <span className="text-[10px] font-normal normal-case text-[var(--color-muted)]">(optional)</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. recruiter@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border text-[var(--color-text)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-rose-400 focus:ring-rose-400/30'
                        : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field (Optional) */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
                >
                  Subject <span className="text-[10px] font-normal normal-case text-[var(--color-muted)]">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Internship Opportunity / Project Collaboration"
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)] transition-all"
                />
              </div>

              {/* Message Field (Required) */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2"
                >
                  Message <span className="text-[var(--color-accent)]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Damsarini, I'd love to discuss an opportunity..."
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border text-[var(--color-text)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? 'border-rose-400 focus:ring-rose-400/30'
                      : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]'
                  }`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  className="w-full"
                  icon={WhatsApp}
                  iconPosition="left"
                >
                  Send via WhatsApp
                </Button>

                {/* Success Message below the button */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                      role="status"
                      aria-live="polite"
                      className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[var(--color-accent)]"
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Opening WhatsApp…</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>

        <SectionDivider variant="wave" className="mt-16" />
      </div>
    </div>
  );
};

export default Contact;
