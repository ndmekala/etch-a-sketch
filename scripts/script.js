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
        // https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2ee7c083620145.5d41e47b72383.jpg
        // could have base color be lightest tone, and use ifs to cycle through darker tones
        color = "rgb(139,69,19)";
        return color;
    } else if (int === 2) {
        color = "rgb(240, 240, 240)";
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

// Make a function that takes the RGB value, splices the string, figures out a value, adds to it, and constructs a new RGB strings??
function rgbToNumber(string) {
    let noRGB = string.substring(4);
    let rgbNumber = ""
    for (i = 0; i < 4; i++) {
        if (Number(noRGB[i] === ",")) { break; };
        rgbNumber += noRGB[i];
    }
    return Number(rgbNumber);
    
}

// EVENT LISTENERS FOR COLOR SCHEME BUTTONS
// Producing some quirks: hitting rainbow resets all rainbow colors… you can paint with different colors using “choose” until you hit “choose again” and it shifts all colored cells to the selcted color
// another quirk: when you hit “choose” and its in grayscale, it undoes all shading.
// possible solution: add a “special” or “noTouchy” class to circumvent setting all to mouseOverColorIs(mode);
const beigescale = document.querySelector('#beigescale');
beigescale.addEventListener('click', function () {
    mode = 1;
    for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
        document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
        }
    for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
        document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
        }
});

const grayscale = document.querySelector('#grayscale');
grayscale.addEventListener('click', function () {
    mode = 2;
    for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
        document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
        }
    for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
        document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
        }
});

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', function () {
    mode = 3;
    for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
        document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
        }
    for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
        document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
        }
});

const choose = document.querySelector('#choose');
choose.addEventListener('click', function () {
    mode = 4;
    for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
        document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
        }
    for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
        document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
        }
});

// DRAWING EVENT LISTENER
container.addEventListener("mouseover", function(event) {
    if (draw) {
        if (mode === 2) {
            if (JSON.stringify(event.target.classList).search("mousedOver") === -1) {
                event.target.classList.remove('notMousedOver');
                event.target.classList.add('mousedOver');
                event.target.style.background = mouseOverColorIs(mode);
                console.log("hi");
            } else {
                console.log(event.target.style.background);
                console.log(rgbToNumber(event.target.style.background));
                event.target.style.background = "rgb( " + (rgbToNumber(event.target.style.background)-25) + ", " + 
                                                          (rgbToNumber(event.target.style.background)-25) + ", " +
                                                          (rgbToNumber(event.target.style.background)-25) + ")";
                console.log(event.target.style.background);
            }
        }
        else if (mode === 1 || mode === 3 || mode === 4) {
            event.target.classList.remove('notMousedOver');
            event.target.classList.add('mousedOver');
            event.target.style.background = mouseOverColorIs(mode);
            console.log(event.target.style.background);
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
    document.getElementsByClassName('item')[i].style.background = backgroundColorIs(mode);
    document.getElementsByClassName('item')[i].classList.add('notMousedOver');
    document.getElementsByClassName('item')[i].classList.remove('mousedOver');
    }
});

// Reset button should give you a blank screen in the color scheme that you’re in
// grid size should give you a blank screen in the color scheme that you’re in
// it would be cool if each color scheme button changed the color scheme of what you had painted…