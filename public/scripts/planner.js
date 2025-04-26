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
