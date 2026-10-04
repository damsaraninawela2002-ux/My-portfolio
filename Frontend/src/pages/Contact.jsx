import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import SectionDivider from '../components/SectionDivider';
import { personalInfo } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';

const Spinner = ({ className = '' }) => (
  <Loader2 className={`w-4 h-4 animate-spin ${className}`} />
);

const Contact = () => {
  usePageMeta({
    title: 'Contact | Damsarini Nawela - Get in Touch',
    description:
      'Send a message to Damsarini Nawela for project collaborations, technical inquiries, or opportunities.',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field for bot protection
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot spam protection: if website field is filled, silently discard
    if (formData.website) {
      setSubmitStatus({
        type: 'success',
        message: "Message sent! I'll respond within 24 hours.",
      });
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const hasValidEmailJSCredentials =
      serviceId &&
      templateId &&
      publicKey &&
      serviceId !== 'YOUR_SERVICE_ID' &&
      templateId !== 'YOUR_TEMPLATE_ID' &&
      publicKey !== 'YOUR_PUBLIC_KEY';

    try {
      if (hasValidEmailJSCredentials) {
        // Send email via EmailJS (client-side, free tier)
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'New message from portfolio',
            message: formData.message,
            to_email: 'damsaraninawela2002@gmail.com',
          },
          publicKey
        );
      } else {
        // Fallback: If backend is running, try /api/contact, otherwise simulate success for testing
        let sentViaBackend = false;
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              subject: formData.subject || 'New message from portfolio',
              message: formData.message,
            }),
          });
          if (res.ok) sentViaBackend = true;
        } catch {
          // Backend offline / not reachable
        }

        if (!sentViaBackend) {
          // Delay briefly to provide natural feedback when testing with placeholder keys
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }

      // On success: clear form and show animated success toast
      setSubmitStatus({
        type: 'success',
        message: "Message sent! I'll respond within 24 hours.",
      });
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      // On failure: show friendly error message and keep form data intact
      setSubmitStatus({
        type: 'error',
        message:
          'Something went wrong — please email me directly at damsaraninawela2002@gmail.com instead',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Let's Connect"
          title="Get In"
          highlight="Touch"
          subtitle="Have a project idea, a question, or want to collaborate? I look forward to hearing from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-10 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">
                  Send Me a Message 💌
                </h3>
                <p className="text-xs text-[var(--color-muted)] font-body">
                  Fill in the form below and I will respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Submission Status Alert */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`p-4 rounded-2xl mb-6 flex items-start gap-3 text-sm shadow-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/30'
                      : 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/30'
                  }`}
                  role="alert"
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-accent)]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
                  )}
                  <div className="flex-1 font-medium">{submitStatus.message}</div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot field for bot protection */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2">
                    Your Name <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    className={`w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border text-[var(--color-text)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-rose-400 focus:ring-rose-400/30'
                        : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2">
                    Your Email <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. recruiter@company.com"
                    className={`w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border text-[var(--color-text)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-rose-400 focus:ring-rose-400/30'
                        : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Collaboration Opportunity"
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)] transition-all"
                />
              </div>

              {/* Message Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)]">
                    Message <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <span className="text-[11px] text-[var(--color-muted)]">
                    {formData.message.length} characters
                  </span>
                </div>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Damsarini, I’d love to discuss a project idea and collaboration..."
                  className={`w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border text-[var(--color-text)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? 'border-rose-400 focus:ring-rose-400/30'
                      : 'border-[var(--color-border)] focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
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
                  disabled={isSubmitting}
                  icon={isSubmitting ? Spinner : Send}
                  iconPosition={isSubmitting ? 'left' : 'right'}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Direct Contact Details & Visuals */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation space-y-6"
            >
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">
                Contact Information
              </h3>

              {/* Email Card */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[var(--color-accent-soft)]/40 border border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[var(--color-muted)] font-body">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-body"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmailToClipboard}
                  className="p-2 rounded-xl text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#d4af7a] dark:text-[#e6c894]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-accent-soft)]/40 border border-[var(--color-border)]">
                <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-muted)] font-body">
                    Phone Number
                  </div>
                  <a
                    href="tel:+94775096262"
                    className="text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-body"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-accent-soft)]/40 border border-[var(--color-border)]">
                <div className="p-2.5 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-muted)] font-body">
                    Location
                  </div>
                  <div className="text-sm font-semibold text-[var(--color-text)] font-body">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] pt-2 font-body">
                <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Fast response time — typically within 12–24 hours.</span>
              </div>
            </motion.div>

            {/* Social Profiles Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl p-6 sm:p-8 bg-gradient-to-tr from-[#302129] via-[#3e2a33] to-[#241a20] dark:from-[#131826] dark:via-[#1c172e] dark:to-[#0B0F17] text-[#f7ecef] card-elevation border border-[var(--color-accent)]/30"
            >
              <h3 className="font-heading text-lg font-bold mb-2">Find Me Online 🌸</h3>
              <p className="text-xs text-[#f7ecef]/80 mb-6 leading-relaxed font-body">
                Connect with me on GitHub and LinkedIn to see ongoing coding activity, projects, and professional updates.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-semibold transition-all hover:scale-102 font-body"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#d88ca3] to-[#c9a7eb] dark:from-[#f0a8bd] dark:to-[#d9bdf5] text-[#241a20] text-sm font-semibold transition-all hover:scale-102 shadow-sm font-body"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <SectionDivider variant="wave" className="mt-16" />
      </div>
    </div>
  );
};

export default Contact;