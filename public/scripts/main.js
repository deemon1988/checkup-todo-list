const MOKKY_URL = 'https://5966e44c806d7811.mokky.dev';
const TOKEN = localStorage.getItem('token');

// Получение токена из local storage
const token = localStorage.getItem('token');

// Перенаправление на страницу авторизации если нет токена авторизации
if (!token) {
  window.location.href = '../auth/auth.html';
}

// Обработчик кнопки "Выйти". Удаление токена и перенаправление на страницу авторизации
const exitBtn = document.getElementById('exit');
exitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('existingTaskIds');
  window.location.href = '../auth/auth.html';
});

function sendUpdateTask(e, targetTask) {
  e.preventDefault();
  console.log(e.target);
  if (e.type === 'click') {
    document.querySelector('.edit-form').style.display = 'none';
    return;
  }
  const taskId = targetTask.dataset.id;
  const taskContent = document.querySelector('#edit-form textarea').value;
  fetch(`${MOKKY_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      content: `${taskContent}`,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  document.getElementById('edit-form').style.display = 'none';

  targetTask.closest('.user-cards').querySelector('.desc').innerHTML =
    `<strong>Описание:</strong> ${taskContent}`;
}

function editTask(targetTask) {
  const editForm = document.querySelector('.edit-form');
  editForm.style.display = 'block';
  editForm.querySelector('h3').textContent =
    `Задача ID: ${targetTask.dataset.id}`;
  document.querySelector('.edit-form textarea').value =
    targetTask.dataset.content;
  editForm.addEventListener('submit', (e) => sendUpdateTask(e, targetTask));
  const cancelBtn = editForm.querySelector('.cancelBtn');
  cancelBtn.addEventListener('click', (e) => sendUpdateTask(e, targetTask));
}

export function createTaskCards(task) {
  const userCard = document.createElement('div');
  userCard.className = 'user-cards';
  userCard.innerHTML = `
      <p><strong>ID:</strong> ${task.id}</p>
      <p class='desc'><strong>Описание:</strong> ${task.content}</p>
      <button class='editTask' data-id="${task.id}" data-content="${task.content}"><img src="../public/images/icon-edit.png" alt="Edit" width="20" height="20"></button>
      <button class='deleteTask' data-id="${task.id}"><img src="../public/images/delete-button.png" alt="Delete" width="20" height="20"></button>
      <button class='someBtn' data-prop="123">Тестовая кнопка</button>
      `;
  document.querySelector('.card-container').appendChild(userCard);
}

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

      console.log(
        'Задачи на странице:',
        document.querySelectorAll('.user-cards'),
      );
    });
}
getTasks();

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.card-container');
  container.addEventListener('click', function (e) {
    const target = e.target;
    if (target) {
      if (target.closest('.editTask')) {
        editTask(target);
      } else if (target.closest('.deleteTask')) {
        if (confirm(`Задача ${target.dataset.id} будет удалена`))
          deleteTask(target);
      }
    }
  });
});

function deleteTask(targetTask) {
  const taskId = targetTask.dataset.id;
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
