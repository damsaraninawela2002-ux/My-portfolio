import { useEffect, useRef } from 'react';

/**
 * Custom React hook for scroll-reveal animations using native IntersectionObserver.
 * Observes the referenced element and adds the 'is-revealed' class once visible.
 */
export const useScrollReveal = (options = { threshold: 0.15 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      if (node) node.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-revealed');
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [options]);

  return elementRef;
};

export default useScrollReveal;
