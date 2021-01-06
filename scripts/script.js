// FEATURES TO IMPLEMENT
// - [x] User input: 1–100 squares per side
// - [x] add animation
// - [x] option to clear grid and ask for new stuff
// - [ ] make responsive?? (bootstrap??)


// COLOR SCHEMES
// - [x] choose your own color?? (RGB sliders? RGB range??)
// - [x] Option for random RGB color
// - [ ] Shading (each pass through adds, say 10% of black)

const container = document.querySelector('#container')
const items = document.querySelectorAll('.item');
let redSlider = document.getElementById('red');
let greenSlider = document.getElementById('green');
let blueSlider = document.getElementById('blue');
let draw = 1;
let mode = 1;
buildBox(50);

// EVENT LISTENER FOR RESOLUTION
let squaresWide = document.getElementById('squaresWide');
squaresWide.addEventListener('change', function () {
    breakBox();
    buildBox(squaresWide.value);
});

function breakBox() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

function buildBox(int) {
    for (let i = 0; i < int*int; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.classList.add('notMousedOver');
        item.style.background = backgroundColorIs(mode);
        item.style.flexBasis = 100/int + "%";
        container.appendChild(item);
    }
}

function backgroundColorIs(int) {
    let color;
    if (int === 1 ) {
        color = "blanchedalmond";
        return color;
    } else if (int === 2 || int === 3 || int === 4) {
        color = "white";
        return color;
    };
}

function mouseOverColorIs(int) {
    let color;
    if (int === 1) {
        color = "brown";
        return color;
    } else if (int === 2) {
        color = "#bbb";
        return color;
    } else if (int === 3) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        color = "rgb(" + r + ", " + g + ", " + b + ")";
        return color;
    } else if (int === 4) {
        let r = redSlider.value;
        let g = greenSlider.value;
        let b = blueSlider.value;
        color = "rgb(" + r + ", " + g + ", " + b + ")";
        return color;
    }
}

function rgbTo

// EVENT LISTENERS FOR COLOR SCHEME BUTTONS
const beigescale = document.querySelector('#beigescale');
beigescale.addEventListener('click', function () {
    mode = 1;
});

const grayscale = document.querySelector('#grayscale');
grayscale.addEventListener('click', function () {
    mode = 2;
});

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', function () {
    mode = 3;
});

const choose = document.querySelector('#choose');
choose.addEventListener('click', function () {
    mode = 4;
});

// DRAWING EVENT LISTENER
// how am i gonna get it to shade??
container.addEventListener("mouseover", function(event) {
    if (draw) {
        if (mode === 2) {
            event.target.classList.remove('notMousedOver');
            event.target.classList.add('mousedOver');
            event.target.style.background = mouseOverColorIs(mode);
            console.log(event.target.style.background);
        }
        else if (mode === 3 || mode === 4) {
            event.target.classList.remove('notMousedOver');
            event.target.classList.add('mousedOver');
            event.target.style.background = mouseOverColorIs(mode);
        }
        
    };
});

// EVENT LISTENER FOR TOGGLING DRAWING
container.addEventListener("click", function () {
    if (draw) {
        draw = 0;
    } else {
        draw = 1;
    }});


//once we have a global variable we can use to get # of boxes, incorproate that var into a for loop that will reset the background color to "coral" for every single thingy
// the = "" is super sketch… brings out the containing div which is secretely colored behind there…
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function () {
    let area = squaresWide.value*squaresWide.value
    for (i = 0; i < area; i++) {
    document.getElementsByClassName('item')[i].style.background = "";
    }
});

// Reset button should give you a blank screen in the color scheme that you’re in
// grid size should give you a blank screen in the color scheme that you’re in
// it would be cool if each color scheme button changed the color scheme of what you had painted…