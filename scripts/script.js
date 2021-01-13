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
let on = 0;
let mode = 1;
let eraser = 0;
buildBox(29);
landingImage();
container.classList.add('biganimate');
container.addEventListener('animationend', () => {
    for (i=0; i < 29*29; i++) {
        document.getElementsByClassName('item')[i].style.background = "rgb(255, 255, 255)";}
});

//EVENT LISTENER FOR ERASER BUTTON


//SET OPENING PAGE IMAGE
function landingImage() {
    // First I did it manually…
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
    //Then I had the bright idea of for loops…
    let qrRandom = [];
    // for first seven rows…
    for (i=0; i <= 6; i++) {
        // for columns 8–21…
        for (j=0; j <= 12; j++) {
            qrRandom.push(29*i+8+j)
        }
    }
    // for rows 8–21
    for (i=0; i <= 12; i++) {
        // for columns 0-2…
        for (j=0; j <= 2; j++) {
            qrRandom.push(29*(i+8)+j)}
        // for columns 27-29…
        for (j=0; j <= 2; j++) {
            qrRandom.push(29*(i+8)+j+26)
        }
    }
    
    // for rows 23–29
    for (i=0; i <= 7; i++) {
        // for colums 8–29
        for (j=0; j <= 21; j++) {
            qrRandom.push(29*(i+21)+8+j)
        }
    }
    let qrText = [];
    //then i realized I could use functions…
    function drawVerticalLineText(x,y,length) {
        for (i=0; i < length; i++) {
            qrText.push(29*(y+1+i)+x);
        }
    }
    //P
    drawVerticalLineText(5,7,5);
    drawVerticalLineText(6,7,1);
    drawVerticalLineText(6,9,1);
    drawVerticalLineText(7,7,1);
    drawVerticalLineText(7,9,1);
    drawVerticalLineText(8,8,1);
    //I
    drawVerticalLineText(10,7,5);
    //X
    drawVerticalLineText(12,7,2);
    drawVerticalLineText(12,10,2);
    drawVerticalLineText(13,9,1);
    drawVerticalLineText(14,7,2);
    drawVerticalLineText(14,10,2);
    //E
    drawVerticalLineText(16,7,5);
    drawVerticalLineText(17,7,1);
    drawVerticalLineText(17,9,1);
    drawVerticalLineText(17,11,1);
    drawVerticalLineText(18,7,1);
    drawVerticalLineText(18,9,1);
    drawVerticalLineText(18,11,1);
    drawVerticalLineText(19,7,1);
    drawVerticalLineText(19,11,1);
    //L
    drawVerticalLineText(21,7,5);
    drawVerticalLineText(22,11,1);
    drawVerticalLineText(23,11,1);
    //D
    drawVerticalLineText(5,14,5);
    drawVerticalLineText(6,14,1);
    drawVerticalLineText(6,18,1);
    drawVerticalLineText(7,14,1);
    drawVerticalLineText(7,18,1);
    drawVerticalLineText(8,15,3);
    //R
    drawVerticalLineText(10,14,5);
    drawVerticalLineText(11,14,1);
    drawVerticalLineText(11,16,1);
    drawVerticalLineText(12,14,1);
    drawVerticalLineText(12,16,1);
    drawVerticalLineText(13,15,1);
    drawVerticalLineText(13,17,2);
    //A
    drawVerticalLineText(15,15,4);
    drawVerticalLineText(16,14,1);
    drawVerticalLineText(16,16,1);
    drawVerticalLineText(17,15,4);
    //W
    drawVerticalLineText(19,14,4);
    drawVerticalLineText(20,18,1);
    drawVerticalLineText(21,17,1);
    drawVerticalLineText(22,18,1);
    drawVerticalLineText(23,14,4);
    for (i=0; i < document.getElementsByClassName('item').length; i++) {
        if (qrDesign.includes(i)) {
            document.getElementsByClassName('item')[i].style.background = "rgb(0, 0, 0)";
        }
        if (qrRandom.includes(i)) {
            let randomizer = Math.floor(Math.random()*2)
            if (randomizer) {document.getElementsByClassName('item')[i].style.background = "rgb(0, 0, 0)";}
        }
        if (qrText.includes(i)) {
            document.getElementsByClassName('item')[i].style.background = "rgb(0, 255, 0)";
        }
    }
}



