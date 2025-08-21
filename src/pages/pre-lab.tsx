import React from "react";

const preLabQuestions = [
  "What is HTML5?",
  "Explain the difference between let, var, and const in JavaScript.",
  "Describe the box model in CSS.",
  "What are semantic HTML elements?",
  "Explain event bubbling and capturing.",
];

const PreLab: React.FC = () => {
  return (
    <div
      className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20 font-sans"
    >
      <h1 className="text-3xl mb-6">Pre-lab Questions</h1>
      <ul className="list-disc list-inside space-y-2">
        {preLabQuestions.map((question, index) => (
          <li key={index} className="hover:underline cursor-pointer">
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreLab;
