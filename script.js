const Player = (name, mark, id) => {
  const changeName = (newName) => {
    const playerLayout = `
      <div>${newName} playing as "X"</div>
      `;
    document.querySelector(`div[data-player="${id}"]`).innerHTML = playerLayout;
    this.name = newName;
  };
  const getName = () => name;
  const getMark = () => mark;
  return { getName, getMark, changeName };
};

const player1 = Player("player-1", "X", 1);
const player2 = Player("player-2", "O", 2);

document.querySelector("#ready>button").addEventListener("click", () => {
  const player1NewName = document.querySelector("#player1-name").value;
  const player2NewName = document.querySelector("#player2-name").value;
  player1.changeName(player1NewName);
  player2.changeName(player2NewName);
  document.querySelector("#ready").style.display = "None";
});

const gameBoard = (() => {
  let playerTurn = player1;
  let board = new Array(9).fill(undefined);
  let winner = undefined;

  const draw = () => {
    document.querySelector("#winner-placeholder").innerHTML = `Draw!`;
    winner = "Draw";
  };
  const setWinner = (playerName) => {
    document.querySelector(
      "#winner-placeholder"
    ).innerHTML = `${playerName} is the Winner!`;
    winner = playerName;
  };

  const switchPlayer = () =>
    (playerTurn = playerTurn == player1 ? player2 : player1);
  const setMark = (spot) => {
    if (board[spot.dataset.index] === undefined && winner == undefined) {
      spot.innerHTML = playerTurn.getMark();
      board[spot.dataset.index] = playerTurn.getName();
      console.log(board);
      switchPlayer();
    }
  };

  document.querySelectorAll("button.spot").forEach((spot) => {
    spot.addEventListener("click", () => {
      setMark(spot);
      for (let i = 0; i < 3; i++) {
        if (
          board[i] !== undefined &&
          board[i] === board[i + 3] &&
          board[i] === board[i + 6]
        ) {
          setWinner(board[i]);
          break;
        }
      }
      for (let i = 0; i < 7; i += 3) {
        if (
          board[i] !== undefined &&
          board[i] === board[i + 1] &&
          board[i] === board[i + 2]
        ) {
          setWinner(board[i]);
          break;
        }
      }
      if (
        (board[0] !== undefined &&
          board[0] === board[4] &&
          board[0] === board[8]) ||
        (board[2] !== undefined &&
          board[2] === board[4] &&
          board[2] === board[6])
      ) {
        setWinner(board[4]);
      }
      if (
        board.every(
          (item) => item === player1.getName() || item === player2.getName()
        )
      ) {
        draw();
      }
    });
  });
})();
