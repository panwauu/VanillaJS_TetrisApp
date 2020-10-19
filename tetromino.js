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
createTetromino()

export function update(){
    createTetromino()
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

function raise(){
    tetromino.upperLeft.y -= 1
}

function lower(){
    tetromino.upperLeft.y += 1
}

function rotateRight(){
    let elementCopy = Array(tetromino.element.length).fill().map(() => Array(tetromino.element.length));

    for(var yIter = 0; yIter < tetromino.element.length; yIter++){
        var row = tetromino.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            elementCopy[xIter][Math.abs(yIter-2)] = row[xIter]
        }
    }

    tetromino.element = elementCopy
}

function rotateLeft(){
    let elementCopy = Array(tetromino.element.length).fill().map(() => Array(tetromino.element.length));

    for(var yIter = 0; yIter < tetromino.element.length; yIter++){
        var row = tetromino.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            elementCopy[Math.abs(xIter-2)][yIter] = row[xIter]
        }
    }
    
    tetromino.element = elementCopy
}

function moveRight(){
    tetromino.upperLeft.x += 1
}

function moveLeft(){
    tetromino.upperLeft.x -= 1
}