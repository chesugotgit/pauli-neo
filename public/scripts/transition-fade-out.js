/**
 * Performs a fade-out animation on the body and then navigates to the specified URL.
 * Stores the target page's intended background color for the fade-in effect.
 * @param {string} url - The URL to navigate to after the fade-out.
 * @param {string} [bgColor] - Optional: The background color to use for the fade effect overlay on the *next* page load. Defaults to body background.
 */

function fadeOutAndNavigate(url, bgColor) {
    // Determine the color for the next page's fade-in overlay
    const transitionColor = bgColor || getComputedStyle(document.body).backgroundColor || 'rgb(17, 24, 39)'; // Default to bg-gray-900 if needed

    // Store the color for the next page load
    sessionStorage.setItem('transitionBgColor', transitionColor);

    // Add a class to the body to trigger the fade-out animation
    document.body.classList.add('fade-out');

    // Wait for the animation to complete before navigating
    // Adjust the timeout duration to match your CSS animation duration (e.g., 300ms)
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// This part handles the fade-in effect when a page loads *after* a transition
document.addEventListener("DOMContentLoaded", () => {
    const transitionColor = sessionStorage.getItem('transitionBgColor');

    if (transitionColor) {
        // Clear the stored value so it doesn't run again on refresh
        sessionStorage.removeItem('transitionBgColor');

        // Create overlay, initially visible
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = transitionColor;
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '1';
        // Match transition duration to fadeOutAndNavigate timeout
        overlay.style.transition = 'opacity 0.3s ease-in-out'; // Reduced duration to match fade-out
        overlay.style.pointerEvents = 'none'; // Allow clicks through

        document.body.appendChild(overlay);

        // Use requestAnimationFrame for smoother start of fade-out
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
               overlay.style.opacity = '0';
            });
        });

        // Remove overlay after transition
        overlay.addEventListener('transitionend', () => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, { once: true });
    }
});