// EVENT LISTENER FOR RESOLUTION
let squaresWide = document.getElementById('squaresWide');
squaresWide.addEventListener('change', function () {
    breakBox();
    buildBox(squaresWide.value);
});

// EVENT LISTENERS FOR RGB SLIDER
//bout to be qUirKy (like should it change when you arent in the mode??)
redSlider.addEventListener('input', function() {
    mode = 3;
    document.getElementById("letter1").style.color = mouseOverColorIs(mode);
    document.getElementById("letter2").style.color = mouseOverColorIs(mode);
    document.getElementById("letter3").style.color = mouseOverColorIs(mode);
    document.getElementById("letter4").style.color = mouseOverColorIs(mode);
    document.getElementById("letter5").style.color = mouseOverColorIs(mode);
    document.getElementById("letter6").style.color = mouseOverColorIs(mode);
    document.getElementById("letter7").style.color = mouseOverColorIs(mode);
    document.getElementById("letter8").style.color = mouseOverColorIs(mode);
    document.getElementById("letter9").style.color = mouseOverColorIs(mode);
    rainbow.style.borderColor = "rgb(0, 0, 0)"
    grayscale.style.borderColor = "rgb(0, 0, 0)"
    choose.style.borderColor = mouseOverColorIs(mode);
});

greenSlider.addEventListener('change', function() {
    mode = 3;
    document.getElementById("letter1").style.color = mouseOverColorIs(mode);
    document.getElementById("letter2").style.color = mouseOverColorIs(mode);
    document.getElementById("letter3").style.color = mouseOverColorIs(mode);
    document.getElementById("letter4").style.color = mouseOverColorIs(mode);
    document.getElementById("letter5").style.color = mouseOverColorIs(mode);
    document.getElementById("letter6").style.color = mouseOverColorIs(mode);
    document.getElementById("letter7").style.color = mouseOverColorIs(mode);
    document.getElementById("letter8").style.color = mouseOverColorIs(mode);
    document.getElementById("letter9").style.color = mouseOverColorIs(mode);
    rainbow.style.borderColor = "rgb(0, 0, 0)"
    grayscale.style.borderColor = "rgb(0, 0, 0)"
    choose.style.borderColor = mouseOverColorIs(mode);
});

