import { MOKKY_URL } from '../../config.js';

// Функция отправки запроса на частичное обновление задачи
export function taskPatch(token, taskId, ...updatedValues) {
  fetch(`${MOKKY_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...updatedValues[0],
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
