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
