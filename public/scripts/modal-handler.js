/**
 * Generic Modal Handler
 *
 * Handles opening and closing modals based on data attributes.
 * - Add `data-modal-target="yourModalId"` to the trigger element (e.g., a card link).
 * - Give the modal container the ID specified in `data-modal-target` and the class `modal`.
 * - Add the class `modal-backdrop` to the modal's background overlay div.
 * - Add the class `modal-close-button` to any element within the modal that should close it (e.g., a close button).
 */

document.addEventListener('DOMContentLoaded', () => {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalClosers = document.querySelectorAll('.modal-close-button, .modal-backdrop');
    let currentlyOpenModal = null;
    let currentlyOpenModalPanel = null; // Keep track of the panel div
    let currentlyOpenModalBackdrop = null; // Keep track of the backdrop div
  
    /**
     * Opens a specific modal element.
     * @param {HTMLElement} modalElement - The modal element to open.
     */
    function openModal(modalElement) {
      if (!modalElement) return;
  
      if (currentlyOpenModal) {
        closeModal(); // Close any existing modal first
      }
  
      const backdrop = modalElement.querySelector('.modal-backdrop');
      const panel = modalElement.querySelector('.inline-block.align-bottom'); // Find the panel div
  
      if (!panel || !backdrop) {
          console.error("Modal structure incomplete: missing panel or backdrop.", modalElement);
          return;
      }
  
      modalElement.classList.remove('hidden'); // Make the container visible
      document.body.classList.add('overflow-hidden');
  
      // --- Animation Start ---
      // Use requestAnimationFrame to ensure initial styles are applied before transitioning
      requestAnimationFrame(() => {
          backdrop.classList.remove('opacity-0'); // Fade in backdrop
          backdrop.classList.add('opacity-75'); // Target opacity for backdrop
  
          panel.classList.remove('opacity-0'); // Fade in panel
          panel.classList.remove('scale-95'); // Scale up panel
          panel.classList.add('opacity-100');
          panel.classList.add('scale-100');
      });
      // --- Animation End ---
  
      currentlyOpenModal = modalElement;
      currentlyOpenModalPanel = panel;
      currentlyOpenModalBackdrop = backdrop;
  
      // Focus management
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 50);
      }
    }
  
    /**
     * Closes the currently open modal.
     */
    function closeModal() {
      if (!currentlyOpenModal || !currentlyOpenModalPanel || !currentlyOpenModalBackdrop) return;
  
      // --- Animation Start ---
      currentlyOpenModalBackdrop.classList.remove('opacity-75'); // Fade out backdrop
      currentlyOpenModalBackdrop.classList.add('opacity-0');
  
      currentlyOpenModalPanel.classList.remove('opacity-100'); // Fade out panel
      currentlyOpenModalPanel.classList.remove('scale-100'); // Scale down panel
      currentlyOpenModalPanel.classList.add('opacity-0');
      currentlyOpenModalPanel.classList.add('scale-95');
      // --- Animation End ---
  
      // Wait for animation to finish before hiding and cleaning up
      // Duration should match the CSS transition duration (e.g., 300ms)
      setTimeout(() => {
          if (currentlyOpenModal) { // Check if it hasn't been closed by another event
              currentlyOpenModal.classList.add('hidden');
              document.body.classList.remove('overflow-hidden');
              currentlyOpenModal = null;
              currentlyOpenModalPanel = null;
              currentlyOpenModalBackdrop = null;
          }
      }, 300); // Match CSS duration-300
    }
  
    // --- Event Listeners (No changes needed here) ---
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        if (trigger.tagName === 'A' && trigger.getAttribute('href') === 'javascript:void(0);') {
            event.preventDefault();
        }
        const targetModalId = trigger.dataset.modalTarget;
        if (!targetModalId) return;
        const targetModal = document.getElementById(targetModalId);
        if (targetModal) openModal(targetModal);
        else console.warn(`Modal with ID "${targetModalId}" not found.`);
      });
    });
  
    modalClosers.forEach(closer => {
      closer.addEventListener('click', (event) => {
          const modal = closer.closest('.modal'); // Find the parent modal
          // Ensure the click is directly on the backdrop if it's a backdrop
          if (closer.classList.contains('modal-backdrop') && event.target !== closer) {
              return;
          }
          // Ensure we only close the currently open modal
          if (modal === currentlyOpenModal) {
               closeModal();
          }
      });
    });
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && currentlyOpenModal) {
        closeModal();
      }
    });
  });
  