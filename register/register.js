
// Функция для валидации пароля
async function passValidation(pass, confirmPass) {
    if (pass !== confirmPass) {
        const password = reg_form.querySelector("#password");
        const confirmPassword = reg_form.querySelector('#password_confirm');
        highlightFields(password, confirmPassword)
        return { "res": false, "message": "Пароли не совпадают" };
    }
    const requirements = [
        // { regex: /.{8,}/, index: 0 }, // Минимум 8 символов
        { regex: /[0-9]/, index: 1 }, // Содержит хотя бы одну цифру
        { regex: /[a-zа-я]/, index: 2 }, // Содержит хотя бы одну строчную букву
        { regex: /[A-ZА-Я]/, index: 3 }, // Содержит хотя бы одну прописную букву
    ];
    for (const requirement of requirements) {
        if (!requirement.regex.test(pass)) {
            console.log("Индекс:", requirement.index)
            return { "res": false, "message": registerErrorMessage(requirement.index) };
        }
    }
    return { "res": true, "message": "Успешная регистрация" };
}

// Функция для выбора текста в зависимости от ошибки
function registerErrorMessage(requirementIndex) {
    switch (requirementIndex) {
        case 1:
            return "Пароль должен содержать хотя бы одну цифру"
        case 2:
            return "Пароль должен содержать хотя бы одну букву в нижнем и верхнем регистре"
        case 3:
            return "Пароль должен содержать хотя бы одну букву в верхнем регистре"
    }
}

// Обработчик для формы регистрации
const reg_form = document.querySelector(".registration");
reg_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const login = reg_form.querySelector("#reg_login").value;
    const email = reg_form.querySelector("#user_email").value;
    const password = reg_form.querySelector("#password").value;
    const confirmPassword = reg_form.querySelector('#password_confirm').value;

    const formData = {
        login: login,
        email: email,
        password: password,
    };

    required_pass = await passValidation(password, confirmPassword)

    if (!required_pass.res) {
        error_message(".reg_form h2", required_pass.message)
        return
    };

    sendFormRequest('register', formData);

});