import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, AlertCircle, LogIn } from 'lucide-react';
import Button from '../components/Button';
import { usePageMeta } from '../hooks/usePageMeta';

const AdminLogin = () => {
  usePageMeta({
    title: 'Admin Login | Damsarini Nawela',
    description: 'Administrator login for portfolio project management.',
  });

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!credentials.username.trim() || !credentials.password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('admin_token', data.access_token);
        navigate('/admin/dashboard');
        return;
      }

      const errData = await res.json().catch(() => ({}));
      setError(errData.detail || 'Invalid username or password.');
    } catch {
      // Allow local demo mode when backend is offline
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        sessionStorage.setItem('admin_token', 'local-demo-token');
        navigate('/admin/dashboard');
      } else {
        setError('Backend unreachable. Use admin / admin123 for local preview.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] card-elevation"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-[var(--color-text)]">
              Admin Login
            </h1>
            <p className="text-xs text-[var(--color-muted)] font-body">
              Sign in to manage portfolio projects.
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-username"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
            >
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, username: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]"
              placeholder="admin"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="glow"
            size="lg"
            className="w-full mt-2"
            disabled={loading}
            icon={LogIn}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
