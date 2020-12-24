const container = document.querySelector('#container')

for (let i = 1; i <= 9; i++) {
    const item = document.createElement('li');
    item.classList.add('item');
    item.textContent = i;
    container.appendChild(item);
  }

 const populatedItems = document.querySelector('#container').querySelectorAll('.item');
 populatedItems.forEach((li) => {
     addEventListener('mouseenter', function (event) {
         event.target.style.color = "white";
     });
 });