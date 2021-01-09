// FEATURES TO IMPLEMENT
// - [x] User input: 1–100 squares per side
// - [x] add animation
// - [x] option to clear grid and ask for new stuff
// - [ ] make responsive?? (bootstrap??)
// - [ ] eraser?


// COLOR SCHEMES
// - [x] choose your own color?? (RGB sliders? RGB range??)
// - [x] Option for random RGB color
// - [x] Shading (each pass through adds, say 10% of black)

const container = document.querySelector('#container')
const items = document.querySelectorAll('.item');
let redSlider = document.getElementById('red');
let greenSlider = document.getElementById('green');
let blueSlider = document.getElementById('blue');
let draw = 0;
let mode = 1;
buildBox(29);
landingImage();

//SET OPENING PAGE IMAGE
function landingImage() {
    let qrDesign = [
        // top side, outer square, top left
        0, 1, 2, 3, 4, 5, 6,
        // top side, outer square, top right
        29-1, 29-2, 29-3, 29-4, 29-5, 29-6, 29-7,
        // left side, outer square, top left
        29*1, 29*2, 29*3, 29*4, 29*5, 29*6,
        // left side, outer square, top right
        29*2-7, 29*3-7, 29*4-7, 29*5-7, 29*6-7, 29*7-7,
        // right side, outer square, top left
        29*1+6, 29*2+6, 29*3+6, 29*4+6, 29*5+6, 29*6+6,
        // right side, outer square, top right
        29*2-1, 29*3-1, 29*4-1, 29*5-1, 29*6-1, 29*7-1,
        // bottom side, outer square, top left
        29*6+1, 29*6+2, 29*6+3, 29*6+4, 29*6+5,
        // bottom side, outer square, top right
        29*7-2, 29*7-3, 29*7-4, 29*7-5, 29*7-6, 
        // top row, inner square, top left
        29*2+2, 29*2+3, 29*2+4, 
        // middle row, inner square, top left
        29*3+2, 29*3+3, 29*3+4, 
        // bottom row, inner square, top left
        29*4+2, 29*4+3, 29*4+4, 
        // top row, inner square, top right
        29*3-3, 29*3-4, 29*3-5,
        // middle row, inner square, top right
        29*4-3, 29*4-4, 29*4-5,
        // bottom row, inner square, top right
        29*5-3, 29*5-4, 29*5-5,
        // top side, outer square, bottom left
        29*(29-7), 29*(29-7)+1, 29*(29-7)+2, 29*(29-7)+3, 29*(29-7)+4, 29*(29-7)+5, 29*(29-7)+6,
        // left side, outer square, bottom left
        29*(29-6), 29*(29-5), 29*(29-4), 29*(29-3), 29*(29-2), 29*(29-1),
        // right side, outer square, bottom left
        29*(29-6)+6, 29*(29-5)+6, 29*(29-4)+6, 29*(29-3)+6, 29*(29-2)+6, 29*(29-1)+6,
        // bottom side, outer square, bottom left
        29*(29-1)+1, 29*(29-1)+2, 29*(29-1)+3, 29*(29-1)+4, 29*(29-1)+5, 
        // top row, inner square, bottom left
        29*(29-5)+2, 29*(29-5)+3, 29*(29-5)+4,
        // middle row, inner square, bottom left
        29*(29-4)+2, 29*(29-4)+3, 29*(29-4)+4,
        // bottom row, inner square, bottom left
        29*(29-3)+2, 29*(29-3)+3, 29*(29-3)+4, 
    ]
    let qrRandom = []
    // for first eight rows…
    for (i=0; i <= 7; i++) {
        // for columns 8–21…
        for (j=0; j <= 12; j++) {
            qrRandom.push(29*i+8+j)
        }
    }
    // for rows 8–21
    for (i=0; i <= 12; i++) {
        // for columns 0-29…
        for (j=0; j <= 28; j++) {
            qrRandom.push(29*(i+8)+j)
        }
    }
    // for rows 23–29
    for (i=0; i <= 7; i++) {
        // for colums 8–29
        for (j=0; j <= 21; j++) {
            qrRandom.push(29*(i+21)+8+j)
        }
    }
    console.log(qrRandom);
    for (i=0; i <= document.getElementsByClassName('item').length; i++) {
        if (qrDesign.includes(i)) {
            document.getElementsByClassName('item')[i].style.background = "rgb(0, 0, 0)";
        }
        if (qrRandom.includes(i)) {
            randomizer = Math.floor(Math.random()*2)
            if (randomizer) {document.getElementsByClassName('item')[i].style.background = "rgb(0, 0, 0)";}
        }
    }
}

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
    if (int === 1 || int === 2 || int === 3) {
        let color = "white";
        return color;
    }
}

function mouseOverColorIs(int) {
    let color;
    if (int === 1) {
        color = "rgb(225, 225, 225)";
        return color;
    } else if (int === 2) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        color = "rgb(" + r + ", " + g + ", " + b + ")";
        return color;
    } else if (int === 3) {
        let r = redSlider.value;
        let g = greenSlider.value;
        let b = blueSlider.value;
        color = "rgb(" + r + ", " + g + ", " + b + ")";
        return color;
    }
}

// Function that pulls the first number from an RGB color string
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
const grayscale = document.querySelector('#grayscale');
grayscale.addEventListener('click', function () {
    if (mode !== 1) {
        mode = 1;
        for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
            document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
            }
        for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
            document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
            }
    }    
});

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', function () {
    if (mode !==2) {
        mode = 2;
        for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
            document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
            }
        for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
            document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
            }
    }
});

const choose = document.querySelector('#choose');
choose.addEventListener('click', function () {
    if (mode !== 3) {
        mode = 3;
        for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
            document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
            }
        for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
            document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
            }
    } 
});

// DRAWING EVENT LISTENER
container.addEventListener("mouseover", function(event) {
    if (draw) {
        if (mode === 1) {
            if (JSON.stringify(event.target.classList).search("mousedOver") === -1) {
                event.target.classList.remove('notMousedOver');
                event.target.classList.add('mousedOver');
                event.target.classList.remove('notGrayscaled');
                event.target.style.background = mouseOverColorIs(mode);
            } else {
                console.log(event.target.style.background);
                console.log(rgbToNumber(event.target.style.background));
                event.target.style.background = "rgb( " + (rgbToNumber(event.target.style.background)-50) + ", " + 
                                                          (rgbToNumber(event.target.style.background)-50) + ", " +
                                                          (rgbToNumber(event.target.style.background)-50) + ")";
            }
        }
        else if (mode === 2) {
            event.target.classList.remove('notMousedOver');
            event.target.classList.add('mousedOver');
            event.target.style.background = mouseOverColorIs(mode);
            console.log(event.target.style.background);
        }
        else if (mode === 3) {
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