import {update as updateTetromino, draw as drawTetromino, getGameOver} from './tetromino.js'
import {draw as drawBoard, checkLevelUp} from './board.js'
import {inputAvailable, injectInput} from './input.js'


let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')

let gameLevel = 1;
let gameSpeed = 1;
let levelLimit = 1;

draw()
window.requestAnimationFrame(main)

function main(currentTime){
    // Game over condition
    if(getGameOver()){
        if (confirm('You lost at level: '+gameLevel.toString()+' Press ok to restart!')) {
            window.location = '/'
        }
        return
    }

    // Act if time passed or Input key
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000

    if((inputAvailable() === false) && (secondsSinceLastRender < gameSpeed)){}
    else{
        if(secondsSinceLastRender >= gameSpeed){
            injectInput()
            lastRenderTime = currentTime
        }
        
        update()
        if(getGameOver() === false){
            draw()
        }
    }

    if(checkLevelUp(levelLimit)){
        gameLevel += 1
        gameSpeed = gameSpeed * 0.75
    }

    console.log(gameSpeed)
    window.requestAnimationFrame(main)
}

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