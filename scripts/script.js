const container = document.querySelector('#container')
const items = document.querySelectorAll('.item');
let boxes = 500*500/5/5-1;
let boxWidth = 5;
buildBox();



const smallButton = document.querySelector('#small');
smallButton.addEventListener('click', function () {
    breakBox();
    let boxWidth = 5;
    boxes = 500*500/boxWidth/boxWidth-1;
    buildBox();
    // items.forEach(element => element.style.flexBasis = boxWidthString);
});

const mediumButton = document.querySelector('#medium');
mediumButton.addEventListener('click', function () {
    breakBox();
    let boxWidth = 10;
    boxes = 500*500/boxWidth/boxWidth-1;
    buildBox();
    // items.forEach(element => element.style.flexBasis = boxWidthString);
})

const largeButton = document.querySelector('#large');
largeButton.addEventListener('click', function () {
    breakBox();
    let boxWidth = 50;
    boxes = 500*500/boxWidth/boxWidth-1;
    buildBox();
    // items.forEach(element => element.style.flexBasis = boxWidthString);
})

function breakBox() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

function buildBox () {
    for (let i = 0; i < boxes; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        boxWidthString = boxWidth + "px";
        item.style.flexBasis = boxWidthString;
        container.appendChild(item);
  }};

// let container = document.getElementById("container");
container.addEventListener("mouseover", function(event) {
    event.target.style.background = "cadetblue";
});

container.addEventListener("mouseenter", function(event) {
    event.target.style.background = "blanchedalmond";
});

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function () {
    container.style.background = "coral";
    items.forEach(element => element.style.background = "blanchedalmond");
});
