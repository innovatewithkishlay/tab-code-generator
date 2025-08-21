"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs"; 

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;
    if (savedTheme === "dark") {
      setDarkMode(true);
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      setDarkMode(false);
      html.classList.add("light");
      html.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    setDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        html.classList.add("dark");
        html.classList.remove("light");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        html.classList.add("light");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-inherit">
      <Header />
      <Breadcrumbs />
      <main className="flex-grow">{children}</main>
      <Footer />
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className="fixed bottom-6 right-6 rounded-full bg-gray-200 p-3 shadow-lg transition hover:scale-110 dark:bg-gray-700"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
