'use strict';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = '#FF0000';
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 50);
// ctx.fillStyle = 'rgba(0, 0, 255, .05)';
// ctx.stroke();
// ctx.closePath();

//ball
let ballX = canvas.width/2
let ballY = canvas.height-60;
let dx = 2;
let dy = -2
//paddle
const ballRadius = 20;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth)/2;
const paddleY = canvas.height- paddleHeight-10;
//input
let rightPressed = false;
let leftPressed = false;
function drawBall()
{
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight)
    ctx.fillStyle = '0095DD';
    ctx.fill();
    ctx.closePath();
}

function moveBall()
{
    if(ballX + dx > canvas.width-ballRadius +  1 || ballX + dx < ballRadius - 1) 
    {
        dx = -dx;
    }
    if(ballY + dy < ballRadius - 1) 
    {
        dy = -dy;
    }else if(ballX > paddleX && ballX < paddleX + paddleWidth && ballY + ballRadius >= paddleY)
    {
        dy = -dy;
    }else if(ballY + dy > canvas.height-ballRadius + 1) 
    {
        alert('Game Over Man, Game Over.');
        document.location.reload();
        clearInterval(interval);
    }
    
    ballX += dx;
    ballY += dy;
}

function drawFrame()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    moveBall();
    drawPaddle();

    if(rightPressed && paddleX < canvas.width-paddleWidth) 
    {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function keyDownHandler(e)
{
    if(e.key == "Right" || e.key == "ArrowRight") 
    {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") 
    {
        leftPressed = true;
    }
}

function keyUpHandler(e)
{
    if(e.key == "Right" || e.key == "ArrowRight") 
    {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") 
    {
        leftPressed = false;
    }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var interval = setInterval(drawFrame, 10);