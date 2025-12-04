window.addEventListener("DOMContentLoaded", () => {

    const buttonWork = document.querySelector("#js-buttonWork");   // блок с кнопками категорий
    const workOutElement = document.querySelector("#js-work-out"); // блок с упражнениями

    // =============================
    // 1. Рендер кнопок категорий
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

    renderButtons(button); // рендер кнопок


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
                    data-aos="fade-up" data-aos-duration="2000">
                    
                    <h3 data-aos="fade-up" data-aos-duration="2000"
                        class="text-center text-[#ff5100] font-bold text-[60px] mb-[60px]">
                        ${item.name}
                    </h3>
                    
                    <div class="flex justify-center items-center space-x-[80px]">
                        
                        <div data-aos="fade-up" data-aos-duration="2000"
                            class="w-[500px] h-[300px] overflow-hidden rounded-lg">
                            <img class="w-full h-full object-cover" src="${item.img}" alt="${item.name}">
                        </div>
                        
                        <div data-aos="fade-up" data-aos-duration="2000"
                            class="w-[500px] space-y-[25px] text-[#FF6A99]">
                            
                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleOne}</p>
                            <p>${item.one}</p>

                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleTwo}</p>
                            <p>${item.two}</p>

                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleThree}</p>
                            <p>${item.three}</p>

                            <a data-video="${item.category}"
                                class="py-[10px] px-[25px] rounded-[15px] border-2 border-[#FF6A00] 
                                        text-[#ff5100] font-bold text-[20px] 
                                        hover:bg-[#FF6A00] hover:text-black hover:shadow-[0_0_30px_#FF6A00] 
                                        transition-all duration-700"
                                href="${item.video}" target="_blank">
                                Видео
                            </a>

                        </div>
                    </div>
                </li>
                `
            );
        });

        AOS.refresh(); // обновляем анимации
    };


    // =============================
    // 3. Клики по кнопкам категорий (делегирование)
    // =============================
    buttonWork.addEventListener("click", (e) => {
        if (!e.target.closest("button")) return;

        const categoryId = Number(e.target.dataset.id);

        const filteredWorkouts = work.filter(item => item.category === categoryId);

        renderWorkouts(filteredWorkouts);
    });


    // =============================
    // 4. Клики по ссылкам "Видео" (делегирование)
    // =============================
    // =============================
    // 4. Клики по ссылкам "Видео" (делегирование)
    // =============================
    workOutElement.addEventListener("click", (e) => {
        const videoBtn = e.target.closest("[data-video]");
        if (!videoBtn) return; // если клик не по ссылке — выходим

        e.preventDefault(); // чтобы не открывалась ссылка сразу

        const categoryId = Number(videoBtn.dataset.video);

        const filteredWorkouts = work.filter(item => item.category === categoryId);

        console.log("Видео по категории:", categoryId);
        console.log(filteredWorkouts);

        // Сохраняем весь массив в localStorage
        localStorage.setItem("video", JSON.stringify(filteredWorkouts));

        // Переход на страницу
        location.href = "./video.html";
    });



});
