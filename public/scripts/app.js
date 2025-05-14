const MOKKY_URL = "https://5966e44c806d7811.mokky.dev";

// Функция для отправки запросов авторизации и регистрации
async function sendFormRequest(endpoint, formData) {
    try {
        const res = await fetch(`${MOKKY_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            const jsonData = await res.json();
            console.log(jsonData);
            localStorage.setItem('token', jsonData.token);
            window.location.href = '../public/index.html';
            console.log(`Succesfuly ${endpoint}`);
        }
        else {
            const error = await res.json();
            const selector = endpoint === 'register' ? ".reg_form h2" : ".auth_form h2"
            formErrorsHandler(endpoint, selector, error)
            return
        }
    } catch (error) {
        console.log("Ошибка сети:", error);
        alert("Ошибка сети: " + error.message);
    }
}

// Функция обработки ошибок при авторизации и регистрации
function formErrorsHandler(endpoint, messageSelector, error) {
    switch (endpoint) {
        case 'register':
            console.error("Ошибка регистрации:", error);
            const reg_message = error.statusCode === 401 ? "Пользовтель с таким email уже зарегистрирован" : error.message
            error_message(messageSelector, reg_message)
            const emailField = document.getElementById("user_email")
            highlightFields(emailField)
            break;
        case 'auth':
            console.error("Ошибка авторизации:", error);
            const message = error.statusCode === 401 ? "Неверное имя пользователя или пароль" : error.message
            error_message(messageSelector, message)
            break;
        default:
            console.error("Ошибка:", error);
            error_message(messageSelector, error.message)
            alert("Ошибка: " + error.message);
            break;
    }
}

// Функция добавления ошибки на страницу
async function error_message(selector, message) {
    console.log(message)
    document.querySelector(".message-error")?.remove();
    const pass_error = document.createElement("div")
    pass_error.className = 'message-error'
    const elem_selector = document.querySelector(selector)
    pass_error.textContent = message
    console.log(pass_error)
    elem_selector.before(pass_error)
}

// Функция для выделения полей с ошибками
function highlightFields(...fields) {
    const existErrorFields = document.querySelectorAll(".input-error")
    existErrorFields.forEach((field) => {
        field.classList.remove("input-error")
    })
    fields.forEach((field) => {
        field.classList.add("input-error")
    })
}