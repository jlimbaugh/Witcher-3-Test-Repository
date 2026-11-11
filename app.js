/**
 * Operation Phoenix — HTML Hosting Proof of Concept
 * Zero external dependencies. Mobile-first. localStorage persistence.
 */

(function () {
  "use strict";

  // ------------------------------------------------------------------
  // Configuration
  // ------------------------------------------------------------------
  const STORAGE_KEY = "phoenix-poc-checklist-v1";

  const DEFAULT_ITEMS = [
    { id: "nav", text: "Navigation between three sections works", done: false },
    { id: "accordion", text: "Accordion panels expand and collapse", done: false },
    { id: "checklist", text: "Checklist items can be toggled", done: false },
    { id: "persist", text: "Checklist state survives page reload", done: false },
    { id: "reset", text: "Reset control clears state after confirmation", done: false },
    { id: "mobile", text: "Layout remains usable on mobile viewport", done: false },
    { id: "dark", text: "Dark-mode interface is readable", done: false },
    { id: "relative", text: "Relative asset paths resolve correctly", done: false }
  ];

  // ------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------
  let checklistState = loadState();

  // ------------------------------------------------------------------
  // DOM references
  // ------------------------------------------------------------------
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");
  const checklistEl = document.getElementById("checklist-items");
  const resetBtn = document.getElementById("reset-btn");
  const statusEl = document.getElementById("checklist-status");
  const buildDateEl = document.getElementById("build-date");
  const accordionToggles = document.querySelectorAll(".accordion-toggle");

  // ------------------------------------------------------------------
  // Initialization
  // ------------------------------------------------------------------
  function init() {
    if (buildDateEl) {
      buildDateEl.textContent = "2026-11-11"; // Fixed release date (v1.0.2-poc)
    }

    renderChecklist();
    bindNavigation();
    bindAccordions();
    bindReset();
    updateStatus();
  }

  // ------------------------------------------------------------------
  // localStorage helpers
  // ------------------------------------------------------------------
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_ITEMS);

      const parsed = JSON.parse(raw);

      // Validate structure before using .find()
      if (!Array.isArray(parsed)) {
        console.warn("Checklist data is not an array. Using defaults.");
        return structuredClone(DEFAULT_ITEMS);
      }

      // Merge with defaults so new items appear if the list evolves
      return DEFAULT_ITEMS.map(function (def) {
        const existing = parsed.find(function (p) {
          return p && typeof p === "object" && p.id === def.id;
        });
        return existing
          ? { id: def.id, text: def.text, done: !!existing.done }
          : structuredClone(def);
      });
    } catch (e) {
      console.warn("Failed to load checklist state, using defaults.", e);
      return structuredClone(DEFAULT_ITEMS);
    }
  }

  // Tracks whether a localStorage write error is currently displayed
  let storageErrorActive = false;

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checklistState));
      storageErrorActive = false;
    } catch (e) {
      console.warn("Failed to persist checklist state.", e);
      storageErrorActive = true;
      if (statusEl) {
        statusEl.textContent = "Warning: could not save to localStorage.";
      }
    }
  }

  // ------------------------------------------------------------------
  // Checklist rendering & interaction
  // ------------------------------------------------------------------
  function renderChecklist() {
    if (!checklistEl) return;

    checklistEl.innerHTML = "";

    checklistState.forEach(function (item) {
      const li = document.createElement("li");
      li.className = "checklist-item" + (item.done ? " checked" : "");
      li.setAttribute("role", "listitem");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "chk-" + item.id;
      checkbox.checked = item.done;
      checkbox.setAttribute("aria-label", item.text);

      const label = document.createElement("label");
      label.htmlFor = "chk-" + item.id;
      label.textContent = item.text;

      checkbox.addEventListener("change", function () {
        item.done = checkbox.checked;
        li.classList.toggle("checked", item.done);
        saveState();
        updateStatus();
      });

      // Allow clicking the whole row
      li.addEventListener("click", function (e) {
        if (e.target === checkbox || e.target === label) return;
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change"));
      });

      li.appendChild(checkbox);
      li.appendChild(label);
      checklistEl.appendChild(li);
    });
  }

  function updateStatus() {
    if (!statusEl) return;
    // Do not overwrite an active localStorage error warning
    if (storageErrorActive) return;

    const total = checklistState.length;
    const done = checklistState.filter(function (i) { return i.done; }).length;
    statusEl.textContent = done + " of " + total + " items complete";
  }

  // ------------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------------
  function bindNavigation() {
    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const target = btn.getAttribute("data-section");
        if (!target) return;

        // Update buttons
        navButtons.forEach(function (b) {
          const isActive = b === btn;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-pressed", isActive ? "true" : "false");
        });

        // Update sections
        sections.forEach(function (sec) {
          const isTarget = sec.id === target;
          sec.classList.toggle("active", isTarget);
          if (isTarget) {
            sec.removeAttribute("hidden");
          } else {
            sec.setAttribute("hidden", "");
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------
  // Accordions
  // ------------------------------------------------------------------
  function bindAccordions() {
    accordionToggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        const panelId = toggle.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);

        toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (panel) {
          if (expanded) {
            panel.setAttribute("hidden", "");
          } else {
            panel.removeAttribute("hidden");
          }
        }
      });
    });
  }

  // ------------------------------------------------------------------
  // Reset
  // ------------------------------------------------------------------
  function bindReset() {
    if (!resetBtn) return;

    resetBtn.addEventListener("click", function () {
      const confirmed = window.confirm(
        "Reset all checklist items?\n\nThis will clear the saved progress and cannot be undone."
      );

      if (!confirmed) return;

      checklistState = structuredClone(DEFAULT_ITEMS);
      saveState();
      renderChecklist();

      if (statusEl && !storageErrorActive) {
        statusEl.textContent = "Checklist reset.";
        setTimeout(function () {
          updateStatus();
        }, 2000);
      } else {
        updateStatus();
      }
    });
  }

  // ------------------------------------------------------------------
  // Start
  // ------------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
