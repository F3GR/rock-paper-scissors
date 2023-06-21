const choiceRock = "rock";
const choicePaper = "paper";
const choiceScissors = "scissors";

let playerChoice = getUserChoice();
let computerChoice = getComputerChoice();


function getUserChoice() {
    let userChoice;
    userChoice = prompt("Choose rock, paper or scissors: ").toLowerCase();
    if (userChoice !== choiceRock && userChoice !== choicePaper && userChoice !== choiceScissors) {
        alert("Your input is not valid, please try again.");
        getUserChoice();
    }
    return userChoice;
}

function getComputerChoice() {
    let computerChoice = Math.round(Math.random() * 3) + 1;
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
        case ()
    }
}