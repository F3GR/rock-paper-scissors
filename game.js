const mainHTML = document.querySelector('main');
const nameInput = document.querySelector('.form input');
const invalidInputMessage = document.querySelector('.incorrect-input-message');
let playerName = "";

const choiceOptions = ["rock", "paper", "scissors"];
const winScore = 5;

let winsPlayer;
let winsComputer;
let currentRound;

let playerChoice;
let computerChoice;

let lastEventTime = 0;

nameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastEventTime;

        if (timeDiff < 1000) {
            invalidInputMessage.hidden = false;
            invalidInputMessage.innerText = "The prompt attempts are too quick, please try a little later";
            lastEventTime = currentTime;
        } else {
            playerName = promptAgainIfNeeded(nameInput, invalidInputMessage);
            lastEventTime = currentTime;
            if (!notValid(playerName)) {
                startGame();
            }
        }
    }
});

function notValid(value) {
    return (value === null || value === undefined || value.trim() === '');
}

function promptAgainIfNeeded(inputField, messageField) {
    if (notValid(inputField.value)) {
        messageField.hidden = false;
        messageField.innerText = "Your input is not valid, please try again!";
    } else {
        let name = inputField.value;
        inputField.innerText = "";
        messageField.innerText = "";
        return name;
    } 
}

function startGame() {
    mainHTML.innerHTML = "";
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "counter-screen");
    mainHTML.appendChild(newDiv);

    winsPlayer = 0;
    winsComputer = 0;
    currentRound = 1;

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
    const menuPlayer = document.createElement("div");
    menuPlayer.setAttribute("class", "players-menu");
    scores.appendChild(menuPlayer);
    
    const playerDisplayName = document.createElement("h2");
    playerDisplayName.setAttribute("class", "player-name");
    playerDisplayName.innerText = `${playerName}`;
    menuPlayer.appendChild(playerDisplayName);

    const playerText = document.createElement("h2");
    playerText.setAttribute("class", "text");
    playerText.innerText = `'s score:`;
    menuPlayer.appendChild(playerText);

    const playerScore = document.createElement("h2");
    playerScore.setAttribute("class", "player-score");
    playerScore.innerText = `${winsPlayer}`;
    menuPlayer.appendChild(playerScore);


    // Computer's current score
    const menuComputer = document.createElement("div");
    menuComputer.setAttribute("class", "computers-menu");
    scores.appendChild(menuComputer);

    const computerText = document.createElement("h2");
    computerText.setAttribute("class", "text");
    computerText.innerText = `Computer's score:`;
    menuComputer.appendChild(computerText);

    const computerScore = document.createElement("h2");
    computerScore.setAttribute("class", "computer-score");
    computerScore.innerText = `${winsComputer}`;
    menuComputer.appendChild(computerScore);

    // Previous round's result
    const roundResult = document.createElement("div");
    roundResult.setAttribute("class", "round-result");
    mainHTML.appendChild(roundResult);

    const roundResultMessage = document.createElement("h2");
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


    function getChoice(e) {
        if (e.key === 'Enter' & timeDiff >= 500) {
          e.stopImmediatePropagation();
          e.preventDefault(); // Prevent the form submission on Enter key press

          const currentTime = Date.now();
          const timeDiff = currentTime - lastEventTime;
          
          playerChoice = this.id;
          computerChoice = getComputerChoice();
          lastEventTime = currentTime;
          playRound(playerChoice, computerChoice);
        }
      }
    
      function handleClick(e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        const currentTime = Date.now();
        const timeDiff = currentTime - lastEventTime;

        if (timeDiff >= 500) {
            playerChoice = this.id;
            computerChoice = getComputerChoice();
            lastEventTime = currentTime;
            playRound(playerChoice, computerChoice);
        }
      }
    
      choicesArray.forEach(selector => {
        selector.addEventListener("keyup", getChoice);
        selector.addEventListener("click", handleClick);
      });
}

function getComputerChoice() {
    const computerChoice = Math.floor(Math.random() * 2);
    return choiceOptions[computerChoice];
}


