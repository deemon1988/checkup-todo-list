const MOKKY_URL = 'https://5966e44c806d7811.mokky.dev';

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
