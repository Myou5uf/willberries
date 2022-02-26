const cart = function () {
    const cartBtn = document.querySelector(".button-cart"); // Кнопка корзина
    const cart = document.querySelector("#modal-cart"); // Модальное окно
    const closeBtn = cart.querySelector(".modal-close"); // Крестик в модальном окне

    // console.log(cart);
    // console.dir(cart);

    // cartBtn.onclick = function (){
    //     console.log('click');
    // };

    // cartBtn.onclick = function (){
    //     console.log('dva raza');

    // Открываем модальное окно при клике на кнопку Корзина
    cartBtn.addEventListener("click", function () {
        cart.style.display = "flex";
    });

    // Закрываем модальное окно при клике на крестик
    closeBtn.addEventListener("click", function () {
        cart.style.display = "";
    });
};

cart();