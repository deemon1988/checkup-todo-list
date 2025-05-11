const URL = 'https://5966e44c806d7811.mokky.dev/users';

const form = document.querySelector(".registration");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const login = form.querySelector("#login").value;
    const username = form.querySelector("#username").value;
    const surname = form.querySelector("#user_surname").value;
    const email = form.querySelector("#user_email").value;
    const age = form.querySelector("#age").value;
    const password = form.querySelector("#password").value;

    const formData = {
        login: login,
        username: username,
        surname: surname,
        email: email,
        age: age,
        password: password,
    };

    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        // Обрабатываем ответ
        if (res.ok) {
            const data = await res.json();
            console.log("Регистрация успешна:", data);
            alert("Регистрация успешна!");
        } else {
            const error = await res.json();
            console.error("Ошибка регистрации:", error);
            alert("Ошибка регистрации: " + error.message);
        }
    } catch (error) {
        console.error("Ошибка сети:", error);
        alert("Ошибка сети: " + error.message);
    }
});

fetch(URL, {
    method: "GET",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})
.then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Преобразуем ответ в JSON
})
.then((data) => {
    console.log(data); // Выводим JSON-данные
})
.catch((error) => {
    console.error("Error fetching data:", error);
});