function playRound(playerChoice, computerChoice) {

    const selectCurrentRoundNumber = document.querySelector('.round-number');
    const selectComputerScore = document.querySelector('.computer-score');
    const selectPlayerScore = document.querySelector('.player-score');
    const selectRoundResultMessage = document.querySelector('.round-result-message');

    switch (true) {
        case (playerChoice === computerChoice):
        selectRoundResultMessage.innerText = `Round ${currentRound} is a Tie! Your choice is ${playerChoice}, Computer's choice is ${computerChoice} as well.`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        selectCurrentRoundNumber.innerText = `${currentRound}`;
        break;

        case (playerChoice === choiceOptions[0] && computerChoice === choiceOptions[1]):
        selectRoundResultMessage.innerText = `Computer Wins round ${currentRound}! Rock loses to Scissors`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsComputer++;
        selectCurrentRoundNumber.innerText = `${currentRound}`;
        selectComputerScore.innerText = `${winsComputer}`;
        findWinner();
        break;

        case (playerChoice === choiceOptions[0] && computerChoice === choiceOptions[2]):
        selectRoundResultMessage.innerText = `You Win round ${currentRound}! Rock beats Scissors`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsPlayer++;
        selectCurrentRoundNumber.innerText = `${currentRound}`;
        selectPlayerScore.innerText = `${winsPlayer}`;
        findWinner();
        break;
        
        case (playerChoice === choiceOptions[1] && computerChoice === choiceOptions[0]):
        selectRoundResultMessage.innerText = `You Win round ${currentRound}! Paper beats Rock`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsPlayer++;
        selectCurrentRoundNumber.innerText = `${currentRound}`;
        selectPlayerScore.innerText = `${winsPlayer}`;
        findWinner();
        break;

        case (playerChoice === choiceOptions[1] && computerChoice === choiceOptions[2]):
        selectRoundResultMessage.innerText = `Computer Wins round ${currentRound}! Paper loses to Scissors`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsComputer++;
        selectCurrentRoundNumber.innerText = `${currentRound}`;
        selectComputerScore.innerText = `${winsComputer}`;
        findWinner();
        break;

        case (playerChoice === choiceOptions[2] && computerChoice === choiceOptions[0]):
        selectRoundResultMessage.innerText = `Computer Wins round ${currentRound}! Scissors lose to Rock`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsComputer++;
        selectCurrentRoundNumber.innerText = `${currentRound}`;
        selectComputerScore.innerText = `${winsComputer}`;
        findWinner();
        break;
        
        case (playerChoice === choiceOptions[2] && computerChoice === choiceOptions[1]):
        selectRoundResultMessage.innerText = `You Win round ${currentRound}! Scissors beat Paper`;
        playerChoice = "";
        computerChoice = "";
        currentRound++;
        winsPlayer++;
        selectCurrentRoundNumber.innerText = `${currentRound}`;
        selectPlayerScore.innerText = `${winsPlayer}`;
        findWinner();
        break;   
    }
}


function findWinner() {
    if (winsPlayer === 5 || winsComputer == 5) {

        const spanDots = document.createElement('span');
        const roundResultMessage = document.querySelector('.round-result-message');
        roundResultMessage.appendChild(spanDots);
        spanDots.innerText = `...`;

        const choicesArray = Array.from(document.getElementsByTagName("button"));
        const choiceDiv = document.querySelector('.choices');
        choicesArray.forEach(selector => selector.disabled = true);
        choicesArray.forEach(selector => choiceDiv.removeChild(selector));

        setTimeout(function() {
            mainHTML.innerHTML = "";
            printEndMenu();
        }, 2000);
    }
}

function printEndMenu() {
    const endBox = document.createElement("div");
    endBox.setAttribute("class", "end-box");
    mainHTML.appendChild(endBox);

    const endMessage = document.createElement("h1");
    endMessage.setAttribute("class", "end-message");
    endBox.appendChild(endMessage);

    const endButton = document.createElement("button");
    endButton.setAttribute("class", "replay-button");
    endButton.setAttribute("title", "Click on the button or select it and\n press 'Enter' to start a new match!");
    endBox.appendChild(endButton);

    if (winsPlayer === winScore) {
        endMessage.innerText = "Congratulations! You won the match!";
        endButton.innerText = `Play again`;
    }
    if (winsComputer === winScore) {
        endMessage.innerText = "Game over! Computer won the match.";
        endButton.innerText = `Try again`;
    }

    endButton.addEventListener("keyup", function(e) {
        e.stopPropagation();
        if (e.key === 'Enter') {
            startGame();
        }
        });
    endButton.addEventListener("click", startGame);
};
