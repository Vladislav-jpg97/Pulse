window.addEventListener("DOMContentLoaded", () => {
    const regForm = document.querySelector("#js-reg-form");

    if (!regForm) {
        console.error("Форма регистрации не найдена!");
        return;
    }

    const searchParams = new URLSearchParams(location.search);

    regForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.querySelector("#js-name").value.trim();
        const emailInput = document.querySelector("#js-email").value.trim();
        const passwordInput = document.querySelector("#js-password").value.trim();
        const passwordInput2 = document.querySelector("#js-password2").value.trim();
        const regRedirect = searchParams.get("reg"); // ?reg=1 в URL

        let users = JSON.parse(localStorage.getItem("User-Data")) || [];

        // Проверяем уникальность email
        const isEmailExist = users.some(user => user.emailInput === emailInput);

        if (isEmailExist) {
            alert("Этот email уже используется");
            return;
        }

        // Проверка паролей
        if (passwordInput !== passwordInput2) {
            alert("Пароли не совпадают");
            return;
        }

        // Сохраняем пользователя
        users.push({
            nameInput,
            emailInput,
            passwordInput
        });

        localStorage.setItem("User-Data", JSON.stringify(users));

        alert(`${nameInput}, регистрация прошла успешно!`);

        regForm.reset();


        // Если есть параметр reg и он равен "1", перенаправляем

        location.href = "login-form.html";


    });
});
