/********* Input script *********/

const mainHTML = document.querySelector('main');
const nameInput = document.querySelector('.form input');
const invalidInputMessage = document.querySelector('.incorrect-input-message');
let playerName = "";


nameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
            playerName = promptAgainIfNeeded(nameInput, invalidInputMessage);
    }
    if (!notValid(playerName)) {

        /********* Game script *********/
        mainHTML.innerHTML = "";

        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "counter-screen");
        mainHTML.appendChild(newDiv);

        let i = 3;
        newDiv.innerText = `${i}`
        const interval = setInterval(() => {
            i--;
            newDiv.innerText = `${i}`;
            if (i === 0) {
              clearInterval(interval);
              mainHTML.removeChild(newDiv);
            }
          }, 1000)

        let gameScript = document.createElement('script');
        gameScript.src = "./game.js";
        document.body.appendChild(gameScript);

        File.exports = { playerName };
    }
});




function notValid(value) {
    return (value === null || value === undefined || value.trim() === '');
}

function promptAgainIfNeeded(inputField, message) {
    if (notValid(inputField.value)) {
        invalidInputMessage.hidden = false;
        promptAgainIfNeeded(inputField, message);
    } else {
        let name = inputField.value;
        inputField.value = "";
        inputField.innerText = "";
        message.innerText = "";
        return name;
    } 
}