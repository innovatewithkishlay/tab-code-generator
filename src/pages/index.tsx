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

  useEffect(() => {
    const savedIndex = Cookies.get("selectedTabIndex");
    if (savedIndex !== undefined) {
      setActiveTab(parseInt(savedIndex, 10));
    }
  }, []);

  const updateLabel = (index: number, value: string) => {
    const updatedLabels = [...tabLabels];
    updatedLabels[index] = value;
    setTabLabels(updatedLabels);
  };

  const updateContent = (index: number, value: string) => {
    const updatedContents = [...tabContents];
    updatedContents[index] = value;
    setTabContents(updatedContents);
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
          style="
            background-color: ${i === activeTab ? "#ddd" : "#f5f5f5"};
            padding: 10px 16px;
            border: none;
            cursor: pointer;
            border-radius: 6px 6px 0 0;
            margin-right: 4px;
            font-weight: ${i === activeTab ? "600" : "400"};
          "
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
          style="
            display: ${i === activeTab ? "block" : "none"};
            padding: 20px;
            border: 1px solid #e5e5e5;
            border-top: none;
            font-family: Arial, sans-serif;
            border-radius: 0 0 8px 8px;
            background: white;
          "
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
      btn.style.backgroundColor = '#f5f5f5';
      btn.style.fontWeight = '400';
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
    });
    const panel = document.getElementById(id);
    panel.style.display = 'block';
    panel.setAttribute('tabindex', '0');
    clickedBtn.style.backgroundColor = '#ddd';
    clickedBtn.style.fontWeight = '600';
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
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto;">
  <div role="tablist" style="border-bottom: 1px solid #e5e5e5;">
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
    <div className="min-h-screen flex flex-col p-4 md:p-6 pt-6 md:pt-8 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200 pb-20">
      <h1 className="mb-4 text-2xl font-bold">Custom Tab Generator</h1>
      <div className="mb-5">
        {tabLabels.map((label, i) => (
          <div key={i} className="mb-3 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={label}
              onChange={e => updateLabel(i, e.target.value)}
              className="w-full md:w-48 rounded-lg border border-gray-300 p-3 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder={`Label ${i + 1}`}
            />
            <input
              type="text"
              value={tabContents[i]}
              onChange={e => updateContent(i, e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder={`Content ${i + 1}`}
            />
          </div>
        ))}
        <button
          onClick={addTab}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Another Tab
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:items-start">
        <div className="flex-1">
          <div className="mb-4 flex flex-wrap gap-2">
            {tabLabels.map((label, i) => (
              <button
                key={i}
                ref={el => { tabRefs.current[i] = el; }}
                id={`tab-${i}`}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`panel-${i}`}
                tabIndex={activeTab === i ? 0 : -1}
                onClick={() => selectTab(i)}
                onKeyDown={handleKeyNav}
                className={`text-sm md:text-base px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  activeTab === i
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white font-medium"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
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
              className="mb-6 mt-2 min-h-[120px] rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              {tabContents[activeTab]}
            </div>
          )}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={generateMarkup}
              className="w-full rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto transition-colors"
            >
              Generate Markup
            </button>
            {generatedMarkup && (
              <button
                onClick={() => setShowMarkup(s => !s)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto transition-colors"
              >
                {showMarkup ? "Hide Markup" : "Show Markup"}
              </button>
            )}
          </div>
        </div>
        {showMarkup && generatedMarkup && (
          <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800 lg:max-w-[50%] lg:mt-6">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="generated-code"
                className="texty block text-gray-700 text-sm font-medium dark:text-gray-300"
              >
                Generated Output
              </label>
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                HTML
              </span>
            </div>
            <p className="texty mb-3 text-sm font-normal text-gray-600 dark:text-gray-400">
              Save as <code className="rounded bg-gray-700 px-1.5 py-0.5 text-xs text-gray-300 dark:bg-gray-600">Hello.html</code> and open in a browser.
            </p>
            <textarea
              id="generated-code"
              readOnly
              ref={textareaRef}
              rows={12}
              value={generatedMarkup}
              onFocus={e => e.currentTarget.select()}
              aria-label="Generated HTML code"
              className="w-full rounded-lg border border-gray-300 p-4 font-mono text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[220px]"
            />
            <button
              type="button"
              onClick={copyMarkup}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:ring-offset-transparent sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {copied ? "Copied to Clipboard!" : "Copy Code"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsGenerator;
