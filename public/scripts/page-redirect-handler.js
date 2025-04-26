/**
 * Generic Page Redirect Handler with Fade-Out and History Management
 *
 * Handles navigation for elements with `data-page-target`, applying a fade-out first.
 * Manages a navigation history stack in sessionStorage.
 * Assumes a `fadeOutAndNavigate(url)` function exists (from transition-fade-out.js or similar).
 */

function getHistory() {
  const history = sessionStorage.getItem('navigationHistory');
  return history ? JSON.parse(history) : [];
}

function updateHistory(url) {
  const history = getHistory();
  history.push(url);
  sessionStorage.setItem('navigationHistory', JSON.stringify(history));
}

function navigateBack() {
  const history = getHistory();
  if (history.length > 1) {
      history.pop(); // Remove the current page
      const previousPage = history.pop(); // Get the previous page
      sessionStorage.setItem('navigationHistory', JSON.stringify(history));
      fadeOutAndNavigate(previousPage);
  } else {
      // If there is no previous page, redirect to index.html
      console.warn('No previous page in history. Redirecting to index.html.');
      if (typeof fadeOutAndNavigate === 'function') {
          fadeOutAndNavigate('/index.html');
      } else {
          window.location.href = '/index.html';
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const pageRedirectTriggers = document.querySelectorAll('[data-page-target]');
  const indexPage = '/index.html'
  const currentPage = window.location.href;

  //Update index with current location
  if(currentPage !== indexPage){
      updateHistory(window.location.href)
  }

  pageRedirectTriggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
          // Prevent the default link navigation immediately
          event.preventDefault();

          const targetPage = trigger.dataset.pageTarget;
           const currentPage = window.location.href; //currentPage is defined inside of the function

          if (!targetPage) {
              console.warn('Trigger element is missing data-page-target attribute:', trigger);
              // Fallback to standard href if data attribute is missing but href exists
              if (trigger.href && trigger.href !== '#') {
                  window.location.href = trigger.href;
              } else {
                  console.warn('Trigger element has no fallback: ', trigger)
              }
              return;
          }

          // Update history before navigating
          updateHistory(currentPage);

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

  // Add event listener for back links
  const backLinks = document.querySelectorAll('.back-link');
  backLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          navigateBack();
      });
  });
  //Clear history if refreshed or on index.html
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD || currentPage === indexPage) {
      sessionStorage.removeItem("navigationHistory");
  }
});
