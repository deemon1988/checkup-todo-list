import { MOKKY_URL } from '../config.js';
import { TOKEN } from '../config.js';
import { createTaskCards } from './functions.js';

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
      console.log(data);
      data.forEach((task) => {
        createTaskCards(task);
      });
    });
}

// Функция для добавления новой задачи, на главной странице (для авторизованного пользователя)
export async function createTask(task) {
  // const token = localStorage.getItem('token');
  const res = await fetch(`${MOKKY_URL}/tasks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(task),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('Задача добавлена', data);
      // createTaskCards(task);
    })
    .catch((error) => {
      console.error(error);
      console.log('Ошибка при создании задачи:', res.json());
    });
}
