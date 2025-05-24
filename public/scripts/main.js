import { taskPatch } from './fetch.js';
import { getPriority } from './utils.js';
import { MOKKY_URL } from '../../config.js';
import { TOKEN } from '../../config.js';

// Обработчик кнопки "Выйти". Удаление токена и перенаправление на страницу авторизации
const exitBtn = document.getElementById('exit');
exitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('existingTaskIds');
  window.location.href = '../auth/auth.html';
});

// Функция отправки запроса на обновление задачи и обновления содержимого карточки на странице
function sendUpdateTask(e, targetTask) {
  e.preventDefault();
  const taskId = targetTask.closest('.user-cards').dataset.id;
  const taskContent = document.querySelector('.edit-form textarea').value;
  const taskTitle = document.querySelector(
    '.edit-form input[name="title-task"]',
  ).value;
  fetch(`${MOKKY_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      content: `${taskContent}`,
      title: `${taskTitle}`,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  document.querySelector('.edit-form').style.display = 'none';

  targetTask.closest('.user-cards').querySelector('.desc').innerHTML =
    `<strong>Описание:</strong> ${taskContent}`;
  targetTask.closest('.user-cards').querySelector('.title').innerHTML =
    `<strong>Название:</strong> ${taskTitle}`;
}

// Функция редактированя задачи
function editTask(targetTask) {
  const editForm = document.querySelector('.edit-form');
  targetTask.closest('.user-cards').appendChild(editForm);
  editForm.style.display = 'flex';
  editForm.querySelector('h3').textContent =
    `Задача ID: ${targetTask.dataset.id}`;
  document.querySelector('.edit-form input[name="title-task"]').value =
    targetTask.closest('.user-cards').dataset.title;
  document.querySelector('.edit-form textarea').value =
    targetTask.closest('.editTask').dataset.content;
  editForm.addEventListener('submit', (e) => sendUpdateTask(e, targetTask));
  const closeBtn = editForm.querySelector('.close-btn');
  closeBtn.addEventListener('click', (e) => {
    if (e.type === 'click') {
      document.querySelector('.edit-form').style.display = 'none';
      return;
    }
  });
}

// Функция создания карточки из объекта задача и отрисовка на странице
export function createTaskCards(task) {
  const userCard = document.createElement('div');
  userCard.className = 'user-cards';
  userCard.dataset.id = task.id;
  userCard.dataset.title = task.title;
  const isTaskDone = task.isCompeted
    ? `<img src='../public/images/task-done.png' width='30px'>`
    : `<img src='../public/images/task-not-done.png'  width='30px'>`;
  const priority = getPriority(task.priority);
  userCard.innerHTML = `
      <p><strong>ID: (№)</strong> ${task.id}</p>
      <p class='title'><strong>Название:</strong> ${task.title} </p>
      <p class='desc'><strong>Описание:</strong> ${task.desс || 'Нет описания'} </p>
      <div><strong>Создана:</strong> ${task.created}</div>
      <div class='isDone' data-done=${task.isCompleted}>${isTaskDone}</div>
      <div class='priority' data-priority=${task.priority}><img src="${priority}" width="100px;"</div>
      <button class='editTask' data-id="${task.id}" data-content="${task.desc}"><img src="../public/images/icon-edit.png" alt="Edit" width="20" height="20"></button>
      <button class='deleteTask' data-id="${task.id}"><img src="../public/images/delete-button.png" alt="Delete" width="20" height="20"></button>
      `;
  document.querySelector('.card-container').appendChild(userCard);
}

// Функция получение всех задач и передача каждой задачи в функцию создания карточек на странице
export function getTasks() {
  fetch(`${MOKKY_URL}/tasks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((task) => {
        createTaskCards(task);
      });
    });
}

// Вызов функция получения всех задач
getTasks();

//Обработчик событий на контейнере с карточками задач
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.card-container');
  container.addEventListener('click', function (e) {
    const target = e.target;
    const taskId = target.closest('.user-cards').dataset.id;
    if (target) {
      if (target.closest('.editTask')) {
        editTask(target);
      } else if (target.closest('.deleteTask')) {
        if (confirm(`Задача ${target.dataset.id} будет удалена`))
          deleteTask(target);
      } else if (target.closest('.isDone img')) {
        if (target.closest('.isDone').dataset.done == 'true') {
          taskPatch(TOKEN, taskId, { isCompleted: false });
          target.closest('.isDone').dataset.done = 'false';
          target.closest('.isDone').innerHTML =
            `<img src='../public/images/task-not-done.png' width='30px'>`;
        } else if (target.closest('.isDone').dataset.done == 'false') {
          taskPatch(TOKEN, taskId, { isCompleted: true });
          target.closest('.isDone').dataset.done = 'true';
          target.closest('.isDone').innerHTML =
            `<img src='../public/images/task-done.png' width='30px'>`;
        }
      }
    }
  });
});

// Функция отправки запроса для удаления задачи
function deleteTask(targetTask) {
  const taskId = targetTask.closest('.deleteTask').dataset.id;

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
  targetTask.closest('.user-cards').remove();
}
