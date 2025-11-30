// Ждём загрузки всей HTML-структуры страницы
window.addEventListener("DOMContentLoaded", () => {
    // Получаем элементы
    const buttoShop = document.querySelector("#js-buttoShop"); // блок с кнопками категорий
    const buttonShop = buttoShop.querySelectorAll("button"); // все кнопки категорий
    const productsShop = document.querySelector("#js-shop"); // блок для вывода товаров

    // Функция для добавления товара в корзину
    const initAddToCart = () => {
        // Получаем все кнопки "Добавить" на странице
        const buttons = document.querySelectorAll("#js-buttonMarket");

        // Добавляем обработчик клика для каждой кнопки
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Находим родительский элемент списка (товар)
                const product = btn.closest("li");
                if (!product) return; // если товара нет — ничего не делаем

                // Формируем объект товара для добавления в корзину
                const item = {
                    id: product.dataset.id, // уникальный идентификатор товара
                    category: product.dataset.category, // категория товара
                    img: product.querySelector(".shop-img").src, // путь к изображению
                    name: product.querySelector(".shop-name").textContent.trim(), // название товара
                    description: product.querySelector(".shop-description").textContent.trim(), // описание товара
                    price: parseFloat(product.querySelector(".shop-price").textContent), // цена товара
                    quantity: 1, // начальное количество
                };

                // Получаем корзину из localStorage, если она есть
                let cart = getCart();

                // Проверяем, есть ли уже товар в корзине
                const found = cart.find(i => i.id === item.id);

                // Если товар есть, увеличиваем его количество
                if (found) found.quantity++;
                else cart.push(item); // Если товара нет — добавляем его в корзину

                // Сохраняем обновлённую корзину в localStorage
                saveCart(cart);
                header()
            });
        });
    };

    // Функция рендера товаров
    const renderShop = (array) => {
        // Очищаем блок товаров перед рендером
        productsShop.innerHTML = "";

        // Перебираем массив товаров и вставляем их в HTML
        array.forEach(item => {
            productsShop.insertAdjacentHTML("beforeend", `
                <li data-id="${item.id}" class="border-2 rounded-[20px] border-[#FF6A00] hover:shadow-[0_0_50px_#FF6B66] hover:scale-[1.01] transition-all duration-1000 px-[15px] py-[20px] mb-[20px]">
                    <!-- Название товара -->
                    <h4 data-aos="fade-up" data-aos-duration="1200" class="text-center text-[#ff5100] font-bold text-[30px] shop-name">${item.name}</h4>
                    <!-- Изображение товара -->
                    <div data-aos="fade-up" data-aos-duration="1200" class="w-full h-[300px] overflow-hidden rounded-lg my-[20px]">
                        <img class="w-full h-full object-cover shop-img" src="${item.img}">
                    </div>
                    <!-- Описание товара -->
                    <p data-aos="fade-up" data-aos-duration="1200" class="text-start text-[#FF6A99] text-[15px] py-[10px] shop-description">${item.description}</p>
                    <!-- Цена и кнопка "Добавить" -->
                    <div data-aos="fade-up" data-aos-duration="1200" class="flex justify-between items-center">
                        <strong class="text-[#ff5100] text-[25px] shop-price">${item.price}</strong>
                        <button id="js-buttonMarket" class="mt-[10px] py-[7px] px-[20px] rounded-[15px] border-2 border-[#FF6A00] text-[#ff5100] font-bold text-[20px] hover:bg-[#FF6A00] hover:text-black hover:shadow-[0_0_30px_#FF6A00] transition-all duration-700" type="button">
                            Добавить
                        </button>
                    </div>
                </li>
            `);
        });

        // Инициализация анимаций AOS
        if (window.AOS) {
            AOS.init();
            AOS.refreshHard(); // Обновляем позиции анимаций
        }

        // Перезапускаем обработчики на кнопки добавления товаров в корзину
        initAddToCart();
    };

    // Фильтруем товары по категории (по умолчанию показываем категорию 1)
    const defaultCategory = 1;
    const defaultShop = shop.filter(item => item.category === defaultCategory); // выбираем товары по категории
    renderShop(defaultShop); // отображаем товары этой категории

    // Обработчик кликов по кнопкам категорий
    buttonShop.forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.preventDefault(); // отменяем стандартное поведение кнопки (перезагрузка страницы)

            // Получаем id категории из кнопки
            const buttonId = Number(event.currentTarget.id);

            // Фильтруем товары по выбранной категории
            const filteredShop = shop.filter(item => item.category === buttonId);

            // Отображаем отфильтрованные товары
            renderShop(filteredShop);
        });
    });

    // Функция для получения корзины из localStorage
    const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

    // Функция для сохранения корзины в localStorage
    const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
});
