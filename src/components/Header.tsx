import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { motion, AnimatePresence, easeOut, Variants } from "framer-motion";

const NAV_ITEMS = [
  { label: "Tabs", path: "/" },
  { label: "Pre-lab Questions", path: "/pre-lab" },
  { label: "Escape Room", path: "/escape-room" },
  { label: "Coding Races", path: "/coding-races" },
  { label: "Court Room", path: "/CourtRoom" },
  { label: "About", path: "/about" },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
  hover: {
    scale: 1.05,
    color: "#2563eb",
    transition: { type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.95 },
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState<string>("/");
  const [displayedId, setDisplayedId] = useState("");
  const STUDENT_ID = "21358295";

  useEffect(() => {
    const saved = Cookies.get("selectedNav");
    if (saved) setActivePath(saved);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedId(STUDENT_ID.slice(0, currentIndex));
      if (currentIndex === STUDENT_ID.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (path: string) => {
    setActivePath(path);
    Cookies.set("selectedNav", path);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-black bg-white p-4 text-black dark:border-white dark:bg-gray-900 dark:text-white"
      aria-label="Main header with navigation"
    >
      <motion.h1
        className="text-lg font-bold cursor-default select-none"
        aria-label="Site Title"
        whileHover={{ scale: 1.05, color: "#3b82f6" }}
        whileTap={{ scale: 0.95 }}
      >
        Title
      </motion.h1>

      <nav
        className="hidden space-x-6 md:flex"
        role="navigation"
        aria-label="Primary Navigation"
      >
        {NAV_ITEMS.map(({ label, path }, i) => (
          <motion.div
            key={path}
            custom={i}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href={path}
              aria-current={activePath === path ? "page" : undefined}
              onClick={() => handleNavClick(path)}
              className={`rounded-sm px-2 py-1 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                activePath === path ? "font-bold underline" : "hover:underline"
              }`}
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <span className="fixed top-4 left-4 z-50 rounded bg-gray-200 p-2 font-medium text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200 select-none">
          Student ID: {displayedId}
          <span className="blinking-cursor">|</span>
        </span>

        <button
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          className="md:hidden focus:outline-none"
        >
          <motion.svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            initial={false}
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {isMenuOpen ? (
              <path
                fillRule="evenodd"
                d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
              />
            ) : (
              <>
                <path d="M4 6h16v2H4V6z" />
                <path d="M4 11h16v2H4v-2z" />
                <path d="M4 16h16v2H4v-2z" />
              </>
            )}
          </motion.svg>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="menu-panel absolute top-full left-0 right-0 border-t md:hidden bg-white dark:bg-gray-900 dark:border-gray-700"
            role="menu"
            aria-label="Mobile Navigation"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { height: 0, opacity: 0 },
              visible: {
                height: "auto",
                opacity: 1,
                transition: { duration: 0.3, ease: easeOut },
              },
            }}
          >
            <ul className="flex flex-col space-y-3 p-4">
              {NAV_ITEMS.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    href={path}
                    aria-current={activePath === path ? "page" : undefined}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleNavClick(path)}
                    className={`block rounded px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                      activePath === path
                        ? "font-bold underline text-blue-600 dark:text-blue-400"
                        : "hover:underline text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <style jsx>{`
        .blinking-cursor {
          font-weight: 100;
          font-size: 18px;
          color: #333;
          animation: blink 1s infinite;
          margin-left: 2px;
        }
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
