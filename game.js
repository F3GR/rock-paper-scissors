const choiceRock = "rock";
const choicePaper = "paper";
const choiceScissors = "scissors";
let rounds = 0;
let winsPlayer = 0;
let winsComputer = 0;

let playerChoice = getUserChoice();
let computerChoice = getComputerChoice();

console.log(playRound(playerChoice, computerChoice));

printWins();

function printWins() {
    console.log(`Player's score: ${winsPlayer}, Computer's score: ${winsComputer}.`)
}

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

function playRound(playerChoice, computerChoice) {
    switch (true) {
        case (playerChoice === computerChoice):
            return `Tie! Your choice is ${playerChoice}, Computer's choice is ${computerChoice} as well.`;
        case (playerChoice === "rock", computerChoice === "paper"):
            rounds++;
            winsComputer++;
            return "You Lose! Rock loses to Scissors";
        case (playerChoice === "rock", computerChoice === "scissors"):
            rounds++;
            winsPlayer++;
            return "You Win! Rock beats Scissors";
        case (playerChoice === "paper", computerChoice === "rock"):
            rounds++;
            winsPlayer++;
            return "You Win! Paper beats Rock";
        case (playerChoice === "paper", computerChoice === "scissors"):
            rounds++;
            winsComputer++;
            return "You Lose! Paper loses to Scissors";
        case (playerChoice === "scissors", computerChoice === "rock"):
            rounds++;
            winsComputer++;
            return "You Lose! Scissors lose to Rock";
        case (playerChoice === "scissors", computerChoice === "paper"):
            rounds++;
            winsPlayer++;
            return "You Win! Scissors beat Paper";
    }
}