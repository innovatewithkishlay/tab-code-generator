import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const NAV_ITEMS = [
  { label: "Tabs", path: "/" },
  { label: "Pre-lab Questions", path: "/pre-lab" },
  { label: "Escape Room", path: "/escape-room" },
  { label: "Coding Races", path: "/coding-races" },
  { label: "About", path: "/about" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState<string>("/");

  useEffect(() => {
    const savedPath = Cookies.get("selectedNav");
    if (savedPath) {
      setActivePath(savedPath);
    }
  }, []);

  const handleNavClick = (path: string) => {
    setActivePath(path);
    Cookies.set("selectedNav", path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 text-black dark:text-white border-black dark:border-white">
      <h1 className="text-lg font-bold">Title</h1>

      <nav className="hidden md:flex space-x-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
              activePath === item.path ? "font-bold underline" : ""
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <span className="hidden sm:inline font-medium">Student No. 21358295</span>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="md:hidden focus:outline-none"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
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
        <nav className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t border-black dark:border-white md:hidden">
          <ul className="flex flex-col p-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block hover:underline ${
                    activePath === item.path ? "font-bold underline" : ""
                  }`}
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.label}
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
