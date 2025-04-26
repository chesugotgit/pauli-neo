document.addEventListener('DOMContentLoaded', () => {
  const dataContainer = document.getElementById('localStorageData');
  const noDataMessage = document.getElementById('noDataMessage');
  const clearButton = document.getElementById('clearStorageButton');
  const settingsContainer = document.createElement('div');
  const moodsContainer = document.createElement('div');

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

      // Separate containers for settings and moods
      settingsContainer.innerHTML = '';
      moodsContainer.innerHTML = '';

      // Title for settings
      const settingsTitle = document.createElement('h3');
      settingsTitle.textContent = 'Settings';
      settingsTitle.className = 'text-lg text-gray-300 mb-4';
      settingsContainer.appendChild(settingsTitle);

      // Title for moods
      const moodsTitle = document.createElement('h3');
      moodsTitle.textContent = 'Moods';
      moodsTitle.className = 'text-lg text-gray-300 mb-4';
      moodsContainer.appendChild(moodsTitle);

      keys.forEach(key => {
        const value = localStorage.getItem(key);
        try {
          const parsedValue = JSON.parse(value);

          if (key === 'moods') {
            // Display mood data
            parsedValue.forEach(moodData => {
              const moodDiv = createMoodCard(moodData);
              moodsContainer.appendChild(moodDiv);
            });
          } else {
            // Display other settings data
            const settingDiv = createSettingCard(key, parsedValue);
            settingsContainer.appendChild(settingDiv);
          }
        } catch (e) {
          // Handle non-JSON data (plain text)
          const itemDiv = createSettingCard(key, value)
          settingsContainer.appendChild(itemDiv);
        }
      });

      if (settingsContainer.children.length > 1) {
        dataContainer.appendChild(settingsContainer);
      } else {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow';
          const keySpan = document.createElement('span');
          keySpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
          keySpan.textContent = "No Settings Data Found.";

          itemDiv.appendChild(keySpan);
          settingsContainer.appendChild(itemDiv);
          dataContainer.appendChild(settingsContainer);
      }

      if (moodsContainer.children.length > 1) {
        dataContainer.appendChild(moodsContainer);
      } else {
        const itemDiv = document.createElement('div');
          itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow';
          const keySpan = document.createElement('span');
          keySpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
          keySpan.textContent = "No Moods Data Found.";

          itemDiv.appendChild(keySpan);
          moodsContainer.appendChild(itemDiv);
          dataContainer.appendChild(moodsContainer);
      }
    }
  }

  function createMoodCard(moodData) {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow mb-2';

      const date = new Date(moodData.timestamp);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      const dateSpan = document.createElement('span');
      dateSpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
      dateSpan.textContent = formattedDate;

      const moodSpan = document.createElement('span');
      moodSpan.className = 'font-mono text-cyan-300 break-all text-left sm:text-right w-full sm:w-auto';
      moodSpan.textContent = moodData.mood;

      itemDiv.appendChild(dateSpan);
      itemDiv.appendChild(moodSpan);
      return itemDiv;
  }

  function createSettingCard(key, parsedValue) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow mb-2';
    const keySpan = document.createElement('span');
    keySpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
    keySpan.textContent = key;

    const valueSpan = document.createElement('span');
    valueSpan.className = 'font-mono text-cyan-300 break-all text-left sm:text-right w-full sm:w-auto';
    
    if (typeof parsedValue === 'object') {
      valueSpan.textContent = JSON.stringify(parsedValue, null, 2); // Pretty print JSON
      valueSpan.classList.add('whitespace-pre'); // Preserve formatting
    } else {
      valueSpan.textContent = parsedValue;
    }

    itemDiv.appendChild(keySpan);
    itemDiv.appendChild(valueSpan);
    return itemDiv;
  }

  function displayCalculationHistory() {
    const calculationHistory = JSON.parse(localStorage.getItem('calculationHistory') || '[]');

    if (calculationHistory.length > 0) {
        // Title for calculation history
        const calculationHistoryTitle = document.createElement('h3');
        calculationHistoryTitle.textContent = 'Calculation History';
        calculationHistoryTitle.className = 'text-lg text-gray-300 mb-4';
        settingsContainer.appendChild(calculationHistoryTitle);

        calculationHistory.forEach(calc => {
            const calcDiv = createCalculationCard(calc);
            settingsContainer.appendChild(calcDiv);
        });
    } else {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow';
        const keySpan = document.createElement('span');
        keySpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
        keySpan.textContent = "No Calculation History Found.";

        itemDiv.appendChild(keySpan);
        settingsContainer.appendChild(itemDiv);
    }
}

