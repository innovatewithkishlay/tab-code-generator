import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const TabsGenerator: React.FC = () => {
  const [tabLabels, setTabLabels] = useState<string[]>(["Tab 1", "Tab 2"]);
  const [tabContents, setTabContents] = useState<string[]>(["Content 1", "Content 2"]);
  const [generatedMarkup, setGeneratedMarkup] = useState<string>("");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [showMarkup, setShowMarkup] = useState(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Restore active tab index from cookie on mount
  useEffect(() => {
    const saved = Cookies.get("selectedTabIndex");
    if (saved !== undefined) {
      setActiveTab(parseInt(saved, 10));
    }
  }, []);

  const updateLabel = (index: number, text: string) => {
    const copy = [...tabLabels];
    copy[index] = text;
    setTabLabels(copy);
  };

  const updateContent = (index: number, text: string) => {
    const copy = [...tabContents];
    copy[index] = text;
    setTabContents(copy);
  };

  const addTab = () => {
    setTabLabels(prev => [...prev, `Tab ${prev.length + 1}`]);
    setTabContents(prev => [...prev, `Content ${prev.length + 1}`]);
  };

  const selectTab = (index: number) => {
    setActiveTab(index);
    Cookies.set("selectedTabIndex", index.toString());
  };

  const handleKeyNav = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    let newIndex = activeTab;
    if (e.key === "ArrowRight") {
      newIndex = (activeTab + 1) % tabLabels.length;
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      newIndex = (activeTab - 1 + tabLabels.length) % tabLabels.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      newIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      newIndex = tabLabels.length - 1;
      e.preventDefault();
    }
    if (newIndex !== activeTab) {
      selectTab(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  const generateMarkup = () => {

    const buttonsHTML = tabLabels
      .map(
        (label, i) => `
        <button 
          id="tab-${i + 1}" 
          role="tab" 
          aria-selected="${i === activeTab ? "true" : "false"}" 
          aria-controls="panel-${i + 1}" 
          data-role="tab-btn" 
          tabindex="${i === activeTab ? 0 : -1}" 
          style="background-color: ${i === activeTab ? "#ccc" : "#eee"}; padding: 6px; border: none; cursor: pointer;"
          onclick="activateTab('panel-${i + 1}', this)"
        >
          ${label}
        </button>
      `
      )
      .join("");

    const panelsHTML = tabContents
      .map(
        (content, i) => `
        <div 
          id="panel-${i + 1}" 
          role="tabpanel" 
          aria-labelledby="tab-${i + 1}" 
          tabindex="${i === activeTab ? 0 : -1}"
          data-role="tab-pane" 
          style="display: ${i === activeTab ? "block" : "none"}; padding: 12px; border: 1px solid #aaa; border-top: none; font-family: Arial, sans-serif;"
        >
          ${content}
        </div>
      `
      )
      .join("");

    const scriptBlock = `
<script>
(function() {
  function activateTab(id, clickedBtn) {
    document.querySelectorAll('[data-role="tab-pane"]').forEach(pan => {
      pan.style.display = 'none';
      pan.setAttribute('tabindex', '-1');
    });
    document.querySelectorAll('[data-role="tab-btn"]').forEach(btn => {
      btn.style.backgroundColor = '#eee';
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
    });
    const panel = document.getElementById(id);
    panel.style.display = 'block';
    panel.setAttribute('tabindex', '0');

    clickedBtn.style.backgroundColor = '#ccc';
    clickedBtn.setAttribute('aria-selected', 'true');
    clickedBtn.setAttribute('tabindex', '0');
    clickedBtn.focus();
  }

  window.activateTab = activateTab;

  document.addEventListener('keydown', function(e) {
    const focused = document.activeElement;
    if (!focused) return;
    if (focused.getAttribute('data-role') !== 'tab-btn') return;

    const tabs = Array.from(document.querySelectorAll('[data-role="tab-btn"]'));
    let index = tabs.indexOf(focused);
    if (index === -1) return;

    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        index = (index + 1) % tabs.length;
        tabs[index].click();
        tabs[index].focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        index = (index - 1 + tabs.length) % tabs.length;
        tabs[index].click();
        tabs[index].focus();
        break;
      case 'Home':
        e.preventDefault();
        tabs[0].click();
        tabs[0].focus();
        break;
      case 'End':
        e.preventDefault();
        tabs[tabs.length - 1].click();
        tabs[tabs.length - 1].focus();
        break;
    }
  });
})();
</script>
`.trim();

    const finalOutput = `
<div style="font-family: Arial, sans-serif;">
  <div role="tablist" style="border-bottom: 1px solid #aaa; padding-bottom: 6px;">
    ${buttonsHTML}
  </div>
  ${panelsHTML}
</div>
${scriptBlock}
`.trim();

    setGeneratedMarkup(finalOutput);
    setCopied(false);
    setShowMarkup(true);
  };

  const copyMarkup = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(generatedMarkup);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const showPreview = showMarkup;

  return (
    <div className="min-h-screen flex flex-col p-6 pt-20 text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="texty mb-4 text-2xl font-bold">Custom Tab Generator</h1>

      <div className="mb-5">
        {tabLabels.map((label, i) => (
          <div key={i} className="mb-3 flex gap-3">
            <input
              type="text"
              value={label}
              onChange={e => updateLabel(i, e.target.value)}
              className="w-40 rounded border p-2 dark:bg-gray-800 dark:text-white"
              placeholder={`Label ${i + 1}`}
            />
            <input
              type="text"
              value={tabContents[i]}
              onChange={e => updateContent(i, e.target.value)}
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

      <div className="mb-4 flex space-x-3">
        {tabLabels.map((label, i) => (
          <button
            key={i}
            ref={el => {
              tabRefs.current[i] = el;
            }}
            id={`tab-${i}`}
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`panel-${i}`}
            tabIndex={activeTab === i ? 0 : -1}
            onClick={() => selectTab(i)}
            onKeyDown={handleKeyNav}
            className={`px-4 py-2 rounded ${
              activeTab === i
                ? "bg-gray-400 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                : "bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {showPreview && (
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="border rounded mb-10 mt-2 bg-white dark:bg-gray-900 p-5 shadow-sm"
          style={{ minHeight: 56 }}
        >
          {tabContents[activeTab]}
        </div>
      )}

      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={generateMarkup}
          className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Generate Markup
        </button>
        {generatedMarkup && (
          <button
            onClick={() => setShowMarkup(s => !s)}
            className="rounded border border-gray-200 bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {showMarkup ? "Hide Markup" : "Show Markup"}
          </button>
        )}
      </div>

      {showMarkup && generatedMarkup && (
        <div className="mb-10">
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
            Save as <code>Hello.html</code> and open in a browser.
          </p>
          <textarea
            readOnly
            ref={textareaRef}
            rows={15}
            value={generatedMarkup}
            onFocus={e => e.currentTarget.select()}
            aria-label="Generated HTML code"
            className="w-full rounded border p-4 font-mono dark:bg-gray-800 dark:text-green-400"
            style={{ fontSize: 14, resize: "vertical" }}
          />
          <div className="mt-2 flex">
            <button
              type="button"
              onClick={copyMarkup}
              className="mr-auto rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-400"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabsGenerator;
