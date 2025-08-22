import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

const TYPE_SPEED = 60; 

const About: React.FC = () => {
  const texts = {
    heading: "About Me",
    name: "Name: Rohan Khurana",
    studentId: "Student ID: 21358295",
    description:
      "This page is part of the HTML5 Tab Generator project for the university assignment.",
    howToUseHeading: "How to Use This Site",
    howToUseText:
      "This site allows users to generate HTML tabs with code that is fully inline styled for easy sharing and use. Simply navigate to the Code Generator, input your content and customize styles as needed, then copy the generated code. Save the output as an HTML file (for example, Hello.html) and open it in any web browser to view your styled tabs. The intuitive interface helps users create clean, portable HTML snippets quickly without the need for external CSS files.",
  };

  const [typedHeading, setTypedHeading] = useState("");
  const [typedName, setTypedName] = useState("");
  const [typedStudentId, setTypedStudentId] = useState("");
  const [typedDescription, setTypedDescription] = useState("");
  const [typedHowToUseHeading, setTypedHowToUseHeading] = useState("");
  const [typedHowToUseText, setTypedHowToUseText] = useState("");

  const typeWriter = (
    text: string,
    updateFunc: React.Dispatch<React.SetStateAction<string>>,
    startDelay = 0
  ) => {
    let charIndex = 0;
    setTimeout(() => {
      const intervalId = setInterval(() => {
        updateFunc(text.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex >= text.length) clearInterval(intervalId);
      }, TYPE_SPEED);
    }, startDelay);
  };

  useEffect(() => {
    const headingDelay = 0;
    const nameDelay = texts.heading.length * TYPE_SPEED + 300;
    const studentIdDelay = nameDelay + texts.name.length * TYPE_SPEED + 300;
    const descDelay = studentIdDelay + texts.studentId.length * TYPE_SPEED + 300;
    const howToHeadingDelay =
      descDelay + texts.description.length * TYPE_SPEED + 300;
    const howToTextDelay =
      howToHeadingDelay + texts.howToUseHeading.length * TYPE_SPEED + 400;

    typeWriter(texts.heading, setTypedHeading, headingDelay);
    typeWriter(texts.name, setTypedName, nameDelay);
    typeWriter(texts.studentId, setTypedStudentId, studentIdDelay);
    typeWriter(texts.description, setTypedDescription, descDelay);
    typeWriter(texts.howToUseHeading, setTypedHowToUseHeading, howToHeadingDelay);
    typeWriter(texts.howToUseText, setTypedHowToUseText, howToTextDelay);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, when: "beforeChildren" },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="app-content min-h-screen bg-inherit p-6 pt-20 font-sans flex justify-center"
    >
      <div className="w-full max-w-4xl">
        <motion.h1
          variants={itemVariants}
          className="texty mb-6 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
          aria-label="About Me Heading"
        >
          {typedHeading}
          <motion.span
            className="inline-block ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            |
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="texty mb-3 text-gray-700 dark:text-white font-medium text-lg"
          aria-label="Name"
        >
          {typedName}
          <motion.span
            className="inline-block ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            |
          </motion.span>
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="texty mb-3 text-gray-700 dark:text-white font-medium text-lg"
          aria-label="Student ID"
        >
          {typedStudentId}
          <motion.span
            className="inline-block ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            |
          </motion.span>
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="texty mb-8 max-w-3xl leading-relaxed text-gray-600 dark:text-white text-lg"
          aria-label="Description"
        >
          {typedDescription}
          <motion.span
            className="inline-block ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            |
          </motion.span>
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="texty mb-5 text-3xl font-semibold text-gray-900 dark:text-white"
          aria-label="How to Use This Site Heading"
        >
          {typedHowToUseHeading}
          <motion.span
            className="inline-block ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            |
          </motion.span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="texty mb-8 max-w-3xl leading-relaxed text-gray-600 dark:text-white text-lg"
          aria-label="How to Use This Site Text"
        >
          {typedHowToUseText.split("Hello.html").map((part, idx, arr) => (
            <React.Fragment key={idx}>
              {part}
              {idx !== arr.length - 1 && (
                <code className="rounded bg-gray-700 px-1.5 py-0.5 text-xs text-gray-300 dark:bg-gray-600">
                  Hello.html
                </code>
              )}
            </React.Fragment>
          ))}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="video-container mb-12 max-w-3xl overflow-hidden rounded-lg shadow-lg"
          style={{ aspectRatio: "16 / 9" }}
          aria-label="About Video"
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="About Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
