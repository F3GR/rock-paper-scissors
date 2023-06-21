const choiceRock = "rock";
const choicePaper = "paper";
const choiceScissors = "scissors";

let playerChoice = getUserChoice();
let computerChoice = getComputerChoice();
let rounds = 0;


function getUserChoice() {
    const userChoice = prompt("Choose rock, paper or scissors: ").toLowerCase();
    if (userChoice !== choiceRock && userChoice !== choicePaper && userChoice !== choiceScissors) {
        alert("Your input is not valid, please try again.");
        getUserChoice();
    }
    return userChoice;
}

function getComputerChoice() {
    const computerChoice = Math.round(Math.random() * 3) + 1;
    if (computerChoice === 1) {
        return choiceRock;
    } else if (computerChoice === 2) {
        return choicePaper;
    } else {
        return choiceScissors;
    } 
}

function gameRound(playerChoice, computerChoice) {
    switch (true) {
        case (playerChoice === computerChoice):
            return `Tie! Your choice is ${playerChoice}, Computer's choice is ${computerChoice} as well.`;
        case (playerChoice === "rock", computerChoice === "paper"):
            rounds++;
            return "You Lose! Rock loses to Scissors";
        case (playerChoice === "rock", computerChoice === "scissors"):
            rounds++;
            return "You Win! Rock beats Scissors";
        case (playerChoice === "paper", computerChoice === "rock"):
            rounds++;
            return "You Win! Paper beats Rock";
        case (playerChoice === "paper", computerChoice === "scissors"):
            rounds++;
            return "You Lose! Paper loses to Scissors";
        case (playerChoice === "scissors", computerChoice === "rock"):
            rounds++;
            return "You Lose! Scissors lose to Rock";
        case (playerChoice === "scissors", computerChoice === "paper"):
            rounds++;
            return "You Win! Scissors beat Paper";
    }
}