document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const addNewLessonPlanButton = document.getElementById('addNewLessonPlanButton');
    const addNewSectionButton = document.getElementById('addNewSectionButton');
    const lessonPlansContainer = document.getElementById('lessonPlansContainer');
    const lessonForm = document.getElementById('lessonForm');
    const sectionForm = document.getElementById('sectionForm');
    const sectionSelect = document.getElementById('sectionSelect');
    // Get the new lesson plan modal
    const newLessonPlanModal = document.getElementById('newLessonPlanModal');
    const lessonModalTitle = document.getElementById('modal-title-lesson');
    const lessonTitleInput = document.getElementById('lessonTitle');
    const lessonDescriptionInput = document.getElementById('lessonDescription');
    const lessonClassDividerSelect = document.getElementById('lessonClassDivider');
    const submitLessonPlan = document.getElementById('submitLessonPlan'); // Reference to the submit button

    // Initialize arrays to store lesson plans and section templates
    let lessonPlans = []; // Stores the lesson plans here
    let sectionTemplates = []; // Stores the section templates here

    // Load lesson plans from localStorage if available
    const storedPlans = localStorage.getItem('lessonPlans');
    if (storedPlans) {
        lessonPlans = JSON.parse(storedPlans);
        lessonPlans.forEach(lessonPlan => addLessonPlan(lessonPlan));
    }

    // Load section templates from localStorage if available
    const storedSections = localStorage.getItem('sectionTemplates');
    if (storedSections) {
        sectionTemplates = JSON.parse(storedSections);
        loadSectionDropdown();
    }

    // Open modal when clicking the Add New Lesson button
    addNewLessonPlanButton.addEventListener('click', () => {
        const modalId = addNewLessonPlanButton.dataset.modalTarget;
        const modal = document.getElementById(modalId);
        if (modal) {
            //Clear inputs
            lessonForm.reset();
            newLessonPlanModal.classList.remove('opacity-0', 'scale-95');
            newLessonPlanModal.classList.add('opacity-100', 'scale-100');
            lessonModalTitle.textContent = 'Create a New Lesson Plan';
            modal.classList.remove('hidden');
            submitLessonPlan.classList.remove("hidden"); // Show the button again when creating a new lesson plan
        }
    });

    // Open modal when clicking the Add New Section button
    addNewSectionButton.addEventListener('click', () => {
        const modalId = addNewSectionButton.dataset.modalTarget;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('opacity-100', 'scale-100');
        }
    });

    //Submit Section form
    sectionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('sectionTemplateTitle').value;
        const description = document.getElementById('sectionTemplateDescription').value;
        const content = document.getElementById('sectionTemplateContent').value;

        // Create new section template
        const newSectionTemplate = {
            title,
            description,
            content,
            timestamp: Date.now(),
        };

        addSectionTemplate(newSectionTemplate);

        //Close Modal
        const modal = document.getElementById('newSectionModal');
        modal.classList.add('hidden');
        modal.classList.remove('opacity-100', 'scale-100');

        //Clear form
        sectionForm.reset();
    });
    
    //Submit lesson form
    lessonForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('lessonTitle').value;
        const description = document.getElementById('lessonDescription').value;
        const classDivider = document.getElementById('lessonClassDivider').value;
        const selectedOptions = sectionSelect.selectedOptions;
        const selectedSections = Array.from(selectedOptions).map(option => {
            const section = sectionTemplates.find(s => s.title === option.value);
            return section ? section : null;
        }).filter(section => section !== null);

        // Create new plan
        const newLessonPlan = {
            title,
            description,
            classDivider,
            sections: selectedSections,
            timestamp: Date.now(),
        };

        // Add to array
        lessonPlans.push(newLessonPlan);

        // Save to local storage
        localStorage.setItem('lessonPlans', JSON.stringify(lessonPlans));
        addLessonPlan(newLessonPlan);

        //Close Modal
        const modal = document.getElementById('newLessonPlanModal');
        modal.classList.add('hidden');
        modal.classList.remove('opacity-100', 'scale-100');

        //Clear form
        lessonForm.reset();
    });
    
    // Function to add a lesson plan to the DOM
    function addLessonPlan(lessonPlan) {
        const lessonDiv = document.createElement('div');
        lessonDiv.className = 'bg-gray-700 p-4 rounded-md shadow flex justify-between items-center';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'text-gray-300';
        titleSpan.textContent = lessonPlan.title;

        const viewButton = document.createElement('button');
        viewButton.className = 'text-sm bg-amber-600 hover:bg-amber-700 text-white py-1 px-3 rounded transition duration-200';
        viewButton.textContent = 'View';
        viewButton.addEventListener('click', () => {
            viewLessonPlan(lessonPlan);
        });

        lessonDiv.appendChild(titleSpan);
        lessonDiv.appendChild(viewButton);
        lessonPlansContainer.appendChild(lessonDiv);
    }

    // Function to add a section template to the sectionTemplates array and update localStorage
    function addSectionTemplate(sectionTemplate) {
        sectionTemplates.push(sectionTemplate);
        localStorage.setItem('sectionTemplates', JSON.stringify(sectionTemplates));
        loadSectionDropdown(); // Update dropdown after adding new section
    }

    // Function to load section templates into the dropdown
    function loadSectionDropdown() {
        sectionSelect.innerHTML = ''; // Clear existing options

        sectionTemplates.forEach(section => {
            const option = document.createElement('option');
            option.value = section.title;
            option.textContent = section.title;
            sectionSelect.appendChild(option);
        });
    }

    // Function to display the contents of a lesson plan
    function viewLessonPlan(lessonPlan) {
        lessonModalTitle.textContent = lessonPlan.title;
        lessonTitleInput.value = lessonPlan.title;
        lessonDescriptionInput.value = lessonPlan.description;
        lessonClassDividerSelect.value = lessonPlan.classDivider;
        lessonTitleInput.readOnly = true;
        lessonDescriptionInput.readOnly = true;
        lessonClassDividerSelect.disabled = true;
        submitLessonPlan.classList.add("hidden"); // Hide the button in view mode

        //Clear dropdown
        sectionSelect.innerHTML = '';
        //Display the selected sections
        lessonPlan.sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section.title;
            option.textContent = section.title;
            option.selected = true;
            option.disabled = true;
            sectionSelect.appendChild(option);
        });

        // Show the modal
        newLessonPlanModal.classList.remove('hidden');
    }
});
