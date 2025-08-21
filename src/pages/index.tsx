import React, { useState } from "react";

const TabsGenerator: React.FC = () => {
  const [labels, setLabels] = useState<string[]>(["Tab 1", "Tab 2"]);
  const [contents, setContents] = useState<string[]>(["Content 1", "Content 2"]);
  const [exportedMarkup, setExportedMarkup] = useState<string>("");

  const updateLabel = (idx: number, text: string) => {
    const copy = [...labels];
    copy[idx] = text;
    setLabels(copy);
  };

  const updateContent = (idx: number, text: string) => {
    const copy = [...contents];
    copy[idx] = text;
    setContents(copy);
  };

  const addNewTab = () => {
    setLabels((prev) => [...prev, `Tab ${prev.length + 1}`]);
    setContents((prev) => [...prev, `Content ${prev.length + 1}`]);
  };

  const buildMarkup = () => {
    const ids = labels.map((_, i) => `pane-${i + 1}`);

    const buttonsHTML = labels
      .map(
        (txt, i) =>
          `<button id="btn-${ids[i]}" class="tab-btn" onclick="activateTab('${ids[i]}', this)">${txt}</button>`
      )
      .join("");

    const panelsHTML = contents
      .map(
        (txt, i) =>
          `<div id="${ids[i]}" class="tab-pane" style="display:${
            i === 0 ? "block" : "none"
          };">${txt}</div>`
      )
      .join("");

    const scriptBlock = `
<script>
function activateTab(id, clickedBtn) {
  document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  
  document.querySelectorAll('.tab-btn').forEach(b => b.style.backgroundColor = '#eee');
  clickedBtn.style.backgroundColor = '#ccc';
}
</script>`;

    const finalHTML = `
<div style="font-family:Arial, sans-serif;">
  <div role="tablist" style="border-bottom:1px solid #aaa;padding-bottom:6px;">
    ${buttonsHTML}
  </div>
  ${panelsHTML}
</div>
${scriptBlock}`.trim();

    setExportedMarkup(finalHTML);
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Custom Tab Generator</h1>

      <div className="mb-5">
        {labels.map((lbl, i) => (
          <div key={i} className="flex gap-3 mb-3">
            <input
              type="text"
              value={lbl}
              onChange={(e) => updateLabel(i, e.target.value)}
              className="border rounded p-2 w-40 dark:bg-gray-800 dark:text-white"
              placeholder={`Label ${i + 1}`}
            />
            <input
              type="text"
              value={contents[i]}
              onChange={(e) => updateContent(i, e.target.value)}
              className="border rounded p-2 flex-1 dark:bg-gray-800 dark:text-white"
              placeholder={`Content ${i + 1}`}
            />
          </div>
        ))}

        <button
          onClick={addNewTab}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Another Tab
        </button>
      </div>

      <button
        onClick={buildMarkup}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 mb-4"
      >
        Generate Markup
      </button>

      {exportedMarkup && (
        <textarea
          readOnly
          rows={15}
          value={exportedMarkup}
          className="w-full p-4 border rounded font-mono dark:bg-gray-800 dark:text-green-400"
        />
      )}
    </div>
  );
};

export default TabsGenerator;
