window.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#js-login-form");
    if (!loginForm) {
        console.error("Форма входа не найдена!");
        return;
    }

    const searchParams = new URLSearchParams(location.search);

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailLoginInputEl = document.querySelector("#js-login-email");
        const passwordLoginInputEl = document.querySelector("#js-login-password");

        if (!emailLoginInputEl || !passwordLoginInputEl) {
            console.error("Поля email или пароль не найдены!");
            return;
        }

        const emailLoginInput = emailLoginInputEl.value.trim();
        const passwordLoginInput = passwordLoginInputEl.value.trim();

        let users = JSON.parse(localStorage.getItem("User-Data")) || [];

        // Находим пользователя по email
        const user = users.find(u => u.emailInput === emailLoginInput);

        if (!user) {
            alert("Неверный email");
            return;
        }

        if (user.passwordInput !== passwordLoginInput) {
            alert("Неверный пароль");
            return;
        }

        // Успешный вход
        alert(`Добро пожаловать, ${user.nameInput}!`);

        const userName = { userName: user.nameInput };
        localStorage.setItem("userName", JSON.stringify(userName));

        // После успешного входа
        location.href = "index.html";

    });
});
