import { createTaskCards } from '../public/scripts/main.js';
const MOKKY_URL = 'https://5966e44c806d7811.mokky.dev';

// Функция для получения всех задач пользователя (требует доработки для конкретного пользователя)
export async function getAllTasks() {
  let existingTaskIds =
    JSON.parse(localStorage.getItem('existingTaskIds')) || [];
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${MOKKY_URL}/tasks`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Ошибка при получении задач: ${res.status}`);
    }
    const jsonData = await res.json();
    console.log('Задачи пользователя:', jsonData);

    // Предикатная функция проверяет какой задачи нет в общем списке, чтобы добавить на страницу
    const newTasks = jsonData.filter(
      (task) => !existingTaskIds.includes(task.id),
    );

    if (newTasks.length > 0) {
      // Добавляем новые задачи на страницу
      newTasks.forEach((task) => {
        const { id, content } = task;
        existingTaskIds.push(id);
        localStorage.setItem(
          'existingTaskIds',
          JSON.stringify(existingTaskIds),
        );

        const div = document.createElement('div');
        div.className = 'user-card';
        div.innerHTML = `
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Описание:</strong> ${content}</p>
                    <button class='editTask' data-id="${id}>Редактировать задачу</button>
                    <button id='deleteTask' data-id="${id}">Удалить задачу</button>`;
        const divCreate = document.getElementById('tasks-list');
        divCreate.after(div);
      });
    } else {
      jsonData.forEach((task) => {
        const { id, content } = task;
        existingTaskIds.push(id);
        const div = document.createElement('div');
        div.className = 'user-card';
        div.innerHTML = `
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Описание:</strong> ${content}</p>
                    <button class='editTask'data-id="${id}">Редактировать задачу</button>
                    <button id='deleteTask'data-id="${id}">Удалить задачу</button>`;
        const divCreate = document.getElementById('tasks-list');
        divCreate.after(div);
        const editBtn = document.querySelector('.editTask');
        editBtn.addEventListener('click', function () {
          const taskId = this.dataset.id;
          console.log(`Редактрирование задачи с id = ${taskId}`);
          const editForm = document.getElementById('edit-form');
          editForm.style.display = 'block';
          console.log(editForm);
          const title = editForm.querySelector('#title-task');
          title.value = content;
        });

        document
          .getElementById('deleteTask')
          .addEventListener('click', function () {
            const taskId = this.dataset.id;
            fetch(`${MOKKY_URL}/tasks/${taskId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${TOKEN}`,
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log('Задача успешно удалена');
                }
              })
              .catch((error) => console.error(error));
            console.log(this.closest('.user-card').remove());
          });
      });
    }
  } catch (error) {
    console.log('Ошибка:', error.message);
  }
}

function successTaskAdded() {
  const div = document.createElement('div');
  div.className = 'success';
  div.innerHTML = `
  <p>Задача успешно создана!</p>
  `;
  document.body.before(div);
  setTimeout(() => {
    div.style.display = 'none';
  }, 5000);
}

// Обработчик события "Добавить задачу"
const form = document.getElementById('task-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const decription = form.querySelector('#add-task').value;
  createTask(decription);
  form.querySelector('#add-task').value = '';
  form.querySelector('#title-task').value = '';
  successTaskAdded();
});

// Функция для добавления новой задачи, на главной странице (для авторизованного пользователя)

async function createTask(description) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${MOKKY_URL}/tasks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: description,
    }),
  })
    .then((resp) => resp.json())
    .then((task) => {
      console.log('Задача добавлена');
      createTaskCards(task);
    })
    .catch((error) => {
      console.error(error);
      console.log('Ошибка при создании задачи:', res.json());
    });
}
