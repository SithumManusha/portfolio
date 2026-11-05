import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Projects' | 'Navigation' | 'Actions' | 'Social';
  icon: string;
  badge?: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onDownloadCV: (e: React.MouseEvent) => void;
  toggleTheme: () => void;
  theme: string;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onDownloadCV,
  toggleTheme,
  theme,
  showToast,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Navigate smoothly to hash section
  const navigateTo = (hash: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = hash;
      }
    }, 120);
  };

  const copyToClipboard = async (text: string, label: string) => {
    onClose();
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied ${label} to clipboard! ✨`, 'success');
    } catch {
      showToast(`Failed to copy ${label}`, 'warning');
    }
  };

  // Master commands list
  const commands: CommandItem[] = useMemo(() => [
    // 1. Projects
    {
      id: 'proj-ryzera',
      title: 'Super POS — Multi-Branch Enterprise Offline-First Retail System',
      subtitle: 'IndexedDB, LWW Sync, Socket.io telemetry, Next.js, NestJS',
      category: 'Projects',
      icon: 'fa-solid fa-cash-register',
      badge: 'Group Project',
      keywords: ['pos', 'offline', 'indexeddb', 'nest', 'nextjs', 'socket', 'retail'],
      action: () => {
        onClose();
        onSelectProject('ryzera');
        navigateTo('#projects');
      }
    },
    {
      id: 'proj-careerflow',
      title: 'CareerFlow — Full-Stack ATS Resume Optimizer & AI Interview Platform',
      subtitle: 'TF-IDF Vectorization, Gemini 1.5 Flash, Spring Boot 3, FastAPI, Docker',
      category: 'Projects',
      icon: 'fa-solid fa-file-invoice',
      badge: 'Microservices',
      keywords: ['careerflow', 'ats', 'resume', 'spring boot', 'java', 'gemini', 'interview'],
      action: () => {
        onClose();
        onSelectProject('careerflow');
        navigateTo('#projects');
      }
    },
    {
      id: 'proj-ledgerly',
      title: 'Ledgerly — Autonomous AI Financial Intelligence & Collaborative Ledger',
      subtitle: 'Greedy Two-Pointer algorithm, Recharts cash-flow, Vitest, PostgreSQL',
      category: 'Projects',
      icon: 'fa-solid fa-wallet',
      badge: 'FinTech AI',
      keywords: ['ledgerly', 'finance', 'recharts', 'debt', 'algorithm', 'vitest'],
      action: () => {
        onClose();
        onSelectProject('ledgerly');
        navigateTo('#projects');
      }
    },
    {
      id: 'proj-pulse',
      title: 'Pulse AI Blog Engine — AI Content Platform & MVC Architecture',
      subtitle: 'PHP 8 MVC, SQLite PDO, Gemini AI summaries, CodeQL scanning',
      category: 'Projects',
      icon: 'fa-solid fa-newspaper',
      badge: 'PHP 8 MVC',
      keywords: ['pulse', 'blog', 'php', 'mvc', 'pdo', 'codeql', 'render'],
      action: () => {
        onClose();
        onSelectProject('pulse-ai');
        navigateTo('#projects');
      }
    },
    {
      id: 'proj-robotics',
      title: 'Automated Robotic Sorting System — 4-DOF Microcontroller Conveyor',
      subtitle: 'Arduino Mega, Stepper Motors NEMA 17, Sensors, Hardware Integration',
      category: 'Projects',
      icon: 'fa-solid fa-robot',
      badge: 'Hardware',
      keywords: ['robotics', 'arduino', 'hardware', 'conveyor', 'sorting', 'motors'],
      action: () => {
        onClose();
        onSelectProject('robotic-sorting');
        navigateTo('#projects');
      }
    },

    // 2. Navigation
    {
      id: 'nav-home',
      title: 'Home / Hero Overview',
      subtitle: 'Sithum Manusha bio, introduction & quick highlights',
      category: 'Navigation',
      icon: 'fa-solid fa-house',
      action: () => navigateTo('#home')
    },
    {
      id: 'nav-edu',
      title: 'Education & Academic History',
      subtitle: 'University of Moratuwa (ITM) & OUSL (LL.B.)',
      category: 'Navigation',
      icon: 'fa-solid fa-graduation-cap',
      action: () => navigateTo('#education')
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills & Architectures',
      subtitle: 'Java 21, Spring Boot, React, Next.js, PostgreSQL, Docker, Vitest',
      category: 'Navigation',
      icon: 'fa-solid fa-code',
      action: () => navigateTo('#skills')
    },
    {
      id: 'nav-cert',
      title: 'Certifications & Professional Credentials',
      subtitle: 'AWS Cloud Practitioner, Software Testing with GenAI, Cybersecurity',
      category: 'Navigation',
      icon: 'fa-solid fa-certificate',
      action: () => navigateTo('#certifications')
    },
    {
      id: 'nav-leadership',
      title: 'Leadership & Extracurriculars',
      subtitle: 'UoM Career Fair Organizing Committee, FIT Moments, Legal Youth',
      category: 'Navigation',
      icon: 'fa-solid fa-users',
      action: () => navigateTo('#leadership')
    },
    {
      id: 'nav-contact',
      title: 'Contact & Let’s Connect',
      subtitle: 'Direct email form, mobile details, and messaging',
      category: 'Navigation',
      icon: 'fa-solid fa-envelope',
      action: () => navigateTo('#contact')
    },

    // 3. Actions
    {
      id: 'act-download-cv',
      title: 'Download Master SE CV (PDF)',
      subtitle: '100/100 ATS Score verified, 2-Page Software Engineering Resume',
      category: 'Actions',
      icon: 'fa-solid fa-file-arrow-down',
      badge: '100/100 ATS',
      action: (e?: any) => {
        onClose();
        onDownloadCV(e || { preventDefault: () => {} });
      }
    },
    {
      id: 'act-copy-email',
      title: 'Copy Email Address',
      subtitle: 'appuhamysithum@gmail.com',
      category: 'Actions',
      icon: 'fa-solid fa-copy',
      badge: 'Direct Contact',
      action: () => copyToClipboard('appuhamysithum@gmail.com', 'Email (appuhamysithum@gmail.com)')
    },
    {
      id: 'act-copy-phone',
      title: 'Copy Phone Number',
      subtitle: '+94 77 552 0570',
      category: 'Actions',
      icon: 'fa-solid fa-phone',
      action: () => copyToClipboard('+94775520570', 'Phone (+94 77 552 0570)')
    },
    {
      id: 'act-toggle-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: `Current active theme is ${theme.toUpperCase()}`,
      category: 'Actions',
      icon: theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
      action: () => {
        toggleTheme();
        showToast(`Theme switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`, 'info');
      }
    },

    // 4. Social
    {
      id: 'soc-github',
      title: 'Visit GitHub Profile',
      subtitle: 'github.com/SithumManusha',
      category: 'Social',
      icon: 'fa-brands fa-github',
      action: () => {
        onClose();
        window.open('https://github.com/SithumManusha', '_blank');
      }
    },
    {
      id: 'soc-linkedin',
      title: 'Visit LinkedIn Profile',
      subtitle: 'linkedin.com/in/sithum-manusha',
      category: 'Social',
      icon: 'fa-brands fa-linkedin',
      action: () => {
        onClose();
        window.open('https://linkedin.com/in/sithum-manusha', '_blank');
      }
    }
  ], [onClose, onSelectProject, onDownloadCV, toggleTheme, theme, showToast]);

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase().trim();
    return commands.filter(item => {
      return (
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q) ||
        (item.keywords && item.keywords.some(k => k.toLowerCase().includes(q)))
      );
    });
  }, [commands, query]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('.cmd-item.active') as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmd-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="cmd-dialog"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="cmd-header">
              <i className="fa-solid fa-magnifying-glass cmd-search-icon"></i>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command, project, or search keywords..."
                className="cmd-input"
                aria-label="Search portfolio commands"
              />
              {query ? (
                <button
                  type="button"
                  className="cmd-clear-btn"
                  onClick={() => setQuery('')}
                  title="Clear search"
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              ) : (
                <kbd className="cmd-kbd">ESC</kbd>
              )}
            </div>

            {/* Commands List */}
            <div className="cmd-list" ref={listRef}>
              {filteredCommands.length === 0 ? (
                <div className="cmd-empty">
                  <i className="fa-solid fa-meteor" style={{ fontSize: '1.8rem', color: '#6366f1', marginBottom: '10px' }}></i>
                  <p>No results found for "<strong>{query}</strong>"</p>
                  <span>Try searching for "POS", "Spring Boot", "Resume", "CV", or "Contact".</span>
                </div>
              ) : (
                filteredCommands.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      className={`cmd-item ${isSelected ? 'active' : ''}`}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="cmd-item-icon">
                        <i className={item.icon}></i>
                      </div>
                      <div className="cmd-item-content">
                        <div className="cmd-item-title-row">
                          <span className="cmd-item-title">{item.title}</span>
                          {item.badge && <span className="cmd-item-badge">{item.badge}</span>}
                        </div>
                        {item.subtitle && <span className="cmd-item-subtitle">{item.subtitle}</span>}
                      </div>
                      <div className="cmd-item-enter">
                        {isSelected ? <kbd>↵</kbd> : <span className="cmd-category-tag">{item.category}</span>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Bar */}
            <div className="cmd-footer">
              <div className="cmd-footer-shortcuts">
                <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
                <span><kbd>↵</kbd> Select</span>
                <span><kbd>ESC</kbd> Close</span>
              </div>
              <div className="cmd-footer-branding">
                <i className="fa-solid fa-terminal" style={{ color: '#6366f1', marginRight: '4px' }}></i>
                <span>Sithum Manusha Spotlight</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
