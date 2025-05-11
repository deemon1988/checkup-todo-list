// import { sayHello as say, helloUser } from "./modules/sayHello.js";
// import sumNumber from "./modules/sum.js";

// sumNumber(15, 5);

// export let userName = "Tom";
// say("Alex");
// say()
// helloUser();

// let array = ['apple', 'banana', 'orange', 'banana'];
// console.log(array);

// var new_array = array.filter((item, index) =>
//     array.indexOf(item) === index);
// console.log(new_array);

// const new_str = new_array.join(', ');
// console.log(new_str);

var count = 1;
function asd() {
    console.log(123);
};

const test = function () {
    console.log(123);
};


const test2 = () => {
    console.log(321);
};

test2();

console.log(count);
console.log(window.count);

const obj = {
    name: "Bob",
    say: function(...data){
        console.log(this.name);
        console.log(this);
        console.log(data);
    },
    say2: () => {
        console.log(this.name);
    },
};

obj.say();
obj.say2();
obj.say.apply({name: "Bob"}, [1,2,3]);
obj.say.call({user2: "Mike"}, 1,23,3);
const copy = obj.say.bind({user: "Bob"});
console.log(copy);
copy();


localStorage.clear();
let tasks_list = ['Complete Homework', `slepp`]
localStorage.setItem("tasks", JSON.stringify(tasks_list));

function showTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(typeof(tasks));    
    if (tasks.length === 0) {
        alert(`No tasks`);
    }
    else {
        let tasks_str =``;
        tasks.forEach((name, index) => {
            tasks_str += `${index+1}. ${name} \n`
        }); 
        alert(tasks_str);
    }
}

function addTask() {
    const new_task = prompt(`Input new task`);
    if (!new_task) {
        alert(`You not input task!`);
        return;
    }
    const tasks_list = JSON.parse(localStorage.getItem("tasks"));
    tasks_list.push(new_task);
    localStorage.setItem("tasks", JSON.stringify(tasks_list));
    console.log(tasks_list);
    showTasks();
}


// addTask();

function deleteTask() {
    if (tasks.length === 0){
        alert("У вас нет задач");
        return
    }
    const task_number = prompt(`Input task number for delete`);
    if (!task_number){
        alert(`You not input number task!`);
        return;
    }
    if (task_number <= 0 || task_number > tasks.length || isNaN(task_number)){
        alert(`Incorrect task number - ${task_number}`);
        return;
    }
    // debugger;
    const deleted_task = tasks[task_number - 1]
    tasks.splice(task_number - 1, 1);
    alert(`Yoy delete - ${task_number}. ${deleted_task}`);
    showTasks();
}

// deleteTask();

function main(){
    let choice = null;
    do {
        
        choice = +prompt("Выберите действие:\n1. Показать все задачи\n2. Добавить задачу\n3. Удалить задачу\n0. Выход из программы");
        switch (choice) {
            case 0:
                alert("Выход из программы");
                break;
            case 1:
                showTasks();
                break;
            case 2:
                addTask();
                break;
            case 3:
                deleteTask();
                break;
            default:
                alert("Некорректный выбор");
        }
    } while (choice !== 0);
}

// main();


function storage(){
    let task = null;
    let storage_tasks = [];
    localStorage.clear();
    do {
        task = prompt("Введите задачу");
        if(task!==null){
            tasks.push(task);
            localStorage.setItem(`tasks`, JSON.stringify(tasks));
        }
    } while(task !== null);

    const all_tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(all_tasks);

    const array = [
        {id: 1, task: "task1"},
        {id: 2, task: "task2"},
    ];

    sessionStorage.setItem("list", JSON.stringify(array));
    const list = JSON.parse(sessionStorage.getItem('list'));
    console.log(list);
}


const list_names = ['Bob', 'Alex', 'Mari', 'Mike'];
const div_child_list = Array.from(document.querySelectorAll(".child"));
div_child_list.map((div, index) => {
    const name = list_names[index];
    div.innerHTML = `<h3>${name}:</h3> <p>Description</p>`;
});


list_names.forEach((name)=>{
    const div = document.createElement("div");
    div.className = "user-card";
    div.style.textAlign = "center";
    const h2 = document.createElement("h3");
    const p = document.createElement("p");
    h2.textContent = name;
    p.textContent = "Описание";
    div.append(h2, p);
    document.body.appendChild(div);
})

const list_objs = [
    {
        "name": 'Bob',
        "desc": 'Описание',
        "age": 18
    },
    {
        "name": 'Alex',
        "desc": 'Описание',
        "age": 19
    },
    {
        "name": 'Mari',
        "desc": 'Описание',
        "age": 20
    },
    {
        "name": 'Mike',
        "desc": 'Описание',
        "age": 21
    }
];

list_objs.forEach((item)=>{
    const div = document.createElement("div");
    div.className = "user-card";
    div.innerHTML = `
    <h3>${item.name}</h3>
    <p>${item.desc}</p>
    <p>Ваш возраст: ${item.age}</p>
    `;
    document.body.appendChild(div);
});

const btn = document.querySelector(".event1");
btn.onclick = function () {
    // alert("Click on the button");
    const textarea_2 = document.querySelector(".textarea-2");
    textarea_2.classList.toggle("hidden");
    const div = document.querySelector(".textarea-1");
    if (!div) {
        const div = document.createElement("div");
        div.className = "textarea-1";
        div.innerHTML = `
        <h3>Button 1 textarea</h3>
        <textarea cols="50" rows="5" name="comment" id="comment"></textarea>`;
        btn.after(div);
    };
};

const btn2 = document.querySelector(".event2");
btn2.onclick = function () {
    // alert("Click on the button 2");
    const textarea_1 = document.querySelector(".textarea-1");
    const div = document.createElement("div");
    div.className = "textarea-2";
    div.innerHTML = `
    <h3>Button 2 textarea</h3>
    <textarea cols="50" rows="5" name="comment" id="comment"></textarea>`;
    btn2.after(div);
};

const btn3 = document.querySelector(".event3");
const input = document.querySelector(".test-input");
// btn3.addEventListener("click", () => {
//     console.dir(input.value);
//     // div.textContent = "Hi";
//     // btn3.after(div);
//     alert(`In input text - ${input.value}`);
// });

window.addEventListener("scroll", () => {
    console.log("You scroll page");
})

console.dir(input);

input.addEventListener("input", (event) => {
    console.log(event.target.value);
})

input.addEventListener("focus", () => {
    console.log("focus");
});


input.addEventListener("blur", () => {
    console.log("blur");
});

const input2 = document.querySelector(".test-input2");
input2.addEventListener('input', (event) => {
    console.dir(event.target.checked);
});

btn3.addEventListener('dblclick', ()=>{
    const data = input.value;
    const div = document.createElement("div");
    div.className = "user-cart";
    div.innerHTML = `<h3> ${data} </h2>`;
    btn3.after(div);
    input.value = '';
});

function createBudget() {
    let balance = 0;

    return {
        add(amount) {
            balance += amount;
        },
        buy(amount) {
            balance -= amount;
        },
        getBalance() {
            return balance;
        }
    };
}

const myBudget = createBudget();
console.log(`Пополнение: ${myBudget.add(400)}`);
console.log(`Покупка: ${myBudget.buy(150)}`);
console.log(myBudget.getBalance());