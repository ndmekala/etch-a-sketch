//GLOBAL VARIABLES
const container = document.querySelector('#container')
const items = document.querySelectorAll('.item');
let redSlider = document.getElementById('red');
let greenSlider = document.getElementById('green');
let blueSlider = document.getElementById('blue');
let on = 0;
let mode = 1;
let eraser = 0;

//ARRAYS TO DEFINE OPENING IMAGE
let qrDesign = [
    0, 1, 2, 3, 4, 5, 6,
    29-1, 29-2, 29-3, 29-4, 29-5, 29-6, 29-7,
    29*1, 29*2, 29*3, 29*4, 29*5, 29*6,
    29*2-7, 29*3-7, 29*4-7, 29*5-7, 29*6-7, 29*7-7,
    29*1+6, 29*2+6, 29*3+6, 29*4+6, 29*5+6, 29*6+6,
    29*2-1, 29*3-1, 29*4-1, 29*5-1, 29*6-1, 29*7-1,
    29*6+1, 29*6+2, 29*6+3, 29*6+4, 29*6+5,
    29*7-2, 29*7-3, 29*7-4, 29*7-5, 29*7-6, 
    29*2+2, 29*2+3, 29*2+4, 
    29*3+2, 29*3+3, 29*3+4, 
    29*4+2, 29*4+3, 29*4+4, 
    29*3-3, 29*3-4, 29*3-5,
    29*4-3, 29*4-4, 29*4-5,
    29*5-3, 29*5-4, 29*5-5,
    29*(29-7), 29*(29-7)+1, 29*(29-7)+2, 29*(29-7)+3, 29*(29-7)+4, 29*(29-7)+5, 29*(29-7)+6,
    29*(29-6), 29*(29-5), 29*(29-4), 29*(29-3), 29*(29-2), 29*(29-1),
    29*(29-6)+6, 29*(29-5)+6, 29*(29-4)+6, 29*(29-3)+6, 29*(29-2)+6, 29*(29-1)+6,
    29*(29-1)+1, 29*(29-1)+2, 29*(29-1)+3, 29*(29-1)+4, 29*(29-1)+5, 
    29*(29-5)+2, 29*(29-5)+3, 29*(29-5)+4,
    29*(29-4)+2, 29*(29-4)+3, 29*(29-4)+4,
    29*(29-3)+2, 29*(29-3)+3, 29*(29-3)+4, 
]
let qrRandom = [];
for (i=0; i <= 6; i++) {
    for (j=0; j <= 12; j++) {
        qrRandom.push(29*i+8+j)
    }
}
for (i=0; i <= 12; i++) {
    for (j=0; j <= 2; j++) {
        qrRandom.push(29*(i+8)+j)}
    for (j=0; j <= 2; j++) {
        qrRandom.push(29*(i+8)+j+26)
    }
}
for (i=0; i <= 7; i++) {
    for (j=0; j <= 21; j++) {
        qrRandom.push(29*(i+21)+8+j)
    }
}
let qrText = [];
function drawVerticalLineText(letterArray) {
    for(let index=0; index < letterArray.length; index++) {
        let pointData = letterArray[index]
        let x = pointData[0]
        let y = pointData[1]
        let length = pointData[2]
        for (let i=0; i < length; i++) {
            qrText.push(29*(y+1+i)+x);
        }
    }
}

const pArray = [[5,7,5],[6,7,1],[6,9,1],[7,7,1],[7,9,1],[8,8,1]]
const eArray = [[16,7,5],[17,7,1],[17,9,1],[17,11,1],[18,7,1],[18,9,1],[18,11,1],[19,7,1],[19,11,1]]
const lArray = [[21,7,5],[22,11,1],[23,11,1]]
const dArray = [[5,14,5],[6,14,1],[6,18,1],[7,14,1],[7,18,1],[8,15,3]]
const rArray = [[10,14,5],[11,14,1],[11,16,1],[12,14,1],[12,16,1],[13,15,1],[13,17,2]]
const aArray = [[15,15,4],[16,14,1],[16,16,1],[17,15,4]]
const wArray = [[19,14,4],[20,18,1],[21,17,1],[22,18,1],[23,14,4]]

const pixelDrawData = [pArray,eArray,lArray,dArray,rArray,aArray,wArray]

pixelDrawData.forEach(element => drawVerticalLineText(element));

//example with object in an array
function drawVerticalLineTextAlternative(letterArray){
    for(let index=0; index < letterArray.length; index++) {
        let pointData = letterArray[index]
        for (let i=0; i < pointData.length; i++) {
            qrText.push(29*(pointData.y+1+i)+pointData.x);
        }
    }
}

const iArray = [{x:10, y:7, length:5}]
const xArray = [{x:12,y:7,length:2},{x:12,y:10,length:2},{x:13,y:9,length:1},{x:14,y:7,length:2},{x:14,y:10,length:2}]

const pixelDrawDataAlt = [iArray,xArray]

