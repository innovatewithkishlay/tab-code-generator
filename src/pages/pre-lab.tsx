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
       <div className="app-content min-h-screen p-6 pt-20 bg-inherit font-sans">
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
