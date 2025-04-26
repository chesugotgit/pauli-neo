document.addEventListener('DOMContentLoaded', () => {
    const addCourseBtn = document.getElementById('addCourseBtn');
    const calculateGpaBtn = document.getElementById('calculateGpaBtn');
    const gradeInput = document.getElementById('gradeInput');
    const creditsInput = document.getElementById('creditsInput');
    const courseBody = document.getElementById('courseBody');
    const gpaResult = document.getElementById('gpaResult');

    let courses = []; // Store the course grade and credits here
    let gpaHistory = []; //Store calculated GPAs here

    addCourseBtn.addEventListener('click', () => {
        const gradePoints = parseFloat(gradeInput.value);
        const credits = parseInt(creditsInput.value);

        // Validate
        if (isNaN(gradePoints) || isNaN(credits) || credits <= 0) {
            alert('Invalid grade or credits. Please check your input.');
            return;
        }

        // Adds to the array for later calculation
        courses.push({ gradePoints, credits });

        // Add course to table
        const row = courseBody.insertRow();
        const gradeCell = row.insertCell();
        const creditsCell = row.insertCell();
        const qualityPointsCell = row.insertCell();

        gradeCell.textContent = gradeInput.options[gradeInput.selectedIndex].text;
        creditsCell.textContent = credits;
        qualityPointsCell.textContent = (gradePoints * credits).toFixed(2);

        //Clear inputs
        gradeInput.selectedIndex = 0;
        creditsInput.value = 3;
    });

    calculateGpaBtn.addEventListener('click', () => {
        if (courses.length === 0) {
            gpaResult.textContent = 'GPA: 0.0';
            return;
        }
        let totalQualityPoints = 0;
        let totalCredits = 0;
        for (const course of courses) {
            totalQualityPoints += course.gradePoints * course.credits;
            totalCredits += course.credits;
        }

        const gpa = totalQualityPoints / totalCredits;
        gpaResult.textContent = `GPA: ${gpa.toFixed(2)}`;

        // Add gpa to gpaHistory
        gpaHistory.push({ gpa: gpa.toFixed(2), courses: [...courses], timestamp: Date.now() });
        localStorage.setItem('gpaHistory', JSON.stringify(gpaHistory));

        // Clear the table
        courses = [];
        courseBody.innerHTML = '';
    });
        // Load gpaHistory from localStorage if available
        const storedGpaHistory = localStorage.getItem('gpaHistory');
        if (storedGpaHistory) {
            gpaHistory = JSON.parse(storedGpaHistory);
        }
});
