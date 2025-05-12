const MOKKY_URL = "https://5966e44c806d7811.mokky.dev";


async function passValidation(pass, confirmPass) {
    if (pass !== confirmPass) {
        return false;
    }
    const requirements = [
        // { regex: /.{8,}/, index: 0 }, // Минимум 8 символов
        { regex: /[0-9]/, index: 1 }, // Содержит хотя бы одну цифру
        { regex: /[a-zа-я]/, index: 2 }, // Содержит хотя бы одну строчную букву
        { regex: /[A-ZА-Я]/, index: 3 }, // Содержит хотя бы одну прописную букву
    ];
    for (const requirement of requirements) {
        if (!requirement.regex.test(pass)) {
            console.log("Индекс:" ,requirement.index)
            return {"res": false, "message": errorMessage(requirement.index)}; 
        }
    }
    return {"res": true, "message": "Успешная регистрация"}; 
}

function errorMessage(requirementIndex){
switch (requirementIndex) {
    case 1:
        return "Пароль должен содержать хотя бы одну цифру"
    case 2:
        return "Пароль должен содержать хотя бы одну букву в нижнем и верхнем регистре"
    case 3:
        return "Пароль должен содержать хотя бы одну букву в верхнем регистре"
}
}



const reg_form = document.querySelector(".registration");

reg_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const login = reg_form.querySelector("#login").value;
    // const username = reg_form.querySelector("#username").value;
    // const surname = reg_form.querySelector("#user_surname").value;
    const email = reg_form.querySelector("#user_email").value;
    // const age = reg_form.querySelector("#age").value;
    const password = reg_form.querySelector("#password").value;
    const confirmPassword = reg_form.querySelector('#reg_pass_confirm').value

    required_pass = await passValidation(password, confirmPassword)
    console.log(required_pass)

    const existMessage = document.querySelector('.pass-message-error')
    if(existMessage){
        existMessage.remove()
    }

    if(!required_pass.res){
        console.log("Пароли не соответствуют требованиям")
        const pass_error = document.createElement("div")
        pass_error.className = 'pass-message-error'
        const div_form = document.querySelector(".reg_form h2")
        pass_error.textContent = required_pass.message
        console.log(pass_error)
        div_form.before(pass_error)
        return
    }

   

    const formData = {
        login: login,
        // username: username,
        // surname: surname,
        email: email,
        // age: age,
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
            const jsonData = await res.json();
            console.log("Регистрация успешна:", jsonData);
            localStorage.setItem('token', jsonData.token);
            window.location.href = '../public/index.html';
            // alert("Регистрация успешна!");
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