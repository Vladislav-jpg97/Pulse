window.addEventListener("DOMContentLoaded", () => {
    const buttonWork = document.querySelector("#js-buttonWork"); // блок с кнопками категорий
    const workOutElement = document.querySelector("#js-work-out"); // блок с упражнениями

    // =============================
    // 1. Рендер кнопок
    // =============================
    const renderButtons = (buttonsArray) => {
        if (!buttonsArray.length) {
            buttonWork.innerHTML = "Пусто";
            return;
        }

        buttonWork.innerHTML = "";

        buttonsArray.forEach(btn => {
            buttonWork.insertAdjacentHTML(
                "beforeend",
                `
                <li data-aos="fade-up" data-aos-duration="2500">
                    <button 
                        data-id="${btn.id}"
                        class="mt-[10px] py-[7px] px-[20px] rounded-[15px] border-2 border-[#FF6A00] 
                                text-[#ff5100] font-bold text-[20px] 
                                hover:bg-[#FF6A00] hover:text-black hover:shadow-[0_0_30px_#FF6A00] 
                                transition-all duration-700"
                        type="button"
                    >
                        ${btn.name}
                    </button>
                </li>
                `
            );
        });
    };

    renderButtons(button); // рисуем кнопки

    // =============================
    // 2. Рендер упражнений
    // =============================
    const renderWorkouts = (workoutsArray) => {
        if (!workoutsArray.length) {
            workOutElement.innerHTML = "Пусто";
            return;
        }

        workOutElement.innerHTML = "";

        workoutsArray.forEach(item => {
            workOutElement.insertAdjacentHTML(
                "beforeend",
                `
                <li class="flex flex-col border-2 rounded-[20px] border-[#FF6A00] 
                            hover:shadow-[0_0_50px_#FF6B66] hover:scale-[1.01] 
                            transition-all duration-2000 py-[80px] px-[40px]"
                    data-aos="fade-up" data-aos-duration="2500">
                    
                    <h3 class="text-center text-[#ff5100] font-bold text-[60px] mb-[60px]">
                        ${item.name}
                    </h3>
                    
                    <div class="flex justify-center items-center space-x-[80px]">
                        <div class="w-[500px] h-[300px] overflow-hidden rounded-lg">
                            <img class="w-full h-full object-cover" src="${item.img}" alt="${item.name}">
                        </div>
                        <div class="w-[500px] space-y-[15px] text-[#FF6A99]">
                            
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

        AOS.refresh(); // обновляем анимации
    };

    // =============================
    // 3. Обработка кликов по кнопкам категорий (делегирование)
    // =============================
    buttonWork.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") return; // кликаем только по кнопке

        const categoryId = Number(e.target.dataset.id); // получаем id категории

        const filteredWorkouts = work.filter(item => item.category === categoryId);

        renderWorkouts(filteredWorkouts);
    });

});
