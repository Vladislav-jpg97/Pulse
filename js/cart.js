window.addEventListener("DOMContentLoaded", () => {
    // 1. Получаем корзину из localStorage (если она есть, если нет - возвращаем пустой массив)
    // Это функция, которая извлекает данные корзины из локального хранилища браузера.
    // Если корзина не найдена, возвращается пустой массив.
    const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Сохраняем корзину в localStorage
    // Эта функция сохраняет данные корзины в локальном хранилище браузера.
    // Мы конвертируем корзину в строку JSON перед сохранением, чтобы сохранить её в правильном формате.
    const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

    // 3. Функция рендеринга корзины
    // Отображает корзину на странице. Каждое изменение в корзине вызывает эту функцию, чтобы обновить отображение.
    const renderCart = () => {
        const cartElem = document.querySelector("#js-cart-item"); // Ищем элемент, куда будем вставлять товары корзины.
        if (!cartElem) return; // Если элемент не найден, прекращаем выполнение функции.

        const cart = getCart(); // Получаем данные корзины.

        if (cart.length === 0) { // Если корзина пуста, показываем сообщение
            cartElem.innerHTML = `<h3 class="text-[#ff5100] font-bold text-[30px] text-center">Добавьте товар</h3>`;
            return;
        }

        cartElem.innerHTML = ""; // Очищаем контейнер корзины перед рендерингом новых данных

        // 4. Отображаем каждый товар в корзине
        // Для каждого товара из массива корзины создаём HTML-разметку и вставляем её на страницу.
        cart.forEach(item => {
            cartElem.insertAdjacentHTML("beforeend", `
                <div id="${item.id}" data-id="${item.id}"
                    class="flex items-center justify-between p-[20px] border border-[#FF6A00] rounded-[15px] bg-black/30 hover:shadow-[0_0_20px_#FF6A00] transition-all duration-500">

                    <div class="flex items-center space-x-[20px]">
                        <img src="${item.img}" alt="${item.name}" class="w-[120px] h-[100px] object-cover rounded-[10px]">
                        <div>
                            <h3 class="text-white text-[20px] font-bold">${item.name}</h3>
                            <p class="text-[#ff5100] text-[18px]">${item.price * item.quantity} Сум</p>
                        </div>
                    </div>

                    <!-- Количество -->
                    <div class="flex items-center space-x-[20px]">
                        <button class="w-[35px] h-[35px] flex justify-center items-center text-[#ff5100] border border-[#FF6A00] rounded-[10px] hover:bg-[#FF6A00] hover:text-black transition-all duration-500 minus">
                            -
                        </button>

                        <span class="text-white text-[18px]">${item.quantity}</span>

                        <button class="plus w-[35px] h-[35px] flex justify-center items-center text-[#ff5100] border border-[#FF6A00] rounded-[10px] hover:bg-[#FF6A00] hover:text-black transition-all duration-500">
                            +
                        </button>

                        <!-- Удалить -->
                        <button class="remove text-red-500 text-[25px] hover:text-white transition-all duration-500 font-bold">
                            ×
                        </button>
                    </div>
                </div>
            `);
        });

        // 5. После рендеринга элементов корзины, инициализируем кнопки
        // Для каждой кнопки "+" или "-" мы добавляем обработчик событий, чтобы изменить количество товаров.
        initCartButtons(); // Этот метод инициализирует кнопки для каждого товара.
    }

    // 6. Инициализация кнопок для изменения количества и удаления товара из корзины
    const initCartButtons = () => {
        // 6.1. Обработчик для кнопки "плюс"
        document.querySelectorAll(".plus").forEach(btn => {
            btn.addEventListener("click", () => {
                const cart = getCart(); // Получаем текущую корзину
                const id = btn.closest('[data-id]').dataset.id; // Получаем id товара через closest

                const item = cart.find(i => i.id === id); // Ищем товар в корзине

                if (item) {
                    item.quantity++; // Увеличиваем количество товара
                    saveCart(cart); // Сохраняем обновлённую корзину
                    renderCart(); // Обновляем отображение корзины
                    renderAside()
                    header()
                } else {
                    console.error('Товар не найден в корзине', id); // Выводим ошибку, если товара нет
                }
            });
        });

        // 6.2. Обработчик для кнопки "минус"
        document.querySelectorAll(".minus").forEach(btn => {
            btn.addEventListener("click", () => {
                let cart = getCart(); // Мы здесь используем let, чтобы обновить cart после фильтрации
                const id = btn.closest('[data-id]').dataset.id; // Получаем id товара

                const item = cart.find(i => i.id === id); // Ищем товар в корзине
                if (item) {
                    item.quantity--; // Уменьшаем количество товара
                    if (item.quantity <= 0) { // Если количество товара 0 или меньше
                        cart = cart.filter(i => i.id !== id); // Убираем товар из корзины
                    }
                    saveCart(cart); // Сохраняем обновлённую корзину
                    renderCart(); // Обновляем отображение корзины
                    renderAside()
                    header()
                }
            });
        });

        // 6.3. Обработчик для кнопки "удалить"
        document.querySelectorAll(".remove").forEach(btn => {
            btn.addEventListener("click", () => {
                let cart = getCart(); // Получаем текущую корзину
                const id = btn.closest('[data-id]').dataset.id; // Получаем id товара

                const updatedCart = cart.filter(i => i.id !== id); // Убираем товар из корзины
                saveCart(updatedCart); // Сохраняем обновлённую корзину
                renderCart(); // Обновляем отображение корзины
                renderAside()
                header()
            });
        });
    }


    const renderAside = () => {
        const aside = document.querySelector("#js-aside")
        if (!aside) {
            return;
        }
        const cart = getCart()
        if(cart.length === 0){
            aside.innerHTML = ""
            return
        }
        const totalQty = cart.reduce((s, i) => s + i.quantity, 0)
        const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0)
        aside.innerHTML = `
            <p class="text-white text-[30px]">Кол-во Товара :</p>
                    <p id="cart-total" class="text-[#ff5100] text-[30px] font-bold mt-[10px]">
                        ${totalQty}
                    </p>
                    <p class="text-white text-[30px]">Общая Сумма :</p>
                    <p id="cart-total" class="text-[#ff5100] text-[30px] font-bold mt-[10px]">
                        ${totalPrice} сум
                    </p>

                    <!-- BUY BUTTON -->
                    <button
                        class="mt-[30px] py-[15px] px-[40px] rounded-[15px] border-2 border-[#FF6A00] text-[#ff5100] font-bold text-[20px] hover:bg-[#FF6A00] hover:text-black hover:shadow-[0_0_30px_#FF6A00] transition-all duration-700">
                        Оформить заказ
                    </button>
        `
    }
    renderAside()
    // 7. Рендерим корзину при загрузке страницы
    renderCart(); // Эта функция вызывается один раз при загрузке страницы, чтобы показать текущее состояние корзины
});
