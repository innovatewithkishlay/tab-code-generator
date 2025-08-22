import React from "react";

const About: React.FC = () => {
  return (
    <div className="app-content min-h-screen bg-inherit p-6 pt-20 font-sans flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="fixed top-4 left-4 font-bold">Student ID: 21358295</div>

        <h1 className="mb-6 text-3xl  font-semibold">About Me</h1>
        <p className="mb-3 text-gray-700">Name: Rohan Khurana</p>
        <p className="mb-8 max-w-3xl leading-relaxed text-gray-600">
          This page is part of the HTML5 Tab Generator project for the university assignment.
        </p>

        <h2 className="mb-5 text-2xl font-semibold">How to Use This Site</h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-gray-600">
          This site allows users to generate HTML tabs with code that is fully inline styled for easy sharing and use. Simply navigate to the Code Generator, input your content and customize styles as needed, then copy the generated code. Save the output as an HTML file (for example, <code>Hello.html</code>) and open it in any web browser to view your styled tabs. The intuitive interface helps users create clean, portable HTML snippets quickly without the need for external CSS files.
        </p>

        <div
          className="video-container mb-12 max-w-3xl overflow-hidden rounded-lg shadow-lg"
          style={{ aspectRatio: "16 / 9" }}
        >
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="About Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default About;
