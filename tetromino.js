import {getInput, inputAvailable} from './input.js'
import {movePossible, addToBoard} from './board.js'

let gameOver = false;

let tetrominoDict = {
    1: [[0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
    2: [[2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]],
    3: [[0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]],
    4: [[4, 4],
        [4, 4]],
    5: [[0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]],
    6: [[0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]],
    7: [[7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]]
}

let tetromino = {
    element: tetrominoDict[2],
    upperLeft: {x: 4, y: 1},
}
let tetrominoCopy = copyTetromino(tetromino)
createTetromino()

export function getGameOver(){
    return gameOver
}

export function update(){
    if(inputAvailable()){
        tetrominoCopy = copyTetromino(tetromino)

        let inputVal = getInput()
        switch(inputVal){
            case 'ArrowDown': case 'LowerDueToTime': // Soft Drop
                lower()
                break
            case 'ArrowRight': // Move Right
                moveRight()
                break
            case 'ArrowLeft': // Move Left
                moveLeft()
                break
            case 'Y': case 'y': // Rotate Left
                rotateLeft()
                break
            case 'X': case 'x': // Rotate Right
                rotateRight()
                break
            case 'C': case 'c': // Hold
                break
            case ' ': // Hard Drop
                hardDrop()
                break
        }

        if (movePossible(tetrominoCopy)){
            tetromino = copyTetromino(tetrominoCopy)
        }
        else if (inputVal === 'LowerDueToTime' || inputVal === "ArrowDown" || inputVal === ' '){
            addToBoard(tetromino)
            createTetromino()
            if(!movePossible(tetromino)){
                gameOver = true
            }

        }
    }
}

function lower(){
    tetrominoCopy.upperLeft.y += 1
}

function hardDrop(){
    while(movePossible(tetrominoCopy)){
        tetromino = copyTetromino(tetrominoCopy)
        lower()
    }
}

function rotateRight(){
    for(var yIter = 0; yIter < tetromino.element.length; yIter++){
        var row = tetromino.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            tetrominoCopy.element[xIter][Math.abs(yIter-tetromino.element.length+1)] = row[xIter]
        }
    }
}

function rotateLeft(){
    for(var yIter = 0; yIter < tetromino.element.length; yIter++){
        var row = tetromino.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            tetrominoCopy.element[Math.abs(xIter-tetromino.element.length+1)][yIter] = row[xIter]
        }
    }
}

function moveRight(){
    tetrominoCopy.upperLeft.x += 1
}

function moveLeft(){
    tetrominoCopy.upperLeft.x -= 1
}

export function draw(gameBoard){
    for(var yIter = 0; yIter < tetromino.element.length; yIter++){
        var row = tetromino.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            if(row[xIter]>0){
                const tetrominoElement = document.createElement('div')
                tetrominoElement.style.gridRowStart = tetromino.upperLeft.y+yIter
                tetrominoElement.style.gridColumnStart = tetromino.upperLeft.x+xIter
                tetrominoElement.classList.add('tetromino'+row[xIter].toString())
                gameBoard.appendChild(tetrominoElement)
            }
        }
    }
}

function createTetromino(){
    let nRandomTetromino = Math.floor(Math.random() * 7 + 1)
    tetromino.element = tetrominoDict[nRandomTetromino]

    tetromino.upperLeft = {x: 4, y: 1}
    if(nRandomTetromino === 1){tetromino.upperLeft.y -= 1}
    if(nRandomTetromino === 4){tetromino.upperLeft.x += 1}
}

function copyTetromino(tetroToBeCopied){
    let newTetromino = {element:"", upperLeft: {x:"", y:""}}

    newTetromino.upperLeft.x = tetroToBeCopied.upperLeft.x
    newTetromino.upperLeft.y = tetroToBeCopied.upperLeft.y

    newTetromino.element = Array(tetroToBeCopied.element.length).fill().map(() => Array(tetroToBeCopied.element.length))
    for(var yIter = 0; yIter < tetroToBeCopied.element.length; yIter++){
        var row = tetroToBeCopied.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            newTetromino.element[yIter][xIter] = row[xIter]
        }
    }

    return newTetromino
}