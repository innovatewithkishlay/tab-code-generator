import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const NAV_LINKS = [
  { label: "Tabs", path: "/" },
  { label: "Pre-lab Questions", path: "/pre-lab" },
  { label: "Escape Room", path: "/escape-room" },
  { label: "Coding Races", path: "/coding-races" },
  { label: "About", path: "/about" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>("/");

  useEffect(() => {
    const saved = Cookies.get("selectedNav");
    if (saved) {
      setCurrentPath(saved);
    }
  }, []);

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    Cookies.set("selectedNav", path);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-black bg-white p-4 text-black dark:border-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-lg font-bold">Title</h1>

      <nav
        className="hidden space-x-6 md:flex"
        role="navigation"
        aria-label="Primary Navigation"
      >
        {NAV_LINKS.map(link => (
          <Link
            key={link.path}
            href={link.path}
            aria-current={currentPath === link.path ? "page" : undefined}
            onClick={() => handleNavigation(link.path)}
            className={`rounded hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              currentPath === link.path ? "font-bold underline" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <span className="hidden font-medium sm:inline">Student No. 21358295</span>
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="focus:outline-none md:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                fillRule="evenodd"
                d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          className="absolute top-full left-0 right-0 border-t border-black bg-white dark:border-white dark:bg-gray-800 md:hidden"
          role="menu"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col space-y-3 p-4">
            {NAV_LINKS.map(link => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  aria-current={currentPath === link.path ? "page" : undefined}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => handleNavigation(link.path)}
                  className={`block hover:underline ${
                    currentPath === link.path ? "font-bold underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
