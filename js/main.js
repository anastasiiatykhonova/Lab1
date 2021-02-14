//querySelector универсальная функция, которая ищет элемент в формате CCS селектора

let cartButton = document.querySelector("#cart-button");
let modal = document.querySelector(".modal");
let close = document.querySelector(".close");
let koshyk = document.querySelector(".modal-body");
let total = document.querySelector(".modal-pricetag");
let grandTotal = 0;

//Style
cartButton.onclick = function () {
    this.style.border = "1px solid green";
}

//Свойство classList позволяет работать с классами элемента,
//в данном случае, переменной modal, которая является элементом DOM с классом modal.
//Метод toggle убирает класс или добавляет класс из списка классов элемента
let toggleModal = function () {
    modal.classList.toggle("is-open");
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

// Функция getElementById & innerHTML
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

let module = (function () {

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

        let sumInKoshyk = (price) => grandTotal += price;

        total.innerHTML = sumInKoshyk(price) + '₴';
        toggleModal();

        document.getElementById('plus' + id).onclick = makeCounter(id);
        document.getElementById('minus' + id).onclick = makeDiscounter(id);

    }

    return {AddToCart: functionAddToCart}
})();

let ajaxExmpl = function (method, url, func) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", func);
    oReq.open(method, url);
    oReq.send();
}

let my = function (selector, funct) {
    document.querySelector(selector).onclick = funct
}

function vKoshyk(id) {
    ajaxExmpl("POST", "pizzas.json", function () {
        const obj = JSON.parse(this.responseText);
        pizzaId = 'pizza' + id;
        let name = obj[pizzaId].name;
        let price = obj[pizzaId].price;
        module.AddToCart(id, name, price);
    });
}

my(".button-auth", function () {
    ajaxExmpl("GET", "NewFile.html", function () {
        document.querySelector(".section-heading").insertAdjacentHTML('beforeend', this.responseText);
    });
})

