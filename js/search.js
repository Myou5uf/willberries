const search = function () {
    const cartBtn = document.querySelector('.button-btn');  // Кнопка корзина
    const input = document.querySelector('.search-block > input'); // Текстовое поле 
    const searchBtn = document.querySelector('.search-block > button'); // Кнопка поиска 


    // Событие input - ловит каждый ввод в наше поле вводе 
    input.addEventListener('input', (event) => {
        console.log("Ввод в input");
        // console.log(event.target);    // event.target - хранит тот input на котом произошло событие
        console.log(event.target.value);    // event.target.value - значение, введенное в поле ввода
    });

    // При клике на кнопку - поиск, выводим в консоль значение, введеное в поле для ввода 
    searchBtn.addEventListener('click', () => {
        console.log("Введенное значение: ", input.value);
    });
};

search();