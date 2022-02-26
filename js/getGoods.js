const getGoods = () => {
    const navLinks = document.querySelectorAll('.navigation-link'); // Ссылки в навигации

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
   
    // Функция возвращает данные с бд
    const getData = () => {
        //  2-й способ написания
        fetch("/db/db.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Отправить полученные данные в локальное хранилище
                localStorage.setItem('data', JSON.stringify(data)); 
            });
    };

     // Метод forEach аргументом принимает ф-ию
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) =>{
            event.preventDefault(); // Заблокируем стандартное поведение ссылок (это переход по url - href="#")
            getData();  // При клике по категоримем запрашиваем данные с сервера( в нашем случае с файла json)
        });
    });

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
