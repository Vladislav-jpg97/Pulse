window.addEventListener("DOMContentLoaded", () => {
    const videoWrapper = document.querySelector("#js-video");
    const videos = JSON.parse(localStorage.getItem("video")) ?? [];

    // Очищаем контейнер
    videoWrapper.innerHTML = "";

    // Если видео нет — выводим заглушку
    if (!videos.length) {
        videoWrapper.innerHTML = `
            <p class="text-center text-[22px] text-gray-400">
                Видео пока нет 😢
            </p>
        `;
        return;
    }

    // Рендерим видео
    videos.forEach(item => {
        videoWrapper.insertAdjacentHTML("beforeend", `
            <h3 data-aos="fade-up" data-aos-duration="2000"
                class="text-center text-[#ff5100] font-bold text-[30px] sm:text-[40px] mb-[40px]">
                ${item.name}
            </h3>

            <div data-aos="fade-up" data-aos-duration="2000" class="flex justify-center">
                <div class="w-full max-w-[800px] aspect-video rounded-[20px] overflow-hidden shadow-lg border-2 border-[#FF6A00]">
                    <iframe class="w-full h-full"
                        src="${item.video}"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `);
    });
});
