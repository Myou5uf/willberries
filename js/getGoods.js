const getGoods = () => {
    const navLinks = document.querySelectorAll(".navigation-link"); // Ссылки в навигации
    const moreLink = document.querySelector(".more");

    /*  1-й способ написания
        // Метод для получения данных от серера (или с локального файла)
        fetch('/db/db.json')    // Метод fetch обратил к файлу db.json и вернул ответ через некоторое время
            .then(function(response) {  // Метод then отработает тогда, когда получит ответ(response)
                // Чтобы извлечь данные используем метод json b и возвращаем объект к которому применили json()
                return response.json();
                // return response.text();     // ответ можно вернуть в виде текста
            })
            // Метод then отработает когда все данные из response будут переведены в виде json
            .then(function(data){   // В параметр data попадет тот ответ сервера, который он и вернул(массив с данными)
                console.log(data);
            });
    */

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
            // console.log(data);
        });
    };

    // Функция возвращает данные с бд
    const getData = (category, value) => {
        //  2-й способ написания
        fetch("/db/db.json")
            .then((response) => response.json())
            .then((data) => {
                // Метод filter возвращает новый массив из элементов,callback которых возвращает true
                // Если category вернет true, то фильтруем данные, если false ,то возвращаем вcю data
                const array = category ? data.filter((item) => item[category] === value) : data;
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

    //

    // Метод forEach аргументом принимает ф-ию
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Заблокируем стандартное поведение ссылок (это переход по url - href="#")
            const category = link.dataset.field; // Значение из data - атрибута
            const linkValue = link.textContent; // Текстовое содержимое ссылки
            // При клике по категоримем запрашиваем данные с сервера( в нашем случае с файла json)
            getData(category, linkValue);
        });
    });

    // Если в локальном хранилище есть данные и находимся на странице goods.html
    if (localStorage.getItem("data") && window.location.pathname === "/goods.html") {
        // то запускаем renderGoods, передав данные из локального хранилища, предварительно распарсив их
        renderGoods(JSON.parse(localStorage.getItem("data")));
    }

    // Переход в каталог товаров по кнопке View All
    if (moreLink) {
        // Если кнопка есть то
        moreLink.addEventListener("click", () => {
            getData();
        });
    }

    /* ---------------- Примеры использования localStorage
         localStorage.setItem('goods', JSON.stringify([1, 2, 3, 4, 5]));
        // setItem - метод для записи в локальное хранилище
        // JSON - глобальный объект
        // JSON.stringify -  преобразует значение JavaScript в строку JSON
        console.log(localStorage.getItem('goods'));
        // getItem - метод для получения значения из локального хранилища
        const goods = JSON.parse(localStorage.getItem('goods'));
        // Метод JSON.parse() разбирает строку JSON
        console.log(goods);

        console.log(localStorage);
        // Метод removeItem() удалит из хранилища элемент с указанным ключом 
        localStorage.removeItem('goods');
        console.log(localStorage);
    */
};

getGoods();
