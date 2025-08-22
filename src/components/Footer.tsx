import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [displayedText, setDisplayedText] = useState("");
  const dateString = new Date().toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const studentInfo = "Rohan Khurana, 21358295";

  useEffect(() => {
    let currentIndex = 0;
    const fullText = `${dateString} ${studentInfo}`;
    const timer = setInterval(() => {
      currentIndex++;
      setDisplayedText(fullText.slice(0, currentIndex));
      if (currentIndex === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [dateString, studentInfo]);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-800 bg-white p-4 text-center text-black dark:border-gray-200 dark:bg-gray-900 dark:text-white"
      style={{ fontWeight: 500, letterSpacing: "0.04em" }}
      aria-label="Footer information"
    >
      {displayedText}
    </motion.footer>
  );
};

export default Footer;
