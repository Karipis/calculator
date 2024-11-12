const textArea = document.getElementById('result_area');
const buttons = document.querySelectorAll('#grid button');

// Define the set of operators
const operators = ['+', '-', '*', '/'];

// Loop through each button and add a click event listener
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        //Play click sound
        const sound = new Audio('sound.mp3');
        sound.volume = 0.05;
        sound.play();

        const value = this.value; // Get the value of the clicked button
        const currentText = textArea.value; // Current content in textarea
        const lastChar = currentText.slice(-1); // Get the last character in the textarea

        // Handle different button functionality
        if (value === 'AC') {
            textArea.value = ''; // Clear the textarea
        } else if (value === 'DEL') {
            textArea.value = currentText.slice(0, -1); // Delete the last character
        } else if (value === '=') {
            try {
                // Only evaluate if the last character is not an operator
                if (!operators.includes(lastChar)) {
                    textArea.value = eval(currentText); // Evaluate the expression
                }
            } catch (error) {
                textArea.value = 'Error'; // Show error if expression is invalid
            }
        } else if (operators.includes(value)) {
            // Prevent consecutive operators
            if (operators.includes(lastChar)) {
                // Replace the last operator with the new one
                textArea.value = currentText.slice(0, -1) + value;
            } else {
                textArea.value +=
                    value; // Append the operator if the last char is not an operator
            }
        } else {
            // Append the button's value to the textarea for numbers and other inputs
            textArea.value += value;
        }
    });
});