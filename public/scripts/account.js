document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('localStorageData');
    const noDataMessage = document.getElementById('noDataMessage');
    const clearButton = document.getElementById('clearStorageButton');
  
    function displayLocalStorage() {
      // Clear previous entries
      dataContainer.innerHTML = ''; 
  
      const keys = Object.keys(localStorage);
  
      if (keys.length === 0) {
        noDataMessage.classList.remove('hidden');
        dataContainer.classList.add('hidden');
        clearButton.disabled = true; // Disable button if nothing to clear
        clearButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        noDataMessage.classList.add('hidden');
        dataContainer.classList.remove('hidden');
        clearButton.disabled = false;
        clearButton.classList.remove('opacity-50', 'cursor-not-allowed');
  
        keys.forEach(key => {
          const value = localStorage.getItem(key);
          
          const itemDiv = document.createElement('div');
          itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow';
  
          const keySpan = document.createElement('span');
          keySpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
          keySpan.textContent = key;
  
          const valueSpan = document.createElement('span');
          valueSpan.className = 'font-mono text-cyan-300 break-all text-left sm:text-right w-full sm:w-auto';
          // Try to nicely format JSON if possible
          try {
              const parsed = JSON.parse(value);
              valueSpan.textContent = JSON.stringify(parsed, null, 2); // Pretty print JSON
              valueSpan.classList.add('whitespace-pre'); // Preserve formatting
          } catch (e) {
              valueSpan.textContent = value; // Display as plain text if not JSON
          }
  
          itemDiv.appendChild(keySpan);
          itemDiv.appendChild(valueSpan);
          dataContainer.appendChild(itemDiv);
        });
      }
    }
  
    // Initial display
    displayLocalStorage();
  
    // Add event listener for the clear button
    clearButton.addEventListener('click', () => {
      // Confirmation dialog
      if (confirm('Are you sure you want to clear ALL data stored by this website? This cannot be undone.')) {
        localStorage.clear();
        alert('All stored data has been cleared.');
        displayLocalStorage();
      }
    });
  });
  