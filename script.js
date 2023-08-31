const Player = (name, mark) => {
  const getName = () => console.log(name);
  const getMark = () => console.log(mark);
  return { getName, getMark };
};

const gameBoard = (() => {
  let playerTurn = "X";
  const switchPlayer = () => (playerTurn = playerTurn == "X" ? "O" : "X");
  const setMark = (spot) => {
    if (spot.dataset.mark == "") {
      spot.innerHTML = playerTurn;
      spot.dataset.mark = playerTurn;
      switchPlayer();
    }
  };
  document.querySelectorAll("button.spot").forEach((spot) => {
    spot.addEventListener("click", () => {
      setMark(spot);
    });
  });
  return {};
})();

const player1 = Player("player1", "X");
const player2 = Player("player2", "O");

player1.getName();
player2.getName();
