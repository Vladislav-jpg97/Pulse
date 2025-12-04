window.addEventListener("DOMContentLoaded", () => {
    const buttonWork = document.querySelector("#js-buttonWork");
    const workOutElement = document.querySelector("#js-work-out");

    // =============================
    // 1. Рисуем кнопки
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
                `<li data-aos="fade-up" data-aos-duration="2000">
                    <button class="mt-[10px] py-[7px] px-[20px] rounded-[15px] border-2 border-[#FF6A00] text-[#ff5100] font-bold text-[20px] hover:bg-[#FF6A00] hover:text-black hover:shadow-[0_0_30px_#FF6A00] transition-all duration-700" type="button" id="${btn.id}">${btn.name}</button>
                </li>`
            );
        });
    };

    renderButtons(buttonGym);

    // =============================
    // 2. Рисуем упражнения
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
                `<li class="flex flex-col border-2 rounded-[20px] border-[#FF6A00] hover:shadow-[0_0_50px_#FF6B66] hover:scale-[1.01] transition-all duration-1000 py-[80px] my-[60px] px-[40px]"
                    id="${item.id}" data-aos="fade-up" data-aos-duration="2500">
                    
                    <h3 class="text-center text-[#ff5100] font-bold text-[60px] mb-[60px]">${item.name}</h3>
                    
                    <div class="flex justify-center items-center space-x-[80px]">
                        <div class="w-[500px] h-auto overflow-hidden rounded-lg">
                            <img class="w-full h-full object-cover" src="${item.img}" alt="${item.name}">
                        </div>
                        <div class="w-[500px] space-y-[15px] text-[#FF6A99]">
                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleOne}</p>
                            <p>${item.one}</p>
                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleTwo}</p>
                            <p>${item.two}</p>
                            <p class="text-start text-[#ff5100] font-small text-[30px]">${item.titleThree}</p>
                            <p>${item.three}</p>
                            <a data-video="${item.category}" class="py-[10px] px-[25px] rounded-[15px] border-2 border-[#FF6A00] text-[#ff5100] font-bold text-[20px] hover:bg-[#FF6A00] hover:text-black hover:shadow-[0_0_30px_#FF6A00] transition-all duration-700" href="${item.video}" target="_blank">Видео</a>
                        </div>
                    </div>
                </li>`
            );
        });

        AOS.refresh();
    };

    // =============================
    // 3. Клик по кнопкам категорий
    // =============================
    buttonWork.addEventListener("click", (e) => {
        if (!e.target.closest("button")) return;

        const categoryId = Number(e.target.id);
        const filteredWorkouts = gym.filter(item => item.category === categoryId);

        renderWorkouts(filteredWorkouts);
    });

    // =============================
    // 4. Клик по видео
    // =============================
    workOutElement.addEventListener("click", (e) => {
        const videoBtn = e.target.closest("[data-video]");
        if (!videoBtn) return;

        e.preventDefault();

        const categoryId = Number(videoBtn.dataset.video);
        const filteredWorkouts = gym.filter(item => item.category === categoryId);

        localStorage.setItem("video", JSON.stringify(filteredWorkouts));

        location.href = "./video.html";
    });
});
