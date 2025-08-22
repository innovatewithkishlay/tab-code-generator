"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const htmlElement = document.documentElement;

    if (storedTheme === "dark") {
      setDarkMode(true);
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
    } else {
      setDarkMode(false);
      htmlElement.classList.add("light");
      htmlElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;

    setDarkMode((prev) => {
      const nextMode = !prev;

      if (nextMode) {
        htmlElement.classList.add("dark");
        htmlElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
      } else {
        htmlElement.classList.remove("dark");
        htmlElement.classList.add("light");
        localStorage.setItem("theme", "light");
      }

      return nextMode;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-inherit transition-colors duration-300 relative">
      <Header />
      <main className="flex-grow pt-3">
        <Breadcrumbs />
        {children}
      </main>
      {/* Give space for fixed footer */}
      <div className="h-[64px] md:h-[52px]" />
      <Footer />

      <motion.button
        aria-label="Toggle Dark Mode"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-[84px] right-6 z-50 rounded-full bg-gray-200 p-3 shadow-lg text-2xl text-gray-700 dark:bg-gray-700 dark:text-gray-200 border border-blue-200 dark:border-blue-900"
        style={{ pointerEvents: "auto" }}
      >
        {darkMode ? "🌙" : "☀️"}
      </motion.button>
    </div>
  );
}
