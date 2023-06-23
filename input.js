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

        /***** START *****/
        mainHTML.innerHTML = "";
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "counter-screen");
        mainHTML.appendChild(newDiv);
    
        let counter = 3;
        newDiv.innerText = `${counter}`
        const interval = setInterval(() => {
            counter--;
            newDiv.innerText = `${counter}`;
            if (counter === 0) {
            clearInterval(interval);
            mainHTML.removeChild(newDiv);
            playGame();
            }      
        }, 1000)
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



/***** Game script *****/

function playGame() {

    mainHTML.setAttribute("class", "playing");

    const scores = document.createElement("div");
    scores.setAttribute("class", "scores");
    mainHTML.appendChild(scores);

    const scorePlayer = document.createElement("div");
    scorePlayer.setAttribute("class", "player");
    mainHTML.appendChild(scorePlayer);

    const scoreComputer = document.createElement("div");
    scoreComputer.setAttribute("class", "computer");
    mainHTML.appendChild(scoreComputer);

    const rounds = document.createElement("div");
    rounds.setAttribute("class", "round-box");
    mainHTML.appendChild(rounds);

    const choices = document.createElement("div");
    choices.setAttribute("class", "choices");
    mainHTML.appendChild(choices);

}