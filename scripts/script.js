// FEATURES TO IMPLEMENT
// * Shading (each pass through adds, say 10% of black)
// * User input: 1–100 squares per side
// * Option for random RGB color
// * add animation
// * option to clear grid and ask for new stuff
// * make responsive?? (bootstrap??)
// * choose your own color?? (RGB sliders? RGB range?)
// * mobile support w jQuery?? (Probably too much…)

// make build box a function of some integer…

const container = document.querySelector('#container')
const items = document.querySelectorAll('.item');
let draw = 1;
buildBox(50);

// Without JQuery
// slider from here: https://seiyria.com/bootstrap-slider/
// var slider = new Slider('#ex1', {
// 	formatter: function(value) {
// 		return value;
// 	}
// });

let squaresWide = document.getElementById('squaresWide');
squaresWide.addEventListener('change', function () {
    breakBox();
    buildBox(squaresWide.value);
});

const smallButton = document.querySelector('#small');
smallButton.addEventListener('click', function () {
    breakBox();
    buildBox(100);
    // boxWidth = 5;
    // boxes = 500*500/boxWidth/boxWidth-1;
    // buildBox();
});

const mediumButton = document.querySelector('#medium');
mediumButton.addEventListener('click', function () {
    breakBox();
    buildBox(50);
    // boxWidth = 10;
    // boxes = 500*500/boxWidth/boxWidth-1;
    // buildBox();
})

const largeButton = document.querySelector('#large');
largeButton.addEventListener('click', function () {
    breakBox();
    buildBox(10);
    // boxWidth = 50;
    // boxes = 500*500/boxWidth/boxWidth-1;
    // buildBox();
})

function breakBox() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

function buildBox(int) {
    for (let i = 0; i < int*int; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.style.flexBasis = 100/int + "%";
        container.appendChild(item);
    }
}

// function buildBox () {
    // for (let i = 0; i < boxes; i++) {
        // const item = document.createElement('div');
        // item.classList.add('item');
        // boxWidthString = boxWidth + "px";
        // item.style.flexBasis = boxWidthString;
        // container.appendChild(item);
//   }};

// Mouseover bubbles up through the DOM
// this explains why you can turn the containing div cadet blue
// mouseover event sent to deepest element of DOM tree
// this explains how applying it to container makes it so the children get colored

container.addEventListener("mouseover", function(event) {
    if (draw) {event.target.style.background = "cadetblue";};
});

container.addEventListener("click", function () {
    if (draw) {
        draw = 0;
    } else {
        draw = 1;
    }});

// “Mouseenter is sent to each element of the hierarchy when entering them”
// Containing Div starts white
// When mouse enters, it turns blanched almond
// “is not sent to any descendants” when pointer enters its space

container.addEventListener("mouseenter", function(event) {
    if (draw) {event.target.style.background = "blanchedalmond";};
});


//once we have a global variable we can use to get # of boxes, incorproate that var into a for loop that will reset the background color to "coral" for every single thingy
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function () {
    let area = squaresWide.value*squaresWide.value
    for (i = 0; i < area; i++) {
    document.getElementsByClassName('item')[i].style.background = "coral";
    }
    // breakBox();
    // buildBox();
});