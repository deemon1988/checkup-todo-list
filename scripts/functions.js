import { getPriority } from '../public/scripts/utils.js';

// Функция создания карточки из объекта задача и отрисовка на странице
export function createTaskCards(task) {
  const listItem = document.createElement('li');
  listItem.className = 'list-item';
  listItem.dataset.id = task.id;
  listItem.dataset.important = task.important;
  listItem.dataset.labels = task.labels;
  listItem.dataset.date = task.date;
  const isDone = task.isDone
    ? `<img src='../public/images/task-done.png' width='30px; height='30px;'>`
    : `<img src='../public/images/task-not-done.png'  width='30px; height='30px;'>`;
  const priority = getPriority(task.priority);
  listItem.innerHTML = `
    <div class="task">
        <div class="task-status">
            ${isDone}
        </div>
        <div class="task-title">
        <a href> ${task.name} </a>
        ${task.important ? `<img src="../public/images/icon-alert.png" width="30px;">` : ''}
        </div>
        <div class="action">
            <button class='editTask'><img src="../public/images/icon-edit.png" alt="Edit" width="20px;" height="20px;"></button>
            <button class='deleteTask'><img src="../public/images/delete-button.png" alt="Delete" width="20px;" height="20px;"></button>
        </div>
    </div>
    <div class="row-bottom">
        <div class="created"><strong>Создана:</strong> ${task.created}</div>
         ${task.date ? `<div class="date"><img src="../public/images/icon-time.png" alt="Time" width="20px;">Время выполнения: ${task.date}</div>` : ''}
        <div class='labels'>${(task.labels ?? []).map((label) => `<img src="../public/images/icon-label.png" alt="Label" width="20px;"><span>${label.charAt(0).toUpperCase() + label.slice(1)}</span>`).join('\n  ')}</div>
    </div>
      `;
  document.querySelector('.list-menu').appendChild(listItem);
}
