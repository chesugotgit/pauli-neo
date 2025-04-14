/**
 * Generic Page Redirect Handler with Fade-Out
 *
 * Handles navigation for elements with `data-page-target`, applying a fade-out first.
 * Assumes a `fadeOutAndNavigate(url)` function exists (from transition-fade-out.js or similar).
 */

document.addEventListener('DOMContentLoaded', () => {
    const pageRedirectTriggers = document.querySelectorAll('[data-page-target]');
  
    pageRedirectTriggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        // Prevent the default link navigation immediately
        event.preventDefault();
  
        const targetPage = trigger.dataset.pageTarget;
  
        if (!targetPage) {
          console.warn('Trigger element is missing data-page-target attribute:', trigger);
          // Fallback to standard href if data attribute is missing but href exists
          if (trigger.href && trigger.href !== '#') {
              window.location.href = trigger.href;
          }
          return;
        }
  
        // Check if the fadeOutAndNavigate function exists (from transition-fade-out.js)
        if (typeof fadeOutAndNavigate === 'function') {
          fadeOutAndNavigate(targetPage);
        } else {
          // Fallback if the function isn't found
          console.warn('fadeOutAndNavigate function not found. Navigating directly.');
          window.location.href = targetPage;
        }
      });
    });
  });
  