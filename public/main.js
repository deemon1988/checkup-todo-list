const MOKKY_URL = "https://5966e44c806d7811.mokky.dev";

const token = localStorage.getItem('token');

if (!token) {
    window.location.href = "../auth/auth.html"
}

const exitBtn = document.querySelector("#exit")
exitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    localStorage.removeItem('token')
    window.location.href = "../auth/auth.html"
})


const task = document.getElementById("add-task")
async function createTask() {
    const token = localStorage.getItem("token")
    try {
        const res = await fetch(`${MOKKY_URL}/tasks`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                content: task.value
            })
        })
        // .then(resp => resp.json())
        // .then(json => console.log(json))

        if (res.ok) {
            console.log("Задача добавлена")
            getAllTasks()
        } else {
            console.log("Ошибка при создании задачи:", await res.json())
        }

    } catch (error) {
        console.log("Ошибка:", error.message)
    }

}

const form = document.getElementById('task-form');
form.addEventListener("submit", (event) => {
    event.preventDefault()
    createTask()
    task.value = ''
})

getAllTasks()

async function getAllTasks() {
    
    let existingTaskIds = JSON.parse(localStorage.getItem("existingTaskIds")) || [];
    const token = localStorage.getItem("token")
    try {
        const res = await fetch(`${MOKKY_URL}/tasks`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        if (!res.ok) {
            throw new Error(`Ошибка при получении задач: ${res.status}`);
        }
        jsonData = await res.json()
        console.log(jsonData)

        // Предикатная функция проверяет какой задачи нет в общем списке, чтобы добавить на страницу
        const newTasks = jsonData.filter(
            (task) => !existingTaskIds.includes(task.id)
        );

        if (newTasks.length > 0) {
            // Добавляем новые задачи на страницу
            newTasks.forEach((task) => {
                const { id, content } = task;
                existingTaskIds.push(id);
                localStorage.setItem("existingTaskIds", JSON.stringify(existingTaskIds));

                const div = document.createElement("div");
                div.className = "user-card";
                div.innerHTML = `
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Описание:</strong> ${content}</p>`;
                const divCreate = document.getElementById("tasks-list")
                divCreate.after(div);
            });
        }

        else {
            jsonData.forEach((task) => {
                const { id, content } = task;
                existingTaskIds.push(id);
                const div = document.createElement("div");
                div.className = "user-card";
                div.innerHTML = `
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Описание:</strong> ${content}</p>`;
                const divCreate = document.getElementById("tasks-list")
                divCreate.after(div);
            });
        }

    } catch (error) {
        console.log("Ошибка:", error.message)
    }
}

const userTasks = document.getElementById("user-tasks")
userTasks.addEventListener("click", (event) => {
    event.preventDefault()
    getAllTasks()

})