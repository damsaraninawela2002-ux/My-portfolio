import { useEffect } from 'react';

/**
 * Custom React hook to update page title and Open Graph SEO meta tags per page.
 */
export const usePageMeta = ({
  title = 'Damsarini Nawela | Full-Stack Developer',
  description = 'Portfolio of Damsarini Nawela, a full-stack developer specializing in React, Python FastAPI, and MongoDB.',
  image = '/images/profile.jpg',
}) => {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (attribute, name, content) => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Description
    setMetaTag('name', 'description', description);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', window.location.origin + image);
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:type', 'website');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', window.location.origin + image);
  }, [title, description, image]);
};

export default usePageMeta;