pixelDrawDataAlt.forEach(element => drawVerticalLineTextAlternative(element))
//forEach is a helpful abstraction of a regular for statement
//also familiarize yourself with 'map', 'reduce', and 'filter' which are really helpful methods when working with arrays. 
//However, I think it's helpful to know how you would write a function youself (using 'for' and 'if' statements) that can do the same thing as these methods
//end example


buildBox(29);
landingImage();
container.classList.add('biganimate');
container.addEventListener('animationend', () => {
    for (i=0; i < 29*29; i++) {
        document.getElementsByClassName('item')[i].style.background = "rgb(255, 255, 255)";
    }
    buildMinidesign();
    }
);


// EVENT LISTENER FOR TOGGLING DRAWING
container.addEventListener("click", function () {
    if (on) {
        on = 0;
    } else {
        on = 1;
    }});

// EVENT LISTENER FOR TOGGLING ERASER
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


// EVENT LISTENER FOR RESOLUTION SLIDER
let squaresWide = document.getElementById('squaresWide');
squaresWide.addEventListener('change', function () {
    breakBox();
    buildBox(squaresWide.value);
});

// EVENT LISTENERS FOR RGB SLIDER
redSlider.addEventListener('change', function() {
    if (mode !== 3) {
        mode = 3;
        for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
            document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
            }
        for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
            document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
            }}
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
    if (mode !== 3) {
        mode = 3;
        for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
            document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
            }
        for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
            document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
            }}
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
    if (mode !== 3) {
        mode = 3;
        for (i = 0; i < document.getElementsByClassName('notMousedOver').length; i++) {
            document.getElementsByClassName('notMousedOver')[i].style.background = backgroundColorIs(mode);
            }
        for (i = 0; i < document.getElementsByClassName('mousedOver').length; i++) {
            document.getElementsByClassName('mousedOver')[i].style.background = mouseOverColorIs(mode);
            }}
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

// EVENT LISTENERS FOR COLOR SCHEME BUTTONS
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

//I'm not a ui expert by any means but changing the border color based on the selected RGB is really nice touch. 
//Same with the color change on Pixel Draw based on mode. 
//Part of me wants you to make these details less subtle so people are more likely to notice them. But on the other hand I like how it looks now

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
                    event.target.style.background = "rgb( " + (rgbToNumber(event.target.style.background)-50) + ", " + 
                                                              (rgbToNumber(event.target.style.background)-50) + ", " +
                                                              (rgbToNumber(event.target.style.background)-50) + ")";
                }
            }
            else if (mode === 2) {
                event.target.classList.remove('notMousedOver');
                event.target.classList.add('mousedOver');
                event.target.style.background = mouseOverColorIs(mode);
            }
            else if (mode === 3) {
                event.target.classList.remove('notMousedOver');
                event.target.classList.add('mousedOver');
                event.target.style.background = mouseOverColorIs(mode);
            }
        }
    };
});

// function that removes all boxes upon reset
function breakBox() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

// function that loads boxes to be drawn in
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

// funciton that decides background color (allows possibility of different background colors in different modes)
function backgroundColorIs(int) {
    if (int === 1 || int === 2 || int === 3) {
        let color = "white";
        return color;
    }
}

// funciton gives you the right mouse color based on mode (grayscale works differently)
function mouseOverColorIs(int) {
    let color;
    if (int === 1) {
        color = "rgb(225, 225, 225)";
        return color;
    } else if (int === 2) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        // example with string interpolation. Doesn't really matter, just a little cleaner in my opinion
        color = `rgb(${r},${g},${b})`;
        return color;
    } else if (int === 3) {
        let r = redSlider.value;
        let g = greenSlider.value;
        let b = blueSlider.value;
        color = "rgb(" + r + ", " + g + ", " + b + ")";
        return color;
    }
}

// function used in shading
function rgbToNumber(string) {
    let noRGB = string.substring(4);
    let rgbNumber = ""
    for (i = 0; i < 4; i++) {
        if (Number(noRGB[i] === ",")) { break; };
        rgbNumber += noRGB[i];
    }
    return Number(rgbNumber);
    
}


//FUNCTION TO BUILD LOGO IN CONTROL PANEL
function buildMinidesign() {
    for (let i = 0; i < 29*29; i++) {
        const item = document.createElement('div');
        const minidesign = document.querySelector('#minidesign')
        item.classList.add('miniitem');
        item.style.background = "rgb(255, 255,255";
        item.style.flexBasis = 100/29 + "%";
        minidesign.appendChild(item);
        }
    for (i=0; i < document.getElementsByClassName('miniitem').length; i++) {
        if (qrDesign.includes(i)) {
            document.getElementsByClassName('miniitem')[i].style.background = "rgb(0, 0, 0)";
        }
        if (qrRandom.includes(i)) {
            let randomizer = Math.floor(Math.random()*2)
            if (randomizer) {document.getElementsByClassName('miniitem')[i].style.background = "rgb(0, 0, 0)";}
        }
        if (qrText.includes(i)) {
            document.getElementsByClassName('miniitem')[i].style.background = "rgb(0, 255, 0)";
        }
    }
}


//SET OPENING PAGE IMAGE
function landingImage() {

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