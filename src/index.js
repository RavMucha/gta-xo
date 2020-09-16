import React, { useState } from "react";
import ReactDOM from "react-dom";
import logo from "./Assets/LOGO.jpg";
import cop from "./Assets/Cop.png";
import winLogo from "./Assets/WINFRENZY.jpg";
import start from "./Assets/Gta2_Respect.mp3";
import win from "./Assets/Gta2_Frenzy.mp3";
import draw from "./Assets/GTA2_WASTED.mp3";
import molotov from "./Assets/GTA2_molotov.mp3";
import "./index.css";

const startAudio = new Audio(start);
const winAudio = new Audio(win);
const drawAudio = new Audio(draw);
const whiteAudio = new Audio(molotov);

const playSound = (audioFile) => {
  audioFile.play();
};

function Logo() {
  return <img className="lgo" src={logo} alt="logo" />;
}
function Cop() {
  return <img id="cop" src={cop} alt="Cop" />;
}

function Game() {
  const [squares, setSquares] = useState(Array(16).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWinner(squares);
  const clan = winner === "X" ? "ZAIBATSU - X" : "YAKUZA - O";

  function Dark() {
    document.querySelector("body").classList.toggle("whiteMode");
    document.getElementById("cop").classList.toggle("whiteMode");
    if (document.querySelector("body").classList.contains("whiteMode")) {
      playSound(whiteAudio);
    }
  }

  function Nav() {
    return (
      <div className="topnav">
        <Logo></Logo>
        <abbr title="Toggle dark mode" onClick={Dark}>
          &#9775;
        </abbr>
        <a
          href="https://rafal-mucha.online/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Me
        </a>
        <div>{renderRestartButton()}</div>
        <div className="game-info">{getStatus()}</div>
      </div>
    );
  }

  function Restart({ onClick }) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href="#" className="restart" onClick={onClick}>
        Play again
      </a>
    );
  }

  function renderRestartButton() {
    return (
      <Restart
        className="restart-button"
        onClick={() => {
          setSquares(Array(16).fill(null));
          setIsXNext(true);
          playSound(startAudio);
          document.getElementById("cop").style.opacity = 0.01;
        }}
      />
    );
  }

  function Frenzy() {
    return (
      <div>
        <img className="killFrenzy" src={winLogo} alt="Kill_Frenzy!" />
      </div>
    );
  }

  function Square({ value, onClick }) {
    return (
      <button
        className={value === "$" ? "square winRow" : "square"}
        onClick={onClick}
      >
        {value}
      </button>
    );
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);
          setIsXNext(!isXNext); // toggle turns
        }}
      />
    );
  }

  function getStatus() {
    if (winner) {
      playSound(winAudio);
      return (
        <div>
          Winner: {clan}
          <Frenzy></Frenzy>
        </div>
      );
    } else if (isBoardFull(squares)) {
      playSound(drawAudio);
      document.getElementById("cop").style.opacity = 0.9;
      return (
        <div>
          <b>Draw!</b>{" "}
          <span style={{ fontSize: "0.9em" }}>&nbsp;Play again &#187;</span>
        </div>
      );
    } else {
      return nextSymbol === "X"
        ? "Next player: ZAIBATSU - X"
        : "Next player: YAKUZA - O";
    }
  }

  return (
    <div className="container">
      <Nav></Nav>
      <div className="game" style={{ marginTop: "50px" }}>
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
          </div>
          <div className="board-row">
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
          </div>
          <div className="board-row">
            {renderSquare(8)}
            {renderSquare(9)}
            {renderSquare(10)}
            {renderSquare(11)}
          </div>
          <div className="board-row">
            {renderSquare(12)}
            {renderSquare(13)}
            {renderSquare(14)}
            {renderSquare(15)}
          </div>
        </div>
      </div>
      <Cop></Cop>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 5, 10, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c, d] = possibleLines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[c] === squares[d]
    ) {
      let winner = squares[a];
      squares[a] = "$";
      squares[b] = "$";
      squares[c] = "$";
      squares[d] = "$";
      return winner;
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}
