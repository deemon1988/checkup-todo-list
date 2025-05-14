
// Обработчик для формы авторизации
const auth_form = document.querySelector(".authorization");
auth_form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const auth_email = document.querySelector("#auth_email").value;
    const auth_pass = document.querySelector("#password").value;
    const formData = {
        email: auth_email,
        password: auth_pass
    };
    sendFormRequest('auth', formData);
});