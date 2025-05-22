// Функция для выделения полей с ошибками
export function highlightFields(...fields) {
  const existErrorFields = document.querySelectorAll('.input-error');
  existErrorFields.forEach((field) => {
    field.classList.remove('input-error');
  });
  fields.forEach((field) => {
    field.classList.add('input-error');
  });
}

// Функция добавления ошибки на страницу

export async function error_message(selector, message) {
  console.log(message);
  document.querySelector('.message-error')?.remove();
  const pass_error = document.createElement('div');
  pass_error.className = 'message-error';
  const elem_selector = document.querySelector(selector);
  pass_error.textContent = message;
  console.log(pass_error);
  elem_selector.before(pass_error);
}

export function formatDate() {
  const date = new Date();

  const options = {
    weekday: 'long', // полное название дня недели
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('ru-RU', options);
  const formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: undefined, // исключаем секунды
  });

  return `${formattedDate.replace(' г.', '')}, ${formattedTime}`;
}

export function getPriority(priority) {
  switch (priority) {
    case 1:
      return '../public/images/priority1.png';
    case 2:
      return '../public/images/priority2.png';
    case 3:
      return '../public/images/priority3.png';
    case 4:
      return '../public/images/priority4.png';
    case 5:
      return '../public/images/priority5.png';
  }
}
