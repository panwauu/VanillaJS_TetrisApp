let boardGrid = zeros([20, 10])
let totalEliminatedLines = 0

export function draw(gameBoard){
    for(var yIter = 0; yIter < boardGrid.length; yIter++){
        var row = boardGrid[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            if(row[xIter]>0){
                const tetrominoElement = document.createElement('div')
                tetrominoElement.style.gridRowStart = yIter + 1
                tetrominoElement.style.gridColumnStart = xIter + 1
                tetrominoElement.classList.add('tetromino'+row[xIter].toString())
                gameBoard.appendChild(tetrominoElement)
            }
        }
    }
}

function collisionWithBoard(tetromino){
    for(var yIter = 0; yIter < tetromino.element.length; yIter++){
        var row = tetromino.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            if(row[xIter]>0){             
                if(boardGrid[tetromino.upperLeft.y + yIter -1][tetromino.upperLeft.x + xIter -1]>0){
                    return true
                }
            }
        }
    }
    return false
}

function tetrominoOutOfBounds(tetromino){
    for(var yIter = 0; yIter < tetromino.element.length; yIter++){
        var row = tetromino.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            if(row[xIter]>0){
                var xlocation = tetromino.upperLeft.x + xIter
                var ylocation = tetromino.upperLeft.y + yIter       
                if(xlocation < 1 || xlocation > 10 || ylocation < 1 || ylocation > 20){
                    return true
                }
            }
        }
    }
    return false
}

export function movePossible(tetromino){
    if(tetrominoOutOfBounds(tetromino)){return false}
    if(collisionWithBoard(tetromino)){return false}
    return true
}

function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

export function addToBoard(tetromino){
    for(var yIter = 0; yIter < tetromino.element.length; yIter++){
        var row = tetromino.element[yIter]
        for(var xIter = 0; xIter < row.length; xIter++){
            if(row[xIter]>0){             
                boardGrid[tetromino.upperLeft.y + yIter -1][tetromino.upperLeft.x + xIter -1] = row[xIter]
            }
        }
    }
    checkRows()
}

function checkRows(){
    var eliminatedLines = 0;
    for(var yIter = boardGrid.length-1; yIter >= 0; yIter--){
        var row = boardGrid[yIter]
        var rowFlag = true
        for(var xIter = 0; xIter < row.length; xIter++){
            if(row[xIter]<=0){
                rowFlag = false
            }
            boardGrid[yIter+eliminatedLines][xIter] = row[xIter]
        }
        if(rowFlag === true){
            eliminatedLines += 1
        }
    }

    for(var yIter = 0; yIter < eliminatedLines; yIter++){
        boardGrid[yIter] = [0,0,0,0,0,0,0,0,0,0]
    }

    totalEliminatedLines += eliminatedLines
}

export function checkLevelUp(levelUpLines){
    if(totalEliminatedLines >= levelUpLines){
        totalEliminatedLines -= levelUpLines
        return true
    }
    return false
}