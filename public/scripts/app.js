import { highlightFields } from './utils.js';
import { error_message } from './utils.js';
import { MOKKY_URL } from '../../config.js';

// Функция для отправки запросов авторизации и регистрации
export async function sendFormRequest(endpoint, formData) {
  try {
    const res = await fetch(`${MOKKY_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const jsonData = await res.json();
      localStorage.setItem('token', jsonData.token);
      if (endpoint === 'auth') {
        localStorage.setItem('isLoggedIn', 'true');
      } else if (endpoint === 'register') {
        localStorage.setItem('isRegister', 'true');
      }
      window.location.href = '../public/index.html';
    } else {
      const error = await res.json();
      const selector =
        endpoint === 'register' ? '.reg_form h2' : '.auth_form h2';
      formErrorsHandler(endpoint, selector, error);
      return;
    }
  } catch (error) {
    console.log('Ошибка сети:', error);
    alert('Ошибка сети: ' + error.message);
  }
}

// Функция обработки ошибок при авторизации и регистрации
function formErrorsHandler(endpoint, messageSelector, error) {
  switch (endpoint) {
    case 'register': {
      console.error('Ошибка регистрации:', error);
      const reg_message =
        error.statusCode === 401
          ? 'Пользовтель с таким email уже зарегистрирован'
          : error.message;
      error_message(messageSelector, reg_message);
      const emailField = document.getElementById('user_email');
      highlightFields(emailField);
      break;
    }
    case 'auth': {
      console.error('Ошибка авторизации:', error);
      const message =
        error.statusCode === 401
          ? 'Неверное имя пользователя или пароль'
          : error.message;
      error_message(messageSelector, message);
      break;
    }
    default:
      console.error('Ошибка:', error);
      error_message(messageSelector, error.message);
      alert('Ошибка: ' + error.message);
      break;
  }
}
