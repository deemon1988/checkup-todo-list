const MOKKY_URL = "https://5966e44c806d7811.mokky.dev";

const reg_form = document.querySelector(".registration");

reg_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const login = reg_form.querySelector("#login").value;
    const username = reg_form.querySelector("#username").value;
    const surname = reg_form.querySelector("#user_surname").value;
    const email = reg_form.querySelector("#user_email").value;
    const age = reg_form.querySelector("#age").value;
    const password = reg_form.querySelector("#password").value;

    const formData = {
        login: login,
        username: username,
        surname: surname,
        email: email,
        age: age,
        password: password,
    };

    try {
        const res = await fetch(`${MOKKY_URL}/register`, {
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


const btn = document.querySelector(".event1");
btn.addEventListener("click", async function () {
  const res = await fetch("https://5966e44c806d7811.mokky.dev/users", {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }});

  const jsonData = await res.json();
  console.log(jsonData[1]["login"]);
  console.log(jsonData);

  jsonData.forEach((element, index) => {
    const div = document.createElement("div");
    div.className = "user-card";
    const login = element["login"];
    const username = element["username"];
    const surname = element["surname"];
    const email = element["email"];
    const age = element["age"];
    const password = element["password"];
    div.innerHTML = `
    <p><strong>Логин:</strong> ${login}</p>
    <p><strong>Имя:</strong> ${username}</p>
    <p><strong>Фамилия:</strong> ${surname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Возраст:</strong> ${age}</p>
    <p><strong>Пароль:</strong> ${password}</p>`;
    btn.after(div);
  });
  
});

const auth_form = document.querySelector(".authorization")
auth_form.addEventListener("submit", async function (){
  const res = await fetch(`${MOKKY_URL}/auth`, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "dmn372835@yandex.ru",
    password: "Wuu-p9Y-b4D-Dwb"
  })
});
const jsonData = await res.json();
console.log(jsonData);
});
