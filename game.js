import {update as updateTetromino, draw as drawTetromino} from './tetromino.js'
import {update as updateBoard, draw as drawBoard} from './board.js'


let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
let gameOver = false

//?
let gameSpeed = 1;

function main(currentTime){
    // Game over condition
    if(gameOver){
        gameSpeed = 0;
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if (secondsSinceLastRender*gameSpeed < 1) return

    lastRenderTime = currentTime
    
    update()
    draw()
    checkGameOver()
}

window.requestAnimationFrame(main)

function update(){
    updateTetromino()
}

function draw(){
    gameBoard.innerHTML=""
    drawBoard(gameBoard)
    drawTetromino(gameBoard)
}

function checkGameOver(){
    gameOver = false
}