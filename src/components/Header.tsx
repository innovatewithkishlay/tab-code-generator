import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const NAV_ITEMS = [
  { label: "Tabs", path: "/" },
  { label: "Pre-lab Questions", path: "/pre-lab" },
  { label: "Escape Room", path: "/escape-room" },
  { label: "Coding Races", path: "/coding-races" },
  { label: "Court Room", path: "/CourtRoom" },
  { label: "About", path: "/about" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState<string>("/");

  useEffect(() => {
    const saved = Cookies.get("selectedNav");
    if (saved) {
      setActivePath(saved);
    }
  }, []);

  const handleNavClick = (path: string) => {
    setActivePath(path);
    Cookies.set("selectedNav", path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-black bg-white p-4 text-black dark:border-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-lg font-bold">Title</h1>

      <nav
        className="hidden space-x-6 md:flex"
        role="navigation"
        aria-label="Primary Navigation"
      >
        {NAV_ITEMS.map(({ label, path }) => (
          <Link
            key={path}
            href={path}
            aria-current={activePath === path ? "page" : undefined}
            onClick={() => handleNavClick(path)}
            className={
              `rounded-sm px-2 py-1 transition hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900` +
              (activePath === path ? " font-bold underline" : "")
            }
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
<span className="fixed top-4 left-4 z-50 font-medium bg-gray-200 dark:bg-gray-800 p-2 rounded text-sm text-gray-800 dark:text-gray-200">
  Student ID: 21358295
</span>
        <button
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            {isMenuOpen ? (
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

      {isMenuOpen && (
        <nav
          className="menu-panel absolute top-full left-0 right-0 border-t md:hidden"
          role="menu"
          aria-label="Mobile Navigation"
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
                  className={`block hover:underline ${
                    activePath === path ? "font-bold underline" : ""
                  }`}
                >
                  {label}
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
