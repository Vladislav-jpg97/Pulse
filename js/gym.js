window.addEventListener("DOMContentLoaded", () => {
    const buttonWork = document.querySelector("#js-buttonWork"); // блок с кнопками категорий
    const workOutElement = document.querySelector("#js-work-out"); // блок, куда будем выводить упражнения

    // =============================
    // 1. Рисуем кнопки
    // =============================
    const renderButtons = (buttonsArray) => {
        if (!buttonsArray.length) { // если кнопок нет
            buttonWork.innerHTML = "Пусто"; // показываем "Пусто"
            return;
        }

        buttonWork.innerHTML = ""; // очищаем контейнер перед отрисовкой

        buttonsArray.forEach(btn => {
            buttonWork.insertAdjacentHTML(
                "beforeend",
                `
                <li data-aos="fade-up" data-aos-duration="2000">
                    <button class="mt-[10px] py-[7px] px-[20px] rounded-[15px] border-2 border-[#FF6A00] text-[#ff5100] font-bold text-[20px] hover:bg-[#FF6A00] hover:text-black hover:shadow-[0_0_30px_#FF6A00] transition-all duration-700" type="button" id="${btn.id}">${btn.name}</button>
                </li>
                `
            );
        });
    };

    renderButtons(buttonGym); // рисуем кнопки из массива button

    // =============================
    // 2. Рисуем упражнения
    // =============================
    const renderWorkouts = (workoutsArray) => {
        if (!workoutsArray.length) { // если упражнений нет
            workOutElement.innerHTML = "Пусто"; // показываем "Пусто"
            return;
        }

        workOutElement.innerHTML = ""; // очищаем блок перед отрисовкой

        workoutsArray.forEach(item => {
            workOutElement.insertAdjacentHTML(
                "beforeend",
                `
                <li class="flex flex-col border-2 rounded-[20px] border-[#FF6A00] hover:shadow-[0_0_50px_#FF6B66] hover:scale-[1.01] transition-all duration-1000 py-[80px] my-[60px] px-[40px]"
                    id="${item.id}" data-aos="fade-up" data-aos-duration="2500">
                    
                    <h3 data-aos="fade-up" data-aos-duration="2500" class="text-center text-[#ff5100] font-bold text-[60px] mb-[60px]">${item.name}</h3>
                    
                    <div class="flex justify-center items-center space-x-[80px]">
                        <div data-aos="fade-up" data-aos-duration="2500" class="w-[500px] h-auto overflow-hidden rounded-lg">
                            <img class="w-full h-full object-cover" src="${item.img}" alt="${item.name}">
                        </div>
                        <div data-aos="fade-up" data-aos-duration="2500" class="w-[500px] space-y-[15px] text-[#FF6A99]">
                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleOne}</p>
                            <p>${item.one}</p>
                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleTwo}</p>
                            <p>${item.two}</p>
                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleThree}</p>
                            <p>${item.three}</p>
                        </div>
                    </div>
                </li>
                `
            );
        });

        AOS.refresh(); // обязательно обновляем AOS, чтобы анимация сработала снова
    };

    // =============================
    // 3. Клик по кнопкам категорий
    // =============================
    buttonWork.addEventListener("click", (e) => {
        e.preventDefault(); // НЕ обновлять страницу при клике (если вдруг кнопка внутри формы)
        if (e.target.tagName !== "BUTTON") return;

        const categoryId = Number(e.target.id); // получаем id категории из кнопки

        const filteredWorkouts = gym.filter(item => item.category === categoryId); // фильтруем упражнения по категории

        renderWorkouts(filteredWorkouts); // рисуем только выбранные упражнения
    });


});
