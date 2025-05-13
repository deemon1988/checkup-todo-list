// const MOKKY_URL = "https://5966e44c806d7811.mokky.dev";

// async function error_message(selector, message) {
//     console.log(message)
//     document.querySelector(".message-error")?.remove();
//     const pass_error = document.createElement("div")
//     pass_error.className = 'message-error'
//     const elem_selector = document.querySelector(selector)
//     pass_error.textContent = message
//     console.log(pass_error)
//     elem_selector.before(pass_error)
//     return
// }

// const auth_form = document.querySelector(".authorization");
// auth_form.addEventListener("submit", async function (event) {
//     const auth_email = document.querySelector("#auth_email").value;
//     const auth_pass = document.querySelector("#auth_pass").value;
//     console.log(auth_email, auth_pass);
//     event.preventDefault();
//     try {
//         const res = await fetch(`${MOKKY_URL}/auth`, {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: auth_email,
//                 password: auth_pass
//             })
//         });
//         if (res.ok) {
//             const jsonData = await res.json();
//             console.log(jsonData);
//             console.log("Succesfuly enter");
//             localStorage.setItem('token', jsonData.token);
//             window.location.href = '../public/index.html';
//         }
//         else {
//             const error = await res.json();
//             console.error("Ошибка авторизации:", error);
//             // alert("Ошибка авторизации: " + error.message);
//             const message = error.statusCode===401 ? "Неверное имя пользователя или пароль" : error.message
//             error_message(".auth_form h2", message)
//         }


//     } catch (error) {
//         console.log("Ошибка сети:", error);
//         alert("Ошибка сети: " + error.message);
//     }
// });


// Форма авторизации
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