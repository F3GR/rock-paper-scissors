/********* Input script *********/

const mainHTML = document.querySelector('main');
const nameInput = document.querySelector('.form input');
const invalidInputMessage = document.querySelector('.incorrect-input-message');
let playerName = "";

const choiceOptions = ["rock", "paper", "scissors"];
const winScore = 5;

let winsPlayer = 0;
let winsComputer = 0;
let currentRound = 1;

let playerChoice;
let computerChoice;

let roundResultMessage;

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

        newDiv.innerText = `${counter}`;
        const interval = setInterval(() => {
        counter--;
        newDiv.innerText = `${counter}`;
        if (counter === 0) {
            clearInterval(interval);
            mainHTML.removeChild(newDiv);

            renderGameInterface();

            addEventListeners();
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



/***** Game Interface *****/

function renderGameInterface() {

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


    // Player's current score
    const scorePlayer = document.createElement("div");
    scorePlayer.setAttribute("class", "players-menu");
    scores.appendChild(scorePlayer);
    
    const playerDisplayName = document.createElement("h2");
    playerDisplayName.setAttribute("class", "player-name");
    playerDisplayName.innerText = `${playerName}`;
    scorePlayer.appendChild(playerDisplayName);

    const playerText = document.createElement("h2");
    playerText.setAttribute("class", "text");
    playerText.innerText = `'s score:`;
    scorePlayer.appendChild(playerText);

    const playerScore = document.createElement("h2");
    playerScore.setAttribute("class", "player score");
    playerScore.innerText = `${winsPlayer}`;
    scorePlayer.appendChild(playerScore);


    // Computer's current score
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

    // Previous round's result
    const roundResult = document.createElement("div");
    roundResult.setAttribute("class", "round-result");
    mainHTML.appendChild(roundResult);

    roundResultMessage = document.createElement("h2");
    roundResultMessage.setAttribute("class", "round-result-message");
    roundResult.appendChild(roundResultMessage);



    const choices = document.createElement("div");
    choices.setAttribute("class", "choices");
    mainHTML.appendChild(choices);

    // Button Rock
    const choiceRock = document.createElement("button");
    choiceRock.setAttribute("id", "rock");
    choices.appendChild(choiceRock);

    const imageRock = document.createElement("img");
    imageRock.setAttribute("src", "./images/rock.png");
    imageRock.setAttribute("alt", "An image of choice 'Rock'");
    imageRock.setAttribute("title", "Click on the image or select it and\n press 'Enter' to make your choice!");
    choiceRock.appendChild(imageRock);
    
    // Button Paper
    const choicePaper = document.createElement("button");
    choicePaper.setAttribute("id", "paper");
    choices.appendChild(choicePaper);

    const imagePaper = document.createElement("img");
    imagePaper.setAttribute("src", "./images/paper.png");
    imagePaper.setAttribute("alt", "An image of choice 'Paper'");
    imagePaper.setAttribute("title", "Click on the image or select it and\n press 'Enter' to make your choice!");
    choicePaper.appendChild(imagePaper);

    // Button Scissors
    const choiceScissors = document.createElement("button");
    choiceScissors.setAttribute("id", "scissors");
    choices.appendChild(choiceScissors);

    const imageScissors = document.createElement("img");
    imageScissors.setAttribute("src", "./images/scissors.png");
    imageScissors.setAttribute("alt", "An image of choice 'Scissors'");
    imageScissors.setAttribute("title", "Click on the image or select it and\n press 'Enter' to make your choice!");
    choiceScissors.appendChild(imageScissors);

}

// Event listeners on each of the buttons (click + Enter)
function addEventListeners() {

    const choicesArray = Array.from(document.getElementsByTagName("button"));

    function getChoice() {
      playerChoice = this.id;
      computerChoice = getComputerChoice();
      playRound(playerChoice, computerChoice);
    }
    
    choicesArray.forEach(selector => {
        selector.addEventListener("keydown", function(e) {
        if (e.key === 'Enter') {
            getChoice.call(this);
            computerChoice = getComputerChoice();
            playRound(playerChoice, computerChoice);
        }
        });
        selector.addEventListener("click", getChoice);
    });
}

function getComputerChoice() {
    const computerChoice = Math.round(Math.random() * 3) + 1;
    if (computerChoice === 1) {
        return choiceOptions[0];
    } else if (computerChoice === 2) {
        return choiceOptions[1];
    } else {
        return choiceOptions[2];
    } 
}


function playRound(playerChoice, computerChoice) {
    switch (true) {
        case (playerChoice === computerChoice):
        roundResultMessage.innerText = `Round ${currentRound} is a Tie! Your choice is ${playerChoice}, Computer's choice is ${computerChoice} as well.`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        break;

        case (playerChoice === choiceOptions[0], computerChoice === choiceOptions[1]):
        roundResultMessage.innerText = `Computer Wins round ${currentRound}! Rock loses to Scissors`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsComputer++;
        break;

        case (playerChoice === choiceOptions[0], computerChoice === choiceOptions[2]):
        roundResultMessage.innerText = `You Win round ${currentRound}! Rock beats Scissors`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsPlayer++;
        break;
        

        case (playerChoice === choiceOptions[1], computerChoice === choiceOptions[0]):
        roundResultMessage.innerText = `You Win round ${currentRound}! Paper beats Rock`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsPlayer++;
        break;

        case (playerChoice === choiceOptions[1], computerChoice === choiceOptions[2]):
        roundResultMessage.innerText = `Computer Wins round ${currentRound}! Paper loses to Scissors`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsComputer++;
        break;

        case (playerChoice === choiceOptions[2], computerChoice === choiceOptions[0]):
        roundResultMessage.innerText = `Computer Wins round ${currentRound}! Scissors lose to Rock`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsComputer++;
        break;
        
        case (playerChoice === choiceOptions[2], computerChoice === choiceOptions[1]):
        roundResultMessage.innerText = `You Win round ${currentRound}! Scissors beat Paper`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsPlayer++;   
        break;   
    }
}

function printWinner() {
    if (winsPlayer === winScore) {
        alert("Congratulations! You won the match!");
    }
    if (winsComputer === winScore) {
        alert("Game over! Computer won the match.");
    }
}