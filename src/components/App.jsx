import React, { useState, useEffect } from 'react';
import Snake from "./Snake";
import Food from "./Food";
import Controls from "./Controls";
import RefreshIcon from '@material-ui/icons/Refresh';

function App() {
  const randomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  }

  const [snakeDot, setSnakeDot] = useState([
    [0, 0], [2, 0]
  ]);

  const [foodDot, setFoodDot] = useState([
    randomCoordinates()
  ]);

  const [direction, setDirection] = useState("");

  const [speed, setSpeed] = useState(200);

  const [showScore, setShowScore] = useState(false);

  const currentState = () => {
    setSnakeDot([...snakeDot]);
    setDirection(direction);
  }

  useEffect(() => {
    const firstInterval = setInterval(moveSnake, speed);
    checkIfOutOfBounds();
    checkIfCollapsed();
    document.onkeydown = onKeyDown;
    return () => clearInterval(firstInterval);
  });

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 87:
        setDirection("UP");
        break;
      case 83:
        setDirection("DOWN");
        break;
      case 65:
        setDirection("LEFT");
        break;
      case 68:
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  }

  const moveSnake = () => {
    let dots = [...snakeDot];
    let head = dots[dots.length - 1];
    let foodCoordinates = foodDot[foodDot.length - 1];

    switch (direction) {
      case "UP":
        head = [head[0], head[1] - 2];
        dots.shift();
        dots.push(head);
        if (head[0] === foodCoordinates[0] && head[1] === foodCoordinates[1]) {
          head = [head[0], head[1] - 2];
          dots.push(head);
          setFoodDot([randomCoordinates()]);
          setSpeed(speed - 5);
        }
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        dots.shift();
        dots.push(head);
        if (head[0] === foodCoordinates[0] && head[1] === foodCoordinates[1]) {
          head = [head[0], head[1] + 2];
          dots.push(head);
          setFoodDot([randomCoordinates()]);
          setSpeed(speed - 5);
        }
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        dots.shift();
        dots.push(head);
        if (head[0] === foodCoordinates[0] && head[1] === foodCoordinates[1]) {
          head = [head[0] - 2, head[1]];
          dots.push(head);
          setFoodDot([randomCoordinates()]);
          setSpeed(speed - 5);
        }
        break;
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        dots.shift();
        dots.push(head);
        if (head[0] === foodCoordinates[0] && head[1] === foodCoordinates[1]) {
          head = [head[0] + 2, head[1]];
          dots.push(head);
          setFoodDot([randomCoordinates()]);
          setSpeed(speed - 5);
        }
        break;
      default:
        break;
    }
    setSnakeDot(dots);
  }

  let headSnake = snakeDot[snakeDot.length - 1];

  const checkIfOutOfBounds = () => {
    if (headSnake[0] >= 100 || headSnake[1] >= 100 || headSnake[0] < 0 || headSnake[1] < 0) {
      currentState();
      setShowScore(true);
    }
  }

  const checkIfCollapsed = () => {
    for (let i = 0; i < snakeDot.length - 1; i++) {
      let dot = snakeDot[i];
      if (dot[0] === headSnake[0] && dot[1] === headSnake[1]) {
        currentState();
        setShowScore(true);
      }
    }
  }

  const refreshPage = () => {
    window.location.reload();
  }

  const loseSound = () => {
    const sounds = ["flight.mp3", "sixnine.mp3", "itiz.mp3", "murder.mp3"];
    const randomNumber = Math.floor(Math.random() * sounds.length);
    return sounds[randomNumber];
  }

  return (
    <div>
      <h1>Snake Game</h1>
      <Controls />
      <div className="game-area">
        <Snake coordinates={snakeDot} />
        <Food coordinates={foodDot} />
      </div>
      {showScore && <div>
        <p>Game Over. Your score: {snakeDot.length}</p>
        <RefreshIcon onClick={refreshPage} />
        <audio autoPlay>
          <source src={"./Audio/" + loseSound()} type="audio/mpeg" />
        </audio>
      </div>}
    </div>
  );
}

export default App;
