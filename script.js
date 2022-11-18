var resolution = document.getElementById('resolution');
var showPixels = document.getElementById('showPixels');
var color = document.getElementById('colorSelector');
var opacity = document.getElementById('opacitySelector');
var brushBtn = document.getElementById('brushBtn');
var eraserBtn = document.getElementById('eraserBtn');
var clearBtn = document.getElementById('clearBtn');
const buttons = [brushBtn,eraserBtn,clearBtn];

p = resolution.value;
o = opacity.value;
c = color.value;

let mouseDownStatus = false;
let currentTool = "Brush";

showPixels.innerText = `${p} x ${p}`;

resolution.addEventListener('input', resolutionDisplay);
color.addEventListener('input',colorSelection);
opacity.addEventListener('input',opacitySelection);
window.addEventListener('mousedown',() => mouseDownStatus = true);
window.addEventListener('mouseup',() => mouseDownStatus = false);
buttons.forEach(button => button.addEventListener('click', changeTool));


function changeTool (e) {
    currentTool = e.target.textContent;
    buttons.forEach(button => {
        if (button.innerText == currentTool) {
            button.classList.add('activeBtn');
        }
        if (button.innerText != currentTool) {
            button.classList.remove('activeBtn');
        }
    } );
    if (currentTool == "Clear") {
        resolutionDisplay();
    }
}

function resolutionDisplay (e) {
    /*first condition of "!e" is for when this function is run by 
    pressing clear button, and thus there is no input.*/
    if(!e) {
        showPixels.innerText = `${p} x ${p}`;
        removeGrid();
        createGrid();
    } else {
        p = e.target.value;
        showPixels.innerText = `${p} x ${p}`;
        removeGrid();
        createGrid();
    }
}

function colorSelection (e) {
    c = e.target.value;
}

function opacitySelection (e) {
    o = e.target.value;
}

const mainContainer = document.querySelector('#mainContainer');

function createGrid () {
    for (let i = 0; i < p; i++) {
        for (let ii = 0; ii < p;ii++) {
            const newSquare = document.createElement('div');
            newSquare.classList.add("gridSquare");
            mainContainer.style.gridTemplateColumns = `repeat(${p}, 1fr)`;
            mainContainer.style.gridTemplateRows = `repeat(${p}, 1fr)`;
            newSquare.style.gridArea = `${i} + 1 / ${ii} + 1 / ${i} + 2 / ${ii} + 2`;
            mainContainer.appendChild(newSquare);
            newSquare.addEventListener('mouseover',changeColor);
        }
    }
}

function changeColor (e) {
    let x = Number(e.target.style.opacity);
    if (mouseDownStatus && currentTool == "Brush") {
        e.target.style.backgroundColor = c;
        e.target.style.opacity = x + o/100;
    } else if (mouseDownStatus && currentTool == "Eraser") {
        e.target.style.opacity -= o/100;
    }
    }

function removeGrid () {
    const squares = document.querySelectorAll('.gridSquare');
    squares.forEach(square => square.remove());
}

y = createGrid();

