const search = function () {
    const cartBtn = document.querySelector(".button-btn"); // Кнопка корзина
    const input = document.querySelector(".search-block > input"); // Текстовое поле
    const searchBtn = document.querySelector(".search-block > button"); // Кнопка поиска

    // Событие input - ловит каждый ввод в наше поле вводе
    input.addEventListener("input", (event) => {
        console.log("Ввод в input");
        // console.log(event.target);    // event.target - хранит тот input на котом произошло событие
        // console.log(event.target.value); // event.target.value - значение, введенное в поле ввода
    });

    // Отрисовка карточек товаров
    const renderGoods = (data) => {
        const cardContainer = document.querySelector(".long-goods-list"); // Контейнер карточек с товарами

        cardContainer.innerHTML = "";

        // Переберем массив data (element - итерируемый элемент)
        data.forEach((element) => {
            // Создаем новый блок div
            const cardBlock = document.createElement("div");
            // Добавляем новый класс к новому блоку
            cardBlock.classList.add("col-lg-3");
            cardBlock.classList.add("col-sm-6");

            //  Запишем в новый блок верстку карточки товара
            cardBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label ${element.label ? null : "d-none"}">${element.label}</span>
                    <img src="db/${element.img}" alt="${element.name}" class="goods-image" />
                    <h3 class="goods-title">${element.name}</h3>
                    <p class="goods-description">${element.description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="007">
                        <span class="button-price">$${element.price}</span>
                    </button>
                </div>
            `;
            cardContainer.append(cardBlock);
        });
    };

    // Функция возвращает данные с бд
    const getData = (value) => {
        //  Запрашиваем данные из БД
        fetch("/db/db.json")
            .then((response) => response.json()) // Получаем данные в виде json
            .then((data) => {
                // Фильтруем data
                const array = data.filter((item) => {
                    // возвращем те карточки, у которых name равен value (введеное пользователем значение в поле ввода)
                    // Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false
                    // Чтобы не зависить от регистра преобразуем name и value в нижний регистр
                    return item.name.toLowerCase().includes(value.toLowerCase());
                });
                console.log("Полученное значение из input: ", value);
                // Отправить полученные данные в локальное хранилище
                localStorage.setItem("data", JSON.stringify(array));

                // Если мы не находимся на странице goods.html, то переходим на эту страницу
                if (window.location.pathname !== "/goods.html") {
                    window.location.href = "/goods.html";
                } else {
                    // Иначе запускаем функцию renderGoods с полученными данными
                    renderGoods(array);
                }
            });
    };

    searchBtn.addEventListener("click", () => {
        getData(input.value);
    });
};

search();
