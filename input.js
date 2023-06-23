/*********

Input script 

*********/

const mainHTML = document.querySelector('main');
const nameInput = document.querySelector('.form input');
const invalidInputMessage = document.querySelector('.incorrect-input-message');
let playerName = "";

nameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
            playerName = promptAgainIfNeeded(nameInput, invalidInputMessage);
    }
    if (!notValid(playerName)) {
        mainHTML.innerHTML = "";
    }
});

function notValid(value) {
    return (value === null || value === undefined || value.trim() === '');
}

function promptAgainIfNeeded(inputField, message) {
    if (notValid(inputField.value)) {
        invalidInputMessage.innerText = "Your input is not valid. Please, try again!";
    } else {
        let name = inputField.value;
        inputField.value = "";
        inputField.innerText = "";
        message.innerText = "";
        return name;
    } 
}




/*********

Game script 

*********/