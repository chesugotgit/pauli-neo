/**
 * Applies global settings stored in localStorage on page load.
 * Example: Applies dark mode theme.
 */

function applyInitialSettings() {
    // --- Dark Mode ---
    const storedDarkMode = localStorage.getItem('darkModeEnabled');
    // Default to true (dark mode) if no setting is stored
    const isDarkMode = storedDarkMode !== null ? storedDarkMode === 'true' : true; 

    // TODO: Implement actual theme switching logic here.
    // This usually involves adding/removing a class on the <html> or <body> tag.
    // Example using Tailwind's 'dark' class strategy:
    if (isDarkMode) {
        document.documentElement.classList.add('dark'); // Assumes Tailwind dark mode is 'class'
    } else {
        document.documentElement.classList.remove('dark');
    }
    console.log(`Theme applied: ${isDarkMode ? 'Dark' : 'Light'}`);

    // --- Apply other global settings here ---
    // Example: Maybe apply a custom font size preference, etc.
}

// Apply settings as soon as possible, but ensure body exists if needed
if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', applyInitialSettings);
} else {
    // `DOMContentLoaded` has already fired
    applyInitialSettings();
}

// Listen for Storage Changes on other Tabs
 window.addEventListener('storage', (event) => {
   if (event.key === 'darkModeEnabled') {
     applyInitialSettings(); // Re-apply if dark mode changes in another tab
   }
 });
