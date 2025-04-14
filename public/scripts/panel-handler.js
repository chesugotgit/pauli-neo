/**
 * Generic Panel (Off-Canvas) Handler
 *
 * Handles opening and closing slide-in panels based on data attributes.
 * - Add `data-panel-target="yourPanelId"` to the trigger element.
 * - Give the panel container the ID specified in `data-panel-target` and the class `panel`.
 * - Add the ID `panelBackdrop` and class `panel-backdrop` to a single backdrop div.
 * - Add the class `panel-close-button` to any element within the panel that should close it.
 */

document.addEventListener('DOMContentLoaded', () => {
    const panelTriggers = document.querySelectorAll('[data-panel-target]');
    const backdrop = document.getElementById('panelBackdrop');
    const panelClosers = document.querySelectorAll('.panel-close-button');
    let currentlyOpenPanel = null;
  
    /**
     * Opens a specific panel element.
     * @param {HTMLElement} panelElement - The panel element to open.
     */
    function openPanel(panelElement) {
      if (!panelElement) return;
      if (currentlyOpenPanel) closePanel();
  
      // Show panel and backdrop
      panelElement.classList.remove('translate-x-full'); // Slide in
      if (backdrop) {
          backdrop.classList.remove('hidden');
          // Use rAF for smooth transition start
          requestAnimationFrame(() => {
              backdrop.classList.remove('opacity-0');
              backdrop.classList.add('opacity-50'); // Target opacity
          });
      }
  
      document.body.classList.add('overflow-hidden');
      currentlyOpenPanel = panelElement;
  
      // Focus management
      const focusableElements = panelElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 50);
      }
    }
  
    /**
     * Closes the currently open panel.
     */
    function closePanel() {
      if (!currentlyOpenPanel) return;
  
      currentlyOpenPanel.classList.add('translate-x-full'); // Slide out
      if (backdrop) {
          backdrop.classList.remove('opacity-50'); // Fade out backdrop
          backdrop.classList.add('opacity-0');
      }
  
      // Wait for panel slide animation to finish before removing overflow hidden
      // and potentially hiding backdrop (if needed, though opacity handles visibility)
      // Duration should match the CSS transition duration (e.g., 300ms)
      setTimeout(() => {
          if (currentlyOpenPanel && currentlyOpenPanel.classList.contains('translate-x-full')) { // Check if still closing
               document.body.classList.remove('overflow-hidden');
               if (backdrop) backdrop.classList.add('hidden'); // Hide backdrop after fade
               currentlyOpenPanel = null;
          }
      }, 300); // Match CSS duration-300
    }
  
    // --- Event Listeners (No changes needed here) ---
    panelTriggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        if (trigger.tagName === 'A' && trigger.getAttribute('href') === 'javascript:void(0);') {
            event.preventDefault();
        }
        const targetPanelId = trigger.dataset.panelTarget;
        if (!targetPanelId) return;
        const targetPanel = document.getElementById(targetPanelId);
        if (targetPanel) openPanel(targetPanel);
        else console.warn(`Panel with ID "${targetPanelId}" not found.`);
      });
    });
  
    panelClosers.forEach(closer => {
      closer.addEventListener('click', closePanel);
    });
  
    if (backdrop) {
        backdrop.addEventListener('click', closePanel);
    }
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && currentlyOpenPanel) {
        closePanel();
      }
    });
  });
  