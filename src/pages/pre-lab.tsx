import React from "react";

const questions = [
  "What is HTML5?",
  "Explain the difference between let, var, and const in JavaScript.",
  "Describe the box model in CSS.",
  "What are semantic HTML elements?",
  "Explain event bubbling and capturing.",
];

const PreLab: React.FC = () => {
  return (
    <div className="min-h-screen p-6 pt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <h1 className="mb-6 text-3xl">Pre-lab Questions</h1>
      <ul className="list-disc list-inside space-y-2">
        {questions.map((item, idx) => (
          <li key={idx} className="cursor-pointer hover:underline">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreLab;
