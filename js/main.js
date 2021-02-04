let cartButton = document.querySelector("#cart-button");
let modal = document.querySelector(".modal");
let close = document.querySelector(".close");
let koshyk = document.querySelector(".modal-body");
let total = document.querySelector(".modal-pricetag");
let grandTotal = 0;

//function expression Приклад
// Присвоюємо змінній toggleModal анонімну функцію.
let toggleModal = function () {
    modal.classList.toggle("is-open");
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

//Функція з замиканням
function makeCounter(id) {
    var currentCount = 1;

    return function () {
        currentCount++;
        document.getElementById('count' + id).innerHTML = currentCount;
        return currentCount;
    };
}

function makeDiscounter(id) {

    return function () {
        currentCount = +document.getElementById('count' + id).innerHTML;

        if (currentCount > 1) {
            currentCount--;
        }
        document.getElementById('count' + id).innerHTML = currentCount;
        return currentCount;
    };
}

//Приклад патерну "модулю"
let module = (function () {

    //function declaration Приклад (знаходиться в середині модуля)
    //Функція vKoshyk викликається з 3-ма параметрами, два з яких мають значення за замовченням (дефолтні значення)

    function functionAddToCart(id, name = 'Піца', price = 0) {
        let koshykText = `<div class="food-row">
      <span class="food-name"> ${name} </span>
      <strong class="food-price"> ${price}₴</strong>
      <div class="food-counter">
      <button class="counter-button" id="minus${id}">-</button>
      <span class="counter" id="count${id}">1</span>
      <button class="counter-button" id="plus${id}">+</button>
      </div>
      </div>`;

        koshyk.insertAdjacentHTML('beforeend', koshykText);

        // grandTotal = grandTotal + price;
        // Для прикладу простий вираз додамо в стрілочну функцію
        let sumInKoshyk = (price) => grandTotal += price;

        /* Більш довга форма запису через анонімну функцію (функціональний вираз):

        let sumInKoshyk = function(price) {
          grandTotal = grandTotal + price;
          return grandTotal;
        };
        */

        total.innerHTML = sumInKoshyk(price) + '₴';
        toggleModal();


        document.getElementById('plus' + id).onclick = makeCounter(id);
        document.getElementById('minus' + id).onclick = makeDiscounter(id);

    }

    return {AddToCart: functionAddToCart}
})();

let vKoshyk = module.AddToCart;