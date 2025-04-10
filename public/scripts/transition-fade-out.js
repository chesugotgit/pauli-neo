// e:\pauli-neo\public\scripts\transition-fade-out.js

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
        overlay.style.opacity = '1'; //
        overlay.style.transition = 'opacity 0.7s ease-in-out';
        overlay.style.pointerEvents = 'none';

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
               overlay.style.opacity = '0';
            });
        });

        overlay.addEventListener('transitionend', () => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, { once: true });
    }
});
