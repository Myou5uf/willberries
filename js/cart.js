const cart = function () {
    const cartBtn = document.querySelector(".button-cart"); // Кнопка корзина
    const cart = document.querySelector("#modal-cart"); // Модальное окно
    const closeBtn = cart.querySelector(".modal-close"); // Крестик в модальном окне
    const cardContainer = document.querySelector(".long-goods-list"); // Контейнер карточек с товарами
    const cartTable = cart.querySelector(".cart-table__goods"); // Тело таблицы в корзине
    const modalForm = cart.querySelector(".modal-form"); // Форма в корзине
    const modalInput = modalForm.querySelectorAll(".modal-input"); // Поле ввода

    console.log(modalInput);

    // Удалить товар из корзины
    const deleteCartItem = (id) => {
        // Получаем данные из ЛХ
        const cart = JSON.parse(localStorage.getItem("cart"));

        const newCart = cart.filter((good) => {
            return good.id !== id;
        });

        // Сохраняем новую корзину в Локальное Хранилище с ключом 'cart'
        localStorage.setItem("cart", JSON.stringify(newCart));

        // Отрисовываем корзину
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    // Увеличить кол-во товара в корзине
    const plusCartItem = (id) => {
        // Получаем данные из ЛХ
        const cart = JSON.parse(localStorage.getItem("cart"));

        const newCart = cart.map((card) => {
            // Если id товара из корзины равен id выбранного товара
            if (card.id === id) {
                card.count++; // Увеличиваем кол-во этого товара на 1
            }
            return card;
        });

        // Сохраняем новую корзину в Локальное Хранилище с ключом 'cart'
        localStorage.setItem("cart", JSON.stringify(newCart));
        // Отрисовываем корзину
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    // Уменьшить кол-во товара в корзине
    const minusCartItem = (id) => {
        // Получаем данные из ЛХ
        const cart = JSON.parse(localStorage.getItem("cart"));

        const newCart = cart.map((card) => {
            // Если id товара из корзины равен id выбранного товара
            if (card.id === id) {
                if (card.count > 0) {
                    card.count--; // Увеличиваем кол-во этого товара на 1
                }
            }
            return card;
        });

        // Сохраняем новую корзину в Локальное Хранилище с ключом 'cart'
        localStorage.setItem("cart", JSON.stringify(newCart));
        // Отрисовываем корзину
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    // Добавлять карточку в корзину
    const addtoCart = (id) => {
        const cards = JSON.parse(localStorage.getItem("data")); // Получаем весь массив товаров из ЛХ
        // Метод find() возвращает значение первого найденного в массиве элемента,
        // которое удовлетворяет условию переданному в callback функции.
        const clickedCard = cards.find((card) => card.id === id); // Выбранная карточка
        // Если у нас в ЛХ есть элементы с ключом card
        // то взять весь массив из ЛХ, иначе передать в card пустой массив
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

        console.log("Выбранная карточка", clickedCard);
        console.log("Корзина", cart);
        console.log("Id выбранной карточки", clickedCard.id);

        // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию,
        // заданному в передаваемой функции.
        // Если товар был найден в корзине
        if (cart.some((card) => card.id === clickedCard.id)) {
            // то увеличиваем кол-во
            console.log("Увеличить кол-во");
            // Метод map будет перебирать корзину
            cart.map((card) => {
                // Если id товара из корзины равен id выбранного товара
                if (card.id === clickedCard.id) {
                    card.count++; // Увеличиваем кол-во этого товара на 1
                }
                return card;
            });
        } else {
            // иначе добавляем в корзину
            clickedCard.count = 1; // количество товара = 1
            cart.push(clickedCard); // добавляем в корзину выбранный товар
            console.log("Добавить в корзину");
        }

        // Сохраняем новую корзину в Локальное Хранилище с ключом 'cart'
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    // Отрисовка корзины
    const renderCartGoods = (goods) => {
        // Обнуляем корзину
        cartTable.innerHTML = "";

        //  Добавление товара из ЛХ в корзину
        goods.forEach((good) => {
            const tr = document.createElement("tr"); // Создаем элемент tr(строка)
            // Верстка строки в таблице
            tr.innerHTML = `
                <td>${good.name}</td>
                <td>${good.price}$</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${good.count}</td>
                <td><button class=" cart-btn-plus"">+</button></td>
                <td>${+good.price * +good.count}</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `;
            cartTable.append(tr); // Добавляем созданную строку

            //  Уменьшение, добавление и удаление товара из корзины
            tr.addEventListener("click", (e) => {
                if (e.target.classList.contains("cart-btn-minus")) {
                    minusCartItem(good.id);
                } else if (e.target.classList.contains("cart-btn-plus")) {
                    plusCartItem(good.id);
                } else if (e.target.classList.contains("cart-btn-delete")) {
                    deleteCartItem(good.id);
                }
            });
        });
    };

    //
    const sendForm = () => {
        const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        let nameInput = modalInput[0];
        let phoneInput = modalInput[1];

        // console.log(nameInput);
        fetch("https://jsonplaceholder.typeicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                cart: cartArray,
                name: nameInput.value,
                phone: phoneInput.value,
            }),
        });
        // .then(() => {
        //     cart.style.display = "";
        // });
    };

    modalForm.addEventListener("submit", (e) => {
        // Заблокируем стандартное поведение отправки формы(отправка GET запроса с перезагрузкой страницы)
        e.preventDefault();
        console.log("submit");
        sendForm();
    });

    // Открываем модальное окно при клике на кнопку Корзина
    cartBtn.addEventListener("click", function () {
        // Получаем из ЛХ данные о корзине, если есть, иначе пустой массив
        const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        // Передаем полученные товары из ЛХ в функцию отрисовки корзины
        renderCartGoods(cartArray);
        cart.style.display = "flex";
    });

    // Закрываем модальное окно при клике на крестик
    closeBtn.addEventListener("click", function () {
        cart.style.display = "";
    });

    // Закрыть модальное окно при клике вне модального окна
    cart.addEventListener("click", (event) => {
        // Если у кликнутого элемента родительский элемент НЕ имеет класс .modal
        if (!event.target.closest(".modal") && event.target.classList.contains("overlay")) {
            // то закрываем модальное окно
            cart.style.display = "";
        }
    });

    // Если контейнер карточеек существует
    if (cardContainer) {
        cardContainer.addEventListener("click", (event) => {
            // Если у  кликнутого элемента родительский элемент имеет класс .add-to-cart
            if (event.target.closest(".add-to-cart")) {
                // то сохраняем в переменную кликнутый элемент
                const buttonToCard = event.target.closest(".add-to-cart");
                const cardId = buttonToCard.dataset.id; // Идентификатор товара (data-id)

                addtoCart(cardId);
            }
        });
    }
};

cart();
