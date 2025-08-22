# Custom Tab Generator Website

This project is a Next.js (v15.5.0) + TypeScript + TailwindCSS web application that provides a custom tab generator tool with live preview and exportable accessible markup. It includes an About page, Escape Room, and Coding Races placeholder pages.

---

## Features

- **Custom Tabs Generator:**  
    - Create and customize tab labels and contents dynamically.  
    - Live preview with full keyboard navigation support.  
    - Generates standalone, accessible HTML5+JS markup with inline CSS (no CSS classes), ready for copy-paste use.

- **Dark/Light Theme:**  
    - Toggle theme manually; preference persists using `localStorage`.

- **Responsive Header:**  
    - Hamburger/kebab menu for navigation on small screens.  
    - Student ID displayed fixed top-left on every page.

- **Footer:**  
    - Copyright notice with full date, student name, and ID.

- **Accessibility:**  
    - Tab interface uses proper ARIA roles and supports keyboard navigation.  
    - Exported markup follows accessibility best practices.

- **Cookies:**  
    - Remembers selected navigation tab and active tab in the generator.  
    - Breadcrumbs component beneath the header for navigation context.

- **Pages Included:**  
    - Home (Tabs Generator)  
    - About (with embedded walkthrough video)  
    - Escape Room (placeholder)  
    - Coding Races (placeholder)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
     ```bash
     git clone <repo-url>
     cd <repo-folder>
     ```

2. **Install dependencies:**
     ```bash
     npm install
     # or
     yarn install
     ```

3. **Run the development server:**
     ```bash
     npm run dev
     # or
     yarn dev
     ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Build the project for production.
- `npm start` – Start the production server.
- `npm run lint` – Run ESLint for code quality checks.

*(Replace `npm` with `yarn` if using Yarn.)*

---

## Project Structure Highlights

- `src/components/` – Shared React components (Header, Footer, Layout, Breadcrumbs).
- `src/pages/` – Next.js pages (`index.tsx` for home, `about.tsx`, placeholders for others).
- `src/styles/globals.css` – Tailwind imports and global styles (including dark mode).
- `tailwind.config.js` – Tailwind configuration (dark mode enabled via `class` strategy).

---

## Accessibility Notes

- Uses ARIA roles (`tablist`, `tab`, `tabpanel`) in tabs and exported markup.
- Keyboard navigation: arrow keys, Home, End.
- Focus management for active tabs; accessible to screen readers.

---

## How to Use the Tab Generator

1. Add tabs using the **Add Another Tab** button.
2. Edit tab labels and content in the input fields.
3. Switch between tabs in the preview or generated markup using keyboard or mouse.
4. Generate standalone HTML markup with the **Generate Markup** button.
5. Copy markup to clipboard with the **Copy Code** button for use in your projects.

---

## Credits

**Developer:** Rohan Khurana  
**Student ID:** 21358295  
**Date:** August 2025

Some parts of this project, particularly for troubleshooting errors and optimizing code, were assisted by AI tools such as ChatGPT and GitHub Copilot. These tools were used sparingly and responsibly to improve development efficiency.

---

## License

This project is provided as-is for educational and demonstration purposes.

---

If you encounter any issues or have suggestions, please open an issue or contact the maintainer.
