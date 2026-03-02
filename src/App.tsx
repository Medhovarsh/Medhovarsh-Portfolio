import { useState, useEffect, lazy, Suspense } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import CustomCursor from './components/CustomCursor';
import Logo from './components/Logo';
import DockMenu from './components/DockMenu';
import ScrollProgress from './components/ScrollProgress';
import TechOverlay from './components/TechOverlay';
import { ThemeProvider } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

// Lazy load heavy below-the-fold components
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));

const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-theme-accent-border border-t-theme-accent rounded-full animate-spin" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isTechSpecsOpen, setIsTechSpecsOpen] = useState(false);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      <TechOverlay isVisible={isTechSpecsOpen} />
      <Suspense fallback={null}>
        <CommandPalette
          isOpen={isCommandOpen}
          setIsOpen={setIsCommandOpen}
          toggleTechSpecs={() => setIsTechSpecsOpen(prev => !prev)}
        />
      </Suspense>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] theme-bg flex flex-col items-center justify-center"
            style={{ backgroundColor: 'var(--theme-bg)' }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-theme-accent rounded-full animate-ping" />
              <span className="text-xs font-mono tracking-[0.2em]" style={{ color: 'var(--theme-accent-light)' }}>INITIALIZING SYSTEM</span>
            </div>
            <div className="w-48 h-[1px] overflow-hidden relative" style={{ backgroundColor: 'var(--theme-border)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 bg-theme-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen overflow-x-hidden selection:bg-theme-accent-surface selection:text-theme-primary"
            style={{ backgroundColor: 'var(--theme-bg)' }}
          >
            {/* Ambient Noise Texture */}
            <div className="grain-overlay" />

            {/* Global Aurora Background */}
            <div className="aurora-bg fixed inset-0 z-0 pointer-events-none" />

            {/* Developer HUD Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.92, rotate: -5 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => setIsTechSpecsOpen(prev => !prev)}
              className="fixed top-6 right-6 z-[9999] p-4 rounded-full backdrop-blur-xl border transition-colors duration-300 group"
              style={{
                background: isTechSpecsOpen ? 'var(--theme-accent-surface)' : 'var(--theme-glass-bg)',
                borderColor: isTechSpecsOpen ? 'var(--theme-accent)' : 'var(--theme-glass-border)',
                color: isTechSpecsOpen ? 'var(--theme-accent)' : 'var(--theme-text-primary)',
                boxShadow: isTechSpecsOpen ? 'var(--theme-glow)' : 'var(--theme-shadow)'
              }}
            >
              <Activity size={24} strokeWidth={isTechSpecsOpen ? 2.5 : 2} className={isTechSpecsOpen ? 'animate-pulse' : ''} />
              <span
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 backdrop-blur-md border text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                style={{
                  background: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-primary)',
                  boxShadow: 'var(--theme-shadow)'
                }}
              >
                {isTechSpecsOpen ? 'Hide System Stats' : 'View Developer HUD'}
              </span>
            </motion.button>

            <ScrollProgress />
            <Logo />

            <main className="relative z-10 pb-32"> {/* Added padding bottom for Dock */}
              <Hero />
              <div className="relative z-20" style={{ backgroundColor: 'var(--theme-bg)' }}>
                <About />
                <Suspense fallback={<SectionLoader />}>
                  <Experience />
                  <Projects />
                  <Education />
                  <Contact />
                </Suspense>
              </div>
            </main>

            <DockMenu onOpenCommand={() => setIsCommandOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
