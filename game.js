const choices = ["rock", "paper", "scissors"];
const winScore = 5;
let winsPlayer = 0;
let winsComputer = 0;

while (winsPlayer !== winScore && winsComputer !== winScore) {
  let playerChoice = getUserChoice();
  let computerChoice = getComputerChoice();
  alert(playRound(playerChoice, computerChoice));
  printScore();
}
printWinner();

function getUserChoice() {
  const userChoice = prompt("Choose rock, paper or scissors: ").toLowerCase();
  if (userChoice !== choices[0] && userChoice !== choices[1] && userChoice !== choices[2]) {
    alert("Your choice is not valid, please try again.");
    getUserChoice();
  }
  return userChoice;
}

function getComputerChoice() {
  const computerChoice = Math.round(Math.random() * 3) + 1;
  if (computerChoice === 1) {
    return choices[0];
  } else if (computerChoice === 2) {
    return choices[1];
  } else {
    return choices[2];
  } 
}

function playRound(playerChoice, computerChoice) {
  switch (true) {
    case (playerChoice === computerChoice):
      return `Tie! Your choice is ${playerChoice}, Computer's choice is ${computerChoice} as well.`;
    case (playerChoice === choices[0], computerChoice === choices[1]):
      winsComputer++;
      return "You Lose! Rock loses to Scissors";
    case (playerChoice === choices[0], computerChoice === choices[2]):
      winsPlayer++;
      return "You Win! Rock beats Scissors";
    case (playerChoice === choices[1], computerChoice === choices[0]):
      winsPlayer++;
      return "You Win! Paper beats Rock";
    case (playerChoice === choices[1], computerChoice === "scissors"):
      winsComputer++;
      return "You Lose! Paper loses to Scissors";
    case (playerChoice === choices[2], computerChoice === choices[0]):
      winsComputer++;
      return "You Lose! Scissors lose to Rock";
    case (playerChoice === choices[2], computerChoice === choices[1]):
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