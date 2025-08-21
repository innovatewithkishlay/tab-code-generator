    "use client";

    import { ReactNode, useEffect, useState } from "react";
    import Header from "./Header";
    import Footer from "./Footer";

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
        setDarkMode((prev) => {
        const newValue = !prev;
        if (newValue) {
            html.classList.add("dark");
            html.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
            localStorage.setItem("theme", "light");
        }
        return newValue;
        });
    };

    return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-inherit">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />

        <button
            onClick={toggleDarkMode}
            className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-gray-200 hover:scale-110 transition dark:bg-gray-700"
            aria-label="Toggle Dark Mode"
        >
            {darkMode ? "🌙" : "☀️"}
        </button>
        </div>
    );
    }
