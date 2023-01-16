"use strict";

const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const resultDisplay = document.querySelector(".result");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardHeight = 400;
let timerId;
let xDirection = 2;
let yDirection = -2;
let score = 0;

const userStart = [300, 10];
let currentPosition = userStart;

const ballStart = [340, 30];
let ballCurrentPosition = ballStart;

//create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockWidth];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//all my blocks
const blocks = [
  new Block(1, 370),
  new Block(87, 370),
  new Block(173, 370),
  new Block(259, 370),
  new Block(345, 370),
  new Block(431, 370),
  new Block(517, 370),
  new Block(603, 370),
  new Block(1, 346),
  new Block(87, 346),
  new Block(173, 346),
  new Block(259, 346),
  new Block(345, 346),
  new Block(431, 346),
  new Block(517, 346),
  new Block(603, 346),
  new Block(1, 322),
  new Block(87, 322),
  new Block(173, 322),
  new Block(259, 322),
  new Block(345, 322),
  new Block(431, 322),
  new Block(517, 322),
  new Block(603, 322),
  new Block(1, 298),
  new Block(87, 298),
  new Block(173, 298),
  new Block(259, 298),
  new Block(345, 298),
  new Block(431, 298),
  new Block(517, 298),
  new Block(603, 298),
];

// draw all my block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.classList.add("box_block");

    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlocks();

// function setColor() {
//   for (let i = 0; i < blocks.length / 2; i++) {
//     blocks[i].style.backgroundColor = "#fff";
//   }
// }
// setColor();

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// draw the user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 30;
        // console.log(currentPosition);
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < 575) {
        currentPosition[0] += 30;
        // console.log(currentPosition);
        drawUser();
      }
      break;
    case "ArrowUp":
      if (currentPosition[1] < 40) {
        currentPosition[1] += 10;
        // console.log(currentPosition);
        drawUser();
      }
      break;
    case "ArrowDown":
      if (currentPosition[1] > 10) {
        currentPosition[1] -= 10;
        // console.log(currentPosition);
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

// add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, 20);

// check for  collisions
function checkForCollisions() {
  // check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = document.querySelectorAll(".block");
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.textContent = score;

      if (score === 10) {
        setInterval(moveBall, 25);
      }
      // check for win
      if (blocks.length === 0) {
        resultDisplay.textContent = "YOU WIN";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  // check for wall collisions
  if (
    ballCurrentPosition[0] >= 690 - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  // check for user collisions
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
  if (ballCurrentPosition[1] <= 0) {
    // check for game over
    clearInterval(timerId);
    resultDisplay.textContent = "YOU LOSE";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

document.addEventListener("keyup", function (e) {
  if (e.key == " " || e.code == "space" || e.keyCode == 32) {
    window.location.reload();
  }
});
