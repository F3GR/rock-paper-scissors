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

    const winScore = 5;
    let winsPlayer = 0;
    let winsComputer = 0;
    let currentRound = 1;

    mainHTML.setAttribute("class", "playing");

    const rounds = document.createElement("div");
    rounds.setAttribute("class", "round-box");
    mainHTML.appendChild(rounds);

    const round = document.createElement("h2");
    round.innerText = `Round:`;
    rounds.appendChild(round);

    const roundNumber = document.createElement("h2");
    roundNumber.setAttribute("class", "round-number");
    roundNumber.innerText = `${currentRound}`;
    rounds.appendChild(roundNumber);



    const scores = document.createElement("div");
    scores.setAttribute("class", "scores");
    mainHTML.appendChild(scores);


    const scorePlayer = document.createElement("div");
    scorePlayer.setAttribute("class", "players-menu");
    scores.appendChild(scorePlayer);

    const playerText = document.createElement("h2");
    playerText.setAttribute("class", "text");
    playerText.innerText = `${playerName}'s score:`;
    scorePlayer.appendChild(playerText);

    const playerScore = document.createElement("h2");
    playerScore.setAttribute("class", "player score");
    playerScore.innerText = `${winsPlayer}`;
    scorePlayer.appendChild(playerScore);


    const scoreComputer = document.createElement("div");
    scoreComputer.setAttribute("class", "computers-menu");
    scores.appendChild(scoreComputer);

    const computerText = document.createElement("h2");
    computerText.setAttribute("class", "text");
    computerText.innerText = `Computer's score:`;
    scoreComputer.appendChild(computerText);

    const computerScore = document.createElement("h2");
    computerScore.setAttribute("class", "computer score");
    computerScore.innerText = `${winsComputer}`;
    scoreComputer.appendChild(computerScore);


    const roundResult = document.createElement("div");
    roundResult.setAttribute("class", "round-result");
    mainHTML.appendChild(roundResult);

    const choices = document.createElement("div");
    choices.setAttribute("class", "choices");
    mainHTML.appendChild(choices);

    const choiceRock = document.createElement("button");
    choiceRock.setAttribute("class", "rock");
    choices.appendChild(choiceRock);

    const imageRock = document.createElement("img");
    imageRock.setAttribute("src", "./images/rock.png");
    choiceRock.appendChild(imageRock);

}