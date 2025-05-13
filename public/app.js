// const deleteBtn = document.querySelector(".userDelete .event2");
// deleteBtn.addEventListener("click", async (event)=>{
//   event.preventDefault()
//   const userId = document.querySelector(".userDelete .userId").value
//   console.log(userId, typeof(userId))
//   try {
//     const res = await fetch(`https://5966e44c806d7811.mokky.dev/users/${userId}`, {
//       method: "DELETE",
//       headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     }
//     })
//     if (res.ok){
//       console.log(`User with id=${userId} was deleted.`)
//       getUsers()
//     }
//     else {
//       console.log("Ошибка при удалении пользователя:", await res.json())
//     }
//   } catch(error) {
//     console.log("Ошибка сети:", error)
//   }
// });


// async function getUsers() {
//   const res = await fetch("https://5966e44c806d7811.mokky.dev/users", {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     }
//   });

//   const jsonData = await res.json();
//   console.log(jsonData);

//   jsonData.forEach((element, index) => {
//     const div = document.createElement("div");
//     div.className = "user-card";
//     const id = element.id;
//     const login = element["login"];
//     const username = element["username"];
//     const surname = element["surname"];
//     const email = element["email"];
//     const age = element["age"];
//     const password = element["password"];
//     div.innerHTML = `
//     <p><strong>ID:</strong> ${id}</p>
//     <p><strong>Логин:</strong> ${login}</p>
//     <p><strong>Имя:</strong> ${username}</p>
//     <p><strong>Фамилия:</strong> ${surname}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Возраст:</strong> ${age}</p>
//     <p><strong>Пароль:</strong> ${password}</p>`;
//     getUsersBtn.after(div);
//   });
// }

// const getUsersBtn = document.querySelector(".event1");
// getUsersBtn.addEventListener("click", (event) => {
//   event.preventDefault()
//   getUsers()
// });


const MOKKY_URL = "https://5966e44c806d7811.mokky.dev";


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

function highlightFields(...fields) {
    const existErrorFields = document.querySelectorAll(".input-error")
    existErrorFields.forEach((field) => {
        field.classList.remove("input-error")
    })
    fields.forEach((field) => {
        field.classList.add("input-error")
    })
}