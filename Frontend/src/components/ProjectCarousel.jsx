import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const FALLBACK_IMAGE = '/images/projects/portfolio-preview.svg';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const ProjectCarousel = ({ images = [], title = 'Project', isPhone = false }) => {
  const validImages =
    Array.isArray(images) && images.filter(Boolean).length > 0
      ? images.filter(Boolean).slice(0, 6)
      : [FALLBACK_IMAGE];

  const count = validImages.length;
  const [[page, direction], setPage] = useState([0, 0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentIndex = ((page % count) + count) % count;
  const currentSrc = validImages[currentIndex];
  const useContainFit =
    isPhone ||
    /easy-calculator|\/cal2?\.(jpe?g|png|webp)$/i.test(currentSrc || '');

  const paginate = useCallback(
    (newDirection) => {
      if (count <= 1) return;
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    [count]
  );

  const goToIndex = (targetIdx) => {
    if (targetIdx === currentIndex || count <= 1) return;
    const newDir = targetIdx > currentIndex ? 1 : -1;
    setPage([targetIdx, newDir]);
  };

  // Handle Escape and Arrow keys when Lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleWindowKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        paginate(1);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, [isLightboxOpen, paginate]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      paginate(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      paginate(1);
    }
  };

  const formattedCurrent = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(count).padStart(2, '0');

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} screenshots`}
        className="group relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-2xl select-none"
      >
        {/* 16:10 Image Viewport */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#131826] border border-[var(--color-border)] shadow-lg">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={validImages[currentIndex]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 320, damping: 32 },
                opacity: { duration: 0.2 },
              }}
              drag={count > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -4000 || offset.x < -60) {
                  paginate(1);
                } else if (swipe > 4000 || offset.x > 60) {
                  paginate(-1);
                }
              }}
              onClick={() => setIsLightboxOpen(true)}
              loading="lazy"
              alt={`${title} screenshot ${currentIndex + 1} of ${count}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_IMAGE;
              }}
              className={`absolute inset-0 w-full h-full ${
                useContainFit ? 'object-contain bg-[#111722]' : 'object-cover'
              } object-center cursor-zoom-in`}
            />
          </AnimatePresence>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/60 via-transparent to-transparent pointer-events-none" />

          {/* Counter Badge ("01 / 04") - hidden when only 1 image */}
          {count > 1 && (
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#0B0F17]/75 backdrop-blur-md border border-white/10 text-[11px] font-mono font-semibold text-white tracking-wider">
              {formattedCurrent} / {formattedTotal}
            </div>
          )}

          {/* Fullscreen Hint Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Open image in fullscreen lightbox"
            title="View Fullscreen"
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#0B0F17]/70 hover:bg-[#0B0F17]/90 text-white backdrop-blur-md border border-white/10 opacity-80 group-hover:opacity-100 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Prev / Next Arrow Buttons */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#0B0F17]/70 hover:bg-[#0B0F17]/95 text-white backdrop-blur-md border border-white/15 shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#0B0F17]/70 hover:bg-[#0B0F17]/95 text-white backdrop-blur-md border border-white/15 shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {/* Bottom Dot Indicators - hidden when only 1 image */}
          {count > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0F17]/65 backdrop-blur-md border border-white/10">
              {validImages.map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToIndex(idx);
                    }}
                    aria-label={`Go to screenshot ${idx + 1}`}
                    aria-current={isActive ? 'true' : 'false'}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-6 bg-[var(--color-accent)]'
                        : 'w-2 bg-white/45 hover:bg-white/80'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} fullscreen gallery`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F17]/92 backdrop-blur-md p-4 sm:p-8"
          >
            {/* Top Bar: Counter & Close Button */}
            <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono font-semibold text-white pointer-events-auto">
                {count > 1 ? `${formattedCurrent} / ${formattedTotal} — ${title}` : title}
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close fullscreen lightbox"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer pointer-events-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-[16/10] rounded-2xl overflow-hidden bg-[#131826] border border-white/15 shadow-2xl"
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={page}
                  src={validImages[currentIndex]}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.2 },
                  }}
                  drag={count > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -4000 || offset.x < -60) {
                      paginate(1);
                    } else if (swipe > 4000 || offset.x > 60) {
                      paginate(-1);
                    }
                  }}
                  alt={`${title} fullscreen screenshot ${currentIndex + 1} of ${count}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_IMAGE;
                  }}
                  className="absolute inset-0 w-full h-full object-contain bg-[#0B0F17]"
                />
              </AnimatePresence>

              {/* Lightbox Prev / Next Controls */}
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    aria-label="Previous screenshot"
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#0B0F17]/75 hover:bg-[#0B0F17] text-white backdrop-blur-md border border-white/20 shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#0B0F17]/75 hover:bg-[#0B0F17] text-white backdrop-blur-md border border-white/20 shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {/* Lightbox Dot Indicators */}
              {count > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0B0F17]/75 backdrop-blur-md border border-white/15">
                  {validImages.map((_, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => goToIndex(idx)}
                        aria-label={`Go to screenshot ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'w-7 bg-[var(--color-accent)]'
                            : 'w-2.5 bg-white/45 hover:bg-white/80'
                        }`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCarousel;
