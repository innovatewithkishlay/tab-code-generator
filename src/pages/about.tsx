import React from "react";

const About: React.FC = () => {
  return (
    <div className="app-content min-h-screen p-6 pt-20 bg-inherit font-sans">
      <div className="fixed top-4 left-4 font-bold">
        Student ID: 21358295
      </div>
      <h1 className="text-3xl mb-4">About Me</h1>
      <p className="mb-2">Name: Rohan Khurana</p>
      <p>
        This page is part of the HTML5 Tab Generator project for the university assignment.
      </p>
    </div>
  );
};

export default About;
