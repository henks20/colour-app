let squaresNumber = 6;
let colours = [];
let pickedColour = undefined;

const squares = document.querySelectorAll(".square");
const rgbText = document.querySelector(".colourName");
const header = document.querySelector(".header");
const resetButton = document.querySelector(".resetButton");
const modeButtons = document.querySelectorAll(".modeButton");
const messageBox = document.querySelector(".messageBox");

const init = () => {
    setAppMode();
    setSquares();
    appReset();
};

const createColourRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

const generateColours = (squaresNumber) => {
    let colours = [];
    for(let i = 0; i < squaresNumber; i++) {
        colours.push(createColourRGB());
    };
    return colours;
};

const chooseColour = () => {
    const randomIndex = Math.floor(Math.random() * (squaresNumber - 1));
    return colours[randomIndex];
};

const updateBackgroundColour = (colour) => {
    squares.forEach(item => {
        item.style.backgroundColor = colour;
    })
};

const setAppMode = () => {
    modeButtons.forEach(item => {
        item.addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            item.classList.add("selected");
            item.textContent === "Easy" ? squaresNumber = 3 : squaresNumber = 6;
            appReset()
        });
    });
};

const appReset = () => {
    colours = generateColours(squaresNumber);
    pickedColour = chooseColour();
    rgbText.textContent = pickedColour;
    resetButton.textContent = "New Colours";
    messageBox.textContent = "";
    for(let i = 0; i < squares.length; i++){
        if(colours[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colours[i];
		} else {
			squares[i].style.display = "none";
		}
    };
    header.style.backgroundColor = "#222222";
};

const setSquares = () => {
    squares.forEach(item => {
        item.addEventListener("click", function(){
            const clickedColour = this.style.backgroundColor;
            if(clickedColour === pickedColour){
                messageBox.textContent = "You won!";
                resetButton.textContent = "Once again?";
                updateBackgroundColour(clickedColour);
                header.style.backgroundColor = clickedColour;
            } else {
                this.style.backgroundColor = "#222222";
                messageBox.textContent = "Try again!";
            }
        })
    })
};

resetButton.addEventListener("click", function(){
    appReset();
});

init();

