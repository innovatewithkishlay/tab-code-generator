import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const TabsGenerator: React.FC = () => {
  const [tabLabels, setTabLabels] = useState<string[]>(["Tab 1", "Tab 2"]);
  const [tabContents, setTabContents] = useState<string[]>(["Content 1", "Content 2"]);
  const [markup, setMarkup] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Restore last active tab from cookies
  useEffect(() => {
    const saved = Cookies.get("selectedTabIndex");
    if (saved !== undefined) {
      setActiveIndex(parseInt(saved, 10));
    }
  }, []);

  const handleLabelChange = (index: number, text: string) => {
    const updated = [...tabLabels];
    updated[index] = text;
    setTabLabels(updated);
  };

  const handleContentChange = (index: number, text: string) => {
    const updated = [...tabContents];
    updated[index] = text;
    setTabContents(updated);
  };

  const addTab = () => {
    setTabLabels(prev => [...prev, `Tab ${prev.length + 1}`]);
    setTabContents(prev => [...prev, `Content ${prev.length + 1}`]);
  };

  const switchTab = (index: number) => {
    setActiveIndex(index);
    Cookies.set("selectedTabIndex", index.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    let newIdx = activeIndex;

    if (e.key === "ArrowRight") {
      newIdx = (activeIndex + 1) % tabLabels.length;
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      newIdx = (activeIndex - 1 + tabLabels.length) % tabLabels.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      newIdx = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      newIdx = tabLabels.length - 1;
      e.preventDefault();
    }

    if (newIdx !== activeIndex) {
      switchTab(newIdx);
      tabRefs.current[newIdx]?.focus();
    }
  };

  const generateMarkup = () => {
    const ids = tabLabels.map((_, i) => `pane-${i + 1}`);

    const buttonsHTML = tabLabels
      .map(
        (label, i) =>
          `<button id="btn-${ids[i]}" class="tab-btn" onclick="activateTab('${ids[i]}', this)" style="background-color:${i === activeIndex ? "#ccc" : "#eee"};padding:6px;border:none;cursor:pointer;">${label}</button>`
      )
      .join("");

    const panelsHTML = tabContents
      .map(
        (content, i) =>
          `<div id="${ids[i]}" class="tab-pane" style="display:${i === activeIndex ? "block" : "none"};padding:12px;border:1px solid #aaa;border-top:none;font-family:Arial,sans-serif;">${content}</div>`
      )
      .join("");

    const script = `
<script>
function activateTab(id, clickedBtn) {
  document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  document.querySelectorAll('.tab-btn').forEach(b => b.style.backgroundColor = '#eee');
  clickedBtn.style.backgroundColor = '#ccc';
}
</script>`;

    const html = `
<div style="font-family:Arial,sans-serif;">
  <div role="tablist" style="border-bottom:1px solid #aaa;padding-bottom:6px;">
    ${buttonsHTML}
  </div>
  ${panelsHTML}
</div>
${script}`.trim();

    setMarkup(html);
  };

  return (
    <div className="min-h-screen p-6 pt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="mb-4 text-2xl font-bold">Custom Tab Generator</h1>

      <div className="mb-5">
        {tabLabels.map((label, i) => (
          <div key={i} className="mb-3 flex gap-3">
            <input
              type="text"
              value={label}
              onChange={e => handleLabelChange(i, e.target.value)}
              className="w-40 rounded border p-2 dark:bg-gray-800 dark:text-white"
              placeholder={`Label ${i + 1}`}
            />
            <input
              type="text"
              value={tabContents[i]}
              onChange={e => handleContentChange(i, e.target.value)}
              className="flex-1 rounded border p-2 dark:bg-gray-800 dark:text-white"
              placeholder={`Content ${i + 1}`}
            />
          </div>
        ))}

        <button
          onClick={addTab}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Another Tab
        </button>
      </div>

      <div role="tablist" aria-label="Custom Tabs" className="mb-4 flex space-x-3">
        {tabLabels.map((label, i) => (
          <button
            key={i}
            ref={el => {
              tabRefs.current[i] = el;
            }}
            id={`tab-${i}`}
            role="tab"
            aria-selected={activeIndex === i}
            aria-controls={`panel-${i}`}
            tabIndex={activeIndex === i ? 0 : -1}
            onClick={() => switchTab(i)}
            onKeyDown={handleKeyDown}
            className={`px-4 py-2 rounded ${
              activeIndex === i
                ? "bg-gray-400 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                : "bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tabContents.map((content, i) => (
        <div
          key={i}
          id={`panel-${i}`}
          role="tabpanel"
          aria-labelledby={`tab-${i}`}
          hidden={activeIndex !== i}
          className="border border-t-0 p-4"
        >
          {content}
        </div>
      ))}

      <button
        onClick={generateMarkup}
        className="mb-4 rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
      >
        Generate Markup
      </button>

      {markup && (
        <textarea
          readOnly
          rows={15}
          value={markup}
          className="w-full rounded border p-4 font-mono dark:bg-gray-800 dark:text-green-400"
        />
      )}
    </div>
  );
};

export default TabsGenerator;