function createCalculationCard(calc) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow mb-2';

    const expressionSpan = document.createElement('span');
    expressionSpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
    expressionSpan.textContent = calc.expression;

    const resultSpan = document.createElement('span');
    resultSpan.className = 'font-mono text-cyan-300 break-all text-left sm:text-right w-full sm:w-auto';
    resultSpan.textContent = `= ${calc.result}`;

    itemDiv.appendChild(expressionSpan);
    itemDiv.appendChild(resultSpan);
    return itemDiv;
}

  function displayGpaHistory() {
    const gpaHistory = JSON.parse(localStorage.getItem('gpaHistory') || '[]');
    if(gpaHistory.length > 0){
        const gpaHistoryTitle = document.createElement('h3');
        gpaHistoryTitle.textContent = 'GPA History';
        gpaHistoryTitle.className = 'text-lg text-gray-300 mb-4';
        moodsContainer.appendChild(gpaHistoryTitle);

        gpaHistory.forEach(gpaEntry => {
            const gpaDiv = createGpaCard(gpaEntry);
            moodsContainer.appendChild(gpaDiv);
        });
    } else{
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow';
        const keySpan = document.createElement('span');
        keySpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
        keySpan.textContent = "No GPA History Found.";

        itemDiv.appendChild(keySpan);
        moodsContainer.appendChild(itemDiv);
    }
}

function createGpaCard(gpaEntry) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow mb-2';
    const date = new Date(gpaEntry.timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
    dateSpan.textContent = formattedDate;

    const gpaSpan = document.createElement('span');
    gpaSpan.className = 'font-mono text-cyan-300 break-all text-left sm:text-right w-full sm:w-auto';
    gpaSpan.textContent = `GPA: ${gpaEntry.gpa}`;

    itemDiv.appendChild(dateSpan);
    itemDiv.appendChild(gpaSpan);
    return itemDiv;
  }
  
  function displayPlannerEvents() {
    const plannerEvents = JSON.parse(localStorage.getItem('events') || '[]');

    if(plannerEvents.length > 0){
        // Title for planner events
        const plannerEventsTitle = document.createElement('h3');
        plannerEventsTitle.textContent = 'Study Planner Events';
        plannerEventsTitle.className = 'text-lg text-gray-300 mb-4';
        moodsContainer.appendChild(plannerEventsTitle);
    
        plannerEvents.forEach(event => {
            const eventDiv = createEventCard(event);
            moodsContainer.appendChild(eventDiv);
        });
    } else{
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow';
        const keySpan = document.createElement('span');
        keySpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
        keySpan.textContent = "No Planner Events Found.";

        itemDiv.appendChild(keySpan);
        moodsContainer.appendChild(itemDiv);
    }
}

function createEventCard(event) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex flex-col sm:flex-row justify-between items-start p-3 bg-gray-700 rounded shadow mb-2';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'font-mono text-purple-300 break-all mb-1 sm:mb-0 sm:mr-4 font-semibold';
    nameSpan.textContent = event.name;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'font-mono text-cyan-300 break-all text-left sm:text-right w-full sm:w-auto';
    dateSpan.textContent = event.date;

    itemDiv.appendChild(nameSpan);
    itemDiv.appendChild(dateSpan);
    return itemDiv;
  }
  

  // Initial display
  displayLocalStorage();
  displayGpaHistory();
  displayCalculationHistory();
  displayPlannerEvents();

  // Add event listener for the Planner function
  document.addEventListener('DOMContentLoaded', () => {
    const addEventBtn = document.getElementById('addEventBtn');
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const eventBody = document.getElementById('eventBody');

    let events = []; // Store events here

    // Load events from localStorage if available
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
        // Rebuild the table with existing events
        events.forEach(event => {
            addEventToTable(event);
        });
    }

    addEventBtn.addEventListener('click', () => {
        const name = eventNameInput.value.trim();
        const date = eventDateInput.value;

        // Validate
        if (name === '' || date === '') {
            alert('Please enter both event name and date.');
            return;
        }

        // Adds to the array for later display
        const newEvent = { name, date };
        events.push(newEvent);

        // Update localStorage
        localStorage.setItem('events', JSON.stringify(events));

        // Add event to table
        addEventToTable(newEvent);

        //Clear inputs
        eventNameInput.value = '';
        eventDateInput.value = '';
    });

    // Function to add event to table (used when loading existing events)
    function addEventToTable(event) {
        const row = eventBody.insertRow();
        const nameCell = row.insertCell();
        const dateCell = row.insertCell();

        nameCell.textContent = event.name;
        dateCell.textContent = event.date;
    }
});

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
