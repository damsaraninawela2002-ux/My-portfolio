import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';
import Button from '../components/Button';
import { usePageMeta } from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({
    title: '404 - Page Not Found | Damsarini Nawela',
    description: 'The requested page could not be found.',
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md p-8 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xl"
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          404
        </h1>

        <h2 className="mt-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
          Page Not Found
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center">
          <Button to="/" variant="glow" size="md" icon={Home}>
            Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
