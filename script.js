      // Set up the canvas and context
      const canvas = document.getElementById("gameCanvas");
      const context = canvas.getContext("2d");

      // Set up the game variables
      let snake = [{ x: 10, y: 10 }];
      let direction = "right";
      let food = getRandomFoodPosition();
      let score = 0;
      let level = 1;
      let speed = 100;
      let gameLoopIntervalId;

      // Set up the game loop
      function startGame() {
        gameLoopIntervalId = setInterval(() => {
          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Move the snake in the current direction
          let head = { x: snake[0].x, y: snake[0].y };
          switch (direction) {
            case "up":
              head.y -= 10;
              break;
            case "down":
              head.y += 10;
              break;
            case "left":
              head.x -= 10;
              break;
            case "right":
              head.x += 10;
              break;
          }
          snake.unshift(head);

          // Check if the snake has collided with the wall or itself
          if (
            head.x < 0 ||
            head.x >= canvas.width ||
            head.y < 0 ||
            head.y >= canvas.height ||
            isSnakeCollidingWithItself()
          ) {
            endGame();
            return;
          }

          // Check if the snake has eaten the food
          if (head.x === food.x && head.y === food.y) {
            score += 10;
            document.getElementById("score").textContent = score;
            food = getRandomFoodPosition();
            increaseSpeedIfNeeded();
          } else {
            snake.pop();
          }

          // Draw the snake and the food
          context.fillStyle = "green";
          snake.forEach((segment) => {
            context.fillRect(segment.x, segment.y, 10, 10);
          });
          context.fillStyle = "red";
          context.fillRect(food.x, food.y, 10, 10);
        }, speed);
      }

      function endGame() {
        clearInterval(gameLoopIntervalId);
        alert(`Game over! Your score is ${score}.`);
        resetGame();
      }

      function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = "right";
        food = getRandomFoodPosition();
        score = 0;
        level = 1;
        speed = 100;
        document.getElementById("score").textContent = score;
        document.getElementById("level").textContent = level;
        startGame();
      }

      function isSnakeCollidingWithItself() {
        for (let i = 1; i < snake.length; i++) {
          if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
return true;
}
}
return false;
}
function getRandomFoodPosition() {
    let x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    let y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    return { x, y };
  }

  function increaseSpeedIfNeeded() {
    if (score >= 50 && level === 1) {
      level = 2;
      speed = 75;
      document.getElementById("level").textContent = level;
      clearInterval(gameLoopIntervalId);
      startGame();
    } else if (score >= 100 && level === 2) {
      level = 3;
      speed = 50;
      document.getElementById("level").textContent = level;
      clearInterval(gameLoopIntervalId);
      startGame();
    }
  }

  // Set up the event listeners for the arrow keys
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case "ArrowDown":
        if (direction !== "up") {
          direction = "down";
        }
        break;
      case "ArrowLeft":
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case "ArrowRight":
        if (direction !== "left") {
          direction = "right";
        }
        break;
    }
  });

  // Set up the event listener for the restart button
  document.getElementById("restartButton").addEventListener("click", resetGame);

  // Start the game
  startGame();