blueSlider.addEventListener('change', function() {
    mode = 3;
    document.getElementById("letter1").style.color = mouseOverColorIs(mode);
    document.getElementById("letter2").style.color = mouseOverColorIs(mode);
    document.getElementById("letter3").style.color = mouseOverColorIs(mode);
    document.getElementById("letter4").style.color = mouseOverColorIs(mode);
    document.getElementById("letter5").style.color = mouseOverColorIs(mode);
    document.getElementById("letter6").style.color = mouseOverColorIs(mode);
    document.getElementById("letter7").style.color = mouseOverColorIs(mode);
    document.getElementById("letter8").style.color = mouseOverColorIs(mode);
    document.getElementById("letter9").style.color = mouseOverColorIs(mode);
    rainbow.style.borderColor = "rgb(0, 0, 0)"
    grayscale.style.borderColor = "rgb(0, 0, 0)"
    choose.style.borderColor = mouseOverColorIs(mode);
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
    rainbow.style.borderColor = "rgb(0, 0, 0)"
    choose.style.borderColor = "rgb(0, 0, 0)"
    grayscale.style.borderColor = mouseOverColorIs(1);
    document.getElementById("letter1").style.color = "rgb(225, 225, 225)";
    document.getElementById("letter2").style.color = "rgb(175, 175, 175)";
    document.getElementById("letter3").style.color = "rgb(125, 125, 125)";
    document.getElementById("letter4").style.color = "rgb(75, 75, 75)";
    document.getElementById("letter5").style.color = "rgb(25, 25, 25)";
    document.getElementById("letter6").style.color = "rgb(75, 75, 75)";
    document.getElementById("letter7").style.color = "rgb(125, 125, 125)";
    document.getElementById("letter8").style.color = "rgb(175, 175, 175)";
    document.getElementById("letter9").style.color = "rgb(225, 225, 225)";
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
    grayscale.style.borderColor = "rgb(0, 0, 0)"
    choose.style.borderColor = "rgb(0, 0, 0)"
    rainbow.style.borderColor = mouseOverColorIs(2);
    mode = 2;
    document.getElementById("letter1").style.color = mouseOverColorIs(2);
    document.getElementById("letter2").style.color = mouseOverColorIs(2);
    document.getElementById("letter3").style.color = mouseOverColorIs(2);
    document.getElementById("letter4").style.color = mouseOverColorIs(2);
    document.getElementById("letter5").style.color = mouseOverColorIs(2);
    document.getElementById("letter6").style.color = mouseOverColorIs(2);
    document.getElementById("letter7").style.color = mouseOverColorIs(2);
    document.getElementById("letter8").style.color = mouseOverColorIs(2);
    document.getElementById("letter9").style.color = mouseOverColorIs(2);
    for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
        document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
        }
    for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
        document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
        }
});

const choose = document.querySelector('#choose');
choose.addEventListener('click', function () {
    rainbow.style.borderColor = "rgb(0, 0, 0)"
    grayscale.style.borderColor = "rgb(0, 0, 0)"
    choose.style.borderColor = mouseOverColorIs(3);
    document.getElementById("letter1").style.color = mouseOverColorIs(3);
    document.getElementById("letter3").style.color = mouseOverColorIs(3);
    document.getElementById("letter2").style.color = mouseOverColorIs(3);
    document.getElementById("letter4").style.color = mouseOverColorIs(3);
    document.getElementById("letter5").style.color = mouseOverColorIs(3);
    document.getElementById("letter6").style.color = mouseOverColorIs(3);
    document.getElementById("letter7").style.color = mouseOverColorIs(3);
    document.getElementById("letter8").style.color = mouseOverColorIs(3);
    document.getElementById("letter9").style.color = mouseOverColorIs(3);
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
    if (on) {
        if (eraser) {
            event.target.classList.remove('mousedOver');
            event.target.classList.add('notMousedOver');
            event.target.style.background = backgroundColorIs(mode);
        } else {
            if (mode === 1) {
                if (JSON.stringify(event.target.classList).search("mousedOver") === -1) {
                    event.target.classList.remove('notMousedOver');
                    event.target.classList.add('mousedOver');
                    // need not grayscaled?
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
        }
    };
});

// EVENT LISTENER FOR TOGGLING DRAWING
container.addEventListener("click", function () {
    if (on) {
        on = 0;
    } else {
        on = 1;
    }});

// EVENT LISTENER FOR TOGGLING DRAWING
const eraserButton = document.querySelector('#eraser');
eraserButton.addEventListener('click', function () {
    if (eraser) {
        eraser = 0
        eraserButton.textContent = "Pen"
    } else {
        eraser = 1;
        eraserButton.textContent = "Eraser"
    }
}); 

// EVENT LISTENER RESET BUTTON
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function () {
    let area = squaresWide.value*squaresWide.value
    for (i = 0; i < area; i++) {
    document.getElementsByClassName('item')[i].style.background = backgroundColorIs(mode);
    document.getElementsByClassName('item')[i].classList.add('notMousedOver');
    document.getElementsByClassName('item')[i].classList.remove('mousedOver');
    }
});