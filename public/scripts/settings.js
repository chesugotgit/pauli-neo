document.addEventListener('DOMContentLoaded', () => {
    // --- Get References to Setting Elements ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const userNameInput = document.getElementById('userName');
    const resetSettingsButton = document.getElementById('resetSettingsButton');

    // --- Default Settings Values ---
    const defaultSettings = {
        darkModeEnabled: true, // Default to dark mode
        userName: ''
        // Add other defaults here
    };

    // --- Load Settings Function (Loads into form) ---
    function loadSettingsIntoForm() {
        // Dark Mode Toggle
        const storedDarkMode = localStorage.getItem('darkModeEnabled');
        const isDarkMode = storedDarkMode !== null ? storedDarkMode === 'true' : defaultSettings.darkModeEnabled;
        if (darkModeToggle) { // Check if element exists
            darkModeToggle.checked = isDarkMode;
        }

        // User Name Input
        const storedUserName = localStorage.getItem('userName');
        if (userNameInput) { // Check if element exists
             userNameInput.value = storedUserName !== null ? storedUserName : defaultSettings.userName;
        }
       
        // Load other settings into their respective form elements...
    }

    // --- Save Setting Function ---
    function saveSetting(key, value) {
        localStorage.setItem(key, value);
        console.log(`Setting saved: ${key} = ${value}`); // For debugging

        // If changing dark mode, immediately apply it visually as well
        if (key === 'darkModeEnabled') {
            if (value) { // value will be boolean true/false from checkbox
                 document.documentElement.classList.add('dark');
            } else {
                 document.documentElement.classList.remove('dark');
            }
        }
    }

    // --- Event Listeners for Saving (Only add if elements exist) ---
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (event) => {
            saveSetting('darkModeEnabled', event.target.checked);
        });
    }

    if (userNameInput) {
        userNameInput.addEventListener('input', (event) => {
            saveSetting('userName', event.target.value);
        });
    }

    // Add listeners for other settings...


    // --- Reset Settings Functionality (Only add if button exists) ---
    if (resetSettingsButton) {
        resetSettingsButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all settings to their defaults?')) {
                // Apply defaults visually immediately
                const defaultDarkMode = defaultSettings.darkModeEnabled;
                if (darkModeToggle) darkModeToggle.checked = defaultDarkMode;
                 if (defaultDarkMode) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                if (userNameInput) userNameInput.value = defaultSettings.userName;
                
                // Remove specific setting keys from localStorage
                Object.keys(defaultSettings).forEach(key => {
                    localStorage.removeItem(key);
                    console.log(`Removed setting: ${key}`);
                });

                alert('Settings have been reset to defaults.');
            }
        });
    }

    // --- Initial Load ---
    loadSettingsIntoForm(); // Load settings into the form elements on this page
});
