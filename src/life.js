/*
    Cell obj
        x,y, isAlive
    create an array of cells.
    every tick - check neighbors, change state

    user brush - create patch of life or death
    change state, change size

*/
'use strict';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const boardWidth = 80, boardHeight = 60;
const cellWidth = 8, cellHeight = 8;

canvas.addEventListener('click',(e)=>{
    let rect = canvas.getBoundingClientRect();
    let mouseLoc = {
        x : Math.floor((e.clientX - rect.left)/cellWidth),
        y : Math.floor((e.clientY - rect.top)/cellHeight)
    }
    console.log(mouseLoc);
    // convert from canvas - window
    let c = getCellByLocation(mouseLoc);
    if(c != null)c.nextState = true;
})
function Cell(xPos, yPos, alive)
{
    this.x = xPos;
    this.y = yPos;
    this.isAlive = alive;
    this.nextState = false;
    this.change = function(){
        this.isAlive = this.nextState;
    }
}

const board = createBoard();

function createBoard()
{
    let newBoard = [[],[]];
    for (let x = 0; x < boardWidth; x++)
    {
        newBoard[x] =[];
        for(let y = 0; y < boardHeight; y++)
        {
            let xPosition = x*cellWidth;
            let yPosition = y*cellHeight;
            let alive = Math.random() > 0.8;
            let c = new Cell(xPosition, yPosition, alive);
            newBoard[x][y] = c;
            drawSquare(xPosition, yPosition, c.isAlive);
            // console.log(newBoard[x][y]);
        }
    }
    return newBoard;
}

function drawSquare(x,y, bool)
{
    ctx.beginPath();
    ctx.rect(x, y, cellWidth, cellHeight)
    ctx.fillStyle = bool? 'white': 'red';
    ctx.fill();
    ctx.closePath();
}

function checkNeighbors(cell, grid)
{
    // let arr = [];//for debugging
    let livingNeighbors = 0; //returned
    let radius = 1; //distance around which we search
    let dist = radius*2 + 1; //"width" of block to search
    // let negDist = -radius;
    let negRow = -radius;
    let negCol;
    let row; 
    let col;
    for(let x = 0; x<dist; x++)
    {
        negCol = -radius; //reset for each row
        for(let y = 0; y<dist; y++)
        {
            row = negRow + cell.x/cellWidth; 
            col = negCol + cell.y/cellHeight;

            if(row<boardWidth && row >=0 && col<boardHeight && col>=0)//only adding valid board locations
            {
            // debugger;

                if(negRow == 0 && negCol == 0) //skip self
                {
                    negCol++;
                    continue;
                }
                // arr.push(grid[row][col]);
                if(grid[row][col].isAlive)
                {
                    livingNeighbors +=1;
                }
            }
            negCol++;
        }
        negRow++;
    }
    return livingNeighbors;
}

function getCellByLocation(vector)
{
    let x = Math.round(vector.x);//we use a unit size of 1, elsewise multiply by size
    let y = Math.round(vector.y);

    if(x<0||x>=boardWidth||y<0||y>boardHeight)
    return null;

    if(board!=null && board[x][y]!=null)
    return board[x][y];
    else return null;
}

function tick()
{
    /*
        loop through the board twice
            first to decide whether each cell lives or dies
            second to change state after evaluation
    */
    for(let x = 0; x < boardWidth; x++)
    {
        for(let y = 0; y < boardHeight; y++)
        {
            let cell = board[x][y];
            let neighbors = checkNeighbors(cell, board); //how many neighbors are 'Alive'
            if(cell.isAlive)
            {
                switch(neighbors)
                {
                    case 0: // less than 2 neighbors leads to death due to underpopulation
                    case 1:  cell.nextState = false; break;
                    case 2: //2 or 3 neighbors keeps the cell alive - stable population
                    case 3:  cell.nextState = true; break;
                    case 4: // more than 3 neighbors leads to death due
                    case 5: // to overpopulation
                    case 6:
                    case 7:
                    case 8:  cell.nextState = false; break;
                }
            }
            if(!cell.isAlive && neighbors === 3)
            {
                //exactly 3 neighbors creates a new living cell as if by reproduction
                cell.nextState = true;                
            }
        }
    }
    for(let x = 0; x < boardWidth; x++)
    {
        for(let y = 0; y < boardHeight; y++)
        {
            let cell = board[x][y];
            cell.change();
            drawSquare(cell.x,cell.y,cell.isAlive)
        }
    }
}
setInterval(tick,1000);

