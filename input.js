let inputReady = true
let inputAvailability = false
let inputValue = 0

window.addEventListener('keydown',e => {
    if(inputReady &&
    (e.key === 'ArrowDown' ||
    e.key === 'ArrowRight' ||
    e.key === 'ArrowLeft' ||
    e.key === 'Y' ||
    e.key === 'X' ||
    e.key === 'C' ||
    e.key === 'y' ||
    e.key === 'x' ||
    e.key === 'c' ||
    e.key === ' ')){
        inputAvailability = true
        inputValue = e.key
    }
})

export function getInput(){
    inputReady = true
    inputAvailability = false
    return inputValue
}

export function inputAvailable(){
    return inputAvailability
}

export function injectInput(){
    inputReady = false
    inputAvailability = true
    inputValue = 'LowerDueToTime'
}