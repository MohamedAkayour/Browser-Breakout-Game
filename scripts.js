const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const boardWidth = 1000;
const boardHeight = 500;
let score = 0;
const blockDestroySound = new Audio("Sounds/mixkit-unlock-game-notification-253.wav")


//blocks dimensions
const blockWidth = 100;
const blockHeight = 20;

//player positions
const playerStart = [450, 10];
let currentPosition = playerStart;

//ball positions and dimensions
const ballStart = [490, 40];
let ballCurrentPosition = ballStart;
const ballDiameter = 20;
let timerId
let xDirection = -2;
let yDirection = 2;


//creating a block class
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    };




};

//All the blocks
const blocks = [
    new Block(10, 470),
    new Block(120, 470),
    new Block(230, 470),
    new Block(340, 470),
    new Block(450, 470),
    new Block(560, 470),
    new Block(670, 470),
    new Block(780, 470),
    new Block(890, 470),

    new Block(10, 440),
    new Block(120, 440),
    new Block(230, 440),
    new Block(340, 440),
    new Block(450, 440),
    new Block(560, 440),
    new Block(670, 440),
    new Block(780, 440),
    new Block(890, 440),

    new Block(10, 410),
    new Block(120, 410),
    new Block(230, 410),
    new Block(340, 410),
    new Block(450, 410),
    new Block(560, 410),
    new Block(670, 410),
    new Block(780, 410),
    new Block(890, 410),
];

console.log(blocks[0]);

//all blocks drawing
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

addBlocks();


//Making the player block
const player = document.createElement('div');
player.classList.add('player');
drawPlayer();
grid.appendChild(player);


//drawing the player function
function drawPlayer() {
    player.style.left = currentPosition[0] + 'px';
    player.style.bottom = currentPosition[1] + 'px';
}


//moving the player block
function movePlayer(e) {
    switch (e.key) {
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 35;
                drawPlayer();
            }
            break;


        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 35;
                drawPlayer();
            }
            break;
    }
}


//event listener if key is pressed movingplayer in invoked
document.addEventListener('keydown', movePlayer);

//drawing the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}


//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//ball movements
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    CollisionsCheck();
}

timerId = setInterval(moveBall, 7);

//collisions with ball setting up
function CollisionsCheck() {
    //Blocks collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block')); //getting an array of the class of blocks
            allBlocks[i].classList.remove('block'); //removes block from the class
            blocks.splice(i, 1); //removes block from the array
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;
            blockDestroySound.play();

            //win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'YOU WIN!!';
                clearInterval(timerId);
                document.removeEventListener('keydown', movePlayer);
            }
        }
    }

    //player collisions
    if (
        ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < (currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1]) > currentPosition[1] && ballCurrentPosition[1] < (currentPosition[1] + blockHeight)
    ) {
        changeDirection();
    }




    //Wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0) {
        changeDirection();
    }

    //Game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You lose';
        document.removeEventListener('keydown', movePlayer);
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }

    if (xDirection === 2 && yDirection == -2) {
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