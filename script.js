const Player = (name, mark, id) => {
  let playerName = name;
  const changeName = (newName) => {
    const playerLayout = `
      <div>${newName} playing as "${mark}"</div>
      `;
    document.querySelector(`div[data-player="${id}"]`).innerHTML = playerLayout;
    document
      .querySelector(`div[data-player="${id}"]`)
      .classList.add(`player-${id}`);
    playerName = newName;
  };
  const getName = () => playerName;
  const getMark = () => mark;
  return { getName, getMark, changeName };
};

const player1 = Player("player-1", "X", 1);
const player2 = Player("player-2", "O", 2);

document.querySelector("#ready>button").addEventListener("click", () => {
  let player1NewName = document.querySelector("#player1-name").value;
  let player2NewName = document.querySelector("#player2-name").value;
  if (player1NewName === "") player1NewName = "player1";
  if (player2NewName === "") player2NewName = "player2";
  player1.changeName(player1NewName);
  player2.changeName(player2NewName);
  document.querySelector("#ready").style.display = "None";
});

const commentPlaceholder = (() => {
  const placeholder = document.querySelector("#comment-placeholder");
  const randomCommentText = [
    "Checkmate in one... Oops.",
    "Open goal missed again!",
    "Own goal? Seriously?",
    "Fumbled that easy catch!",
    "Triple bogey on par 3...",
    "Last-minute penalty miss!",
    "Caught stealing base, ugh.",
    "Double fault on match point.",
    "Wide open shot, no score.",
    "Crashed in final lap, unbelievable.",
  ];
  const changeText = (comment) => {
    placeholder.innerHTML = comment;
  };
  const showRandomText = () => {
    const comment =
      randomCommentText[Math.floor(Math.random() * randomCommentText.length)];
    changeText(comment);
  };
  return { changeText, showRandomText };
})();

const winnerPlaceholder = (() => {
  const placeholder = document.querySelector("#winner-placeholder");
  const changeText = (comment) => {
    placeholder.innerHTML = comment;
  };
  const showRandomText = (playerName) => {
    const randomCommentText = [
      `${playerName} pulled off a miracle...`,
      `How did ${playerName} manage that win?`,
      `Inexplicable victory for ${playerName}.`,
      `${playerName} wins? I'm baffled.`,
      `Did anyone predict ${playerName} would win?`,
    ];
    const comment =
      randomCommentText[Math.floor(Math.random() * randomCommentText.length)];
    changeText(comment);
  };
  return { changeText, showRandomText };
})();

const gameBoard = (() => {
  let playerTurn = player1;
  let board = new Array(9).fill(undefined);
  let winner = undefined;

  const draw = () => {
    winnerPlaceholder.changeText("Draw");
    winner = "Draw";
    reset();
  };
  const setWinner = (playerName) => {
    if (winner == undefined) winnerPlaceholder.showRandomText(playerName);
    winner = playerName;
    reset();
  };

  const reset = () => {
    if (winner == undefined) {
      const commentText = `
        <button id="reset">Again?</button>
        `;
      commentPlaceholder.changeText(commentText);
      document.querySelector("#reset").addEventListener("click", () => {
        winnerPlaceholder.changeText("");
        commentPlaceholder.changeText("");
        playerTurn = player1;
        board = new Array(9).fill(undefined);
        winner = undefined;
        document.querySelectorAll("button.spot").forEach((spot) => {
          spot.innerHTML = "&nbsp";
        });
      });
    }
  };

  const switchPlayer = () =>
    (playerTurn = playerTurn == player1 ? player2 : player1);

  const setMark = (spot) => {
    if (board[spot.dataset.index] === undefined && winner == undefined) {
      spot.innerHTML = playerTurn.getMark();
      board[spot.dataset.index] = playerTurn.getName();
      switchPlayer();
      commentPlaceholder.showRandomText();
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
