let tetrominoList = [
    [{x: 4,y: 1,c: "tetrominoI"},{x: 5,y: 1,c: "tetrominoI"},{x: 6,y: 1,c: "tetrominoI"},{x: 7,y: 1,c: "tetrominoI"}],
    [{x: 4,y: 1,c: "tetrominoJ"},{x: 4,y: 2,c: "tetrominoJ"},{x: 5,y: 2,c: "tetrominoJ"},{x: 6,y: 2,c: "tetrominoJ"}],
    [{x: 4,y: 2,c: "tetrominoL"},{x: 5,y: 2,c: "tetrominoL"},{x: 6,y: 2,c: "tetrominoL"},{x: 6,y: 1,c: "tetrominoL"}],
    [{x: 5,y: 1,c: "tetrominoO"},{x: 5,y: 2,c: "tetrominoO"},{x: 6,y: 1,c: "tetrominoO"},{x: 6,y: 2,c: "tetrominoO"}],
    [{x: 4,y: 2,c: "tetrominoS"},{x: 5,y: 2,c: "tetrominoS"},{x: 5,y: 1,c: "tetrominoS"},{x: 6,y: 1,c: "tetrominoS"}],
    [{x: 4,y: 2,c: "tetrominoT"},{x: 5,y: 2,c: "tetrominoT"},{x: 6,y: 2,c: "tetrominoT"},{x: 5,y: 1,c: "tetrominoT"}],
    [{x: 4,y: 1,c: "tetrominoZ"},{x: 5,y: 1,c: "tetrominoZ"},{x: 5,y: 2,c: "tetrominoZ"},{x: 6,y: 2,c: "tetrominoZ"}],
]

let tetromino = tetrominoList[0]

export function update(){

}

export function draw(gameBoard){
    tetromino.forEach(segment => {
        const tetrominoElement = document.createElement('div')
        tetrominoElement.style.gridRowStart = segment.y
        tetrominoElement.style.gridColumnStart = segment.x
        tetrominoElement.classList.add(segment.c)
        gameBoard.appendChild(tetrominoElement)
    })
}

function lowerTetromino(){
    tetromino.forEach(segment => {
        segment.y += 1
    })
}

function rotateTetromino(){
    
}

function createTetromino(){

}