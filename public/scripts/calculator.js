document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('calcDisplay');
    const buttons = document.querySelectorAll('.calcButton');
    const clearButton = document.getElementById('clearButton');

    let expression = ''; // Stores the current math expression
    let calculationHistory = []; //Array to keep track of calculations

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (buttonText === '=') {
                try {
                    const result = math.evaluate(expression).toString(); // Evaluate using Math.js
                    display.value = result;

                    // Add calculation to history
                    calculationHistory.push({ expression: expression, result: result, timestamp: Date.now() });
                    localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
                    expression = result; //make sure that after using equals, the calculation can continue from that number.

                } catch (error) {
                    display.value = 'Error';
                    expression = '';
                }
            } else {
                expression += buttonText;
                display.value = expression;
            }
        });
    });

    clearButton.addEventListener('click', () => {
        expression = '';
        display.value = '';
    });

    // Load history from localStorage if available
    const storedHistory = localStorage.getItem('calculationHistory');
    if (storedHistory) {
        calculationHistory = JSON.parse(storedHistory);
    }
});
