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



/***** Game Interface *****/

function playGame() {

    const choiceOptions = ["rock", "paper", "scissors"];
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

    // Player's current score
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


    const choices = document.createElement("div");
    choices.setAttribute("class", "choices");
    mainHTML.appendChild(choices);

    // Button Rock
    const choiceRock = document.createElement("button");
    choiceRock.setAttribute("class", "rock");
    choices.appendChild(choiceRock);

    const imageRock = document.createElement("img");
    imageRock.setAttribute("src", "./images/rock.png");
    imageRock.setAttribute("alt", "An image of choice 'Rock'");
    imageRock.setAttribute("title", "Click on the image to make your choice!");
    choiceRock.appendChild(imageRock);
    
    // Button Paper
    const choicePaper = document.createElement("button");
    choicePaper.setAttribute("class", "paper");
    choices.appendChild(choicePaper);

    const imagePaper = document.createElement("img");
    imagePaper.setAttribute("src", "./images/paper.png");
    imagePaper.setAttribute("alt", "An image of choice 'Paper'");
    imagePaper.setAttribute("title", "Click on the image to make your choice!");
    choicePaper.appendChild(imagePaper);

    // Button Scissors
    const choiceScissors = document.createElement("button");
    choiceScissors.setAttribute("class", "scissors");
    choices.appendChild(choiceScissors);

    const imageScissors = document.createElement("img");
    imageScissors.setAttribute("src", "./images/scissors.png");
    imageScissors.setAttribute("alt", "An image of choice 'Scissors'");
    imageScissors.setAttribute("title", "Click on the image to make your choice!");
    choiceScissors.appendChild(imageScissors);


    while (winsPlayer !== winScore && winsComputer !== winScore) {
        let playerChoice = getUserChoice();
        let computerChoice = getComputerChoice();
        alert(playRound(playerChoice, computerChoice));
        printScore();
        }
        printWinner();

        choiceRock.addEventListener("keydown", getUserChoice(e));
        choiceRock.addEventListener("click", getUserChoice(e));
        choicePaper.addEventListener("keydown", getUserChoice(e));
        choicePaper.addEventListener("click", getUserChoice(e));
        choiceScissors.addEventListener("keydown", getUserChoice(e));
        choiceScissors.addEventListener("click", getUserChoice(e));
        
        function getUserChoice(e) {
            if (e === "click") {
                return objectName.className;
            }
            if (e === "keydown") {
                if (e.key === 'Enter') {
                    return objectName.className;
                }
            }
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
            return `Tie! Your choice is ${playerChoice}, Computer's choice is ${computerChoice} as well.`;
            case (playerChoice === choiceOptions[0], computerChoice === choiceOptions[1]):
            winsComputer++;
            return "You Lose! Rock loses to Scissors";
            case (playerChoice === choiceOptions[0], computerChoice === choiceOptions[2]):
            winsPlayer++;
            return "You Win! Rock beats Scissors";
            case (playerChoice === choiceOptions[1], computerChoice === choiceOptions[0]):
            winsPlayer++;
            return "You Win! Paper beats Rock";
            case (playerChoice === choiceOptions[1], computerChoice === choiceOptions[2]):
            winsComputer++;
            return "You Lose! Paper loses to Scissors";
            case (playerChoice === choiceOptions[2], computerChoice === choiceOptions[0]):
            winsComputer++;
            return "You Lose! Scissors lose to Rock";
            case (playerChoice === choiceOptions[2], computerChoice === choiceOptions[1]):
            winsPlayer++;
            return "You Win! Scissors beat Paper";
        }
        }
        
        function printScore() {
        console.log(`Your current score: ${winsPlayer}, Computer's current score: ${winsComputer}.`);
        }
        
        function printWinner() {
        if (winsPlayer === winScore) {
            alert("Congratulations! You won the game!");
        }
        if (winsComputer === winScore) {
            alert("Game over! Computer won the game.");
        }
    }
}