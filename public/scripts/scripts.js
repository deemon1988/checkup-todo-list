import axios from '../../node_modules/axios/dist/esm/axios.js';
import { formatDate } from './utils.js';
import { TOKEN } from '../../config.js';

const userData = await getUser(TOKEN);
if (userData) createUserElement(userData);

// Функция создания блока с информацией о пользователе
function createUserElement(user) {
  const login = user.login;
  const username = user.username;
  const email = user.email;

  const greetingDiv = document.createElement('div');
  greetingDiv.className = 'greeting';
  const topMenu = document.querySelector('.top-menu .logo');
  greetingDiv.innerHTML = `<h3>Привет, ${login}!</h3>`;
  topMenu.after(greetingDiv);

  const profileBlock = document.querySelector('#profile-info .user-profile h3');
  profileBlock.before(`${formatDate()}`);
  const userInfo = document.createElement('div');
  userInfo.innerHTML = `
  <p><strong>Логин: </strong>${login}</p>
  <p><strong>Email: </strong>${email}</p>
  <p><strong>Имя: </strong>${username}</p>
  `;
  profileBlock.after(userInfo);
}

// Обработчик события полной загрузки страницы после авторизации,
// поиска значения в localStorage и отображения приветственного сообщения
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    const sucessfulBlock = document.getElementById('success-message');
    getUser(TOKEN).then((userData) => {
      sucessfulBlock.textContent = `Привет, ${userData.login}! Вы успешно авторизованы!`;
      sucessfulBlock.style.display = 'block';
      localStorage.removeItem('isLoggedIn');
      setTimeout(() => {
        sucessfulBlock.style.display = 'none';
      }, 5000);
    });
  }
});

// Обработчик события полной загрузки страницы после регистрации,
// поиска значения в localStorage и отображения приветственного сообщения
document.addEventListener('DOMContentLoaded', () => {
  const isRegister = localStorage.getItem('isRegister');
  if (isRegister === 'true') {
    const sucessfulBlock = document.getElementById('success-register');
    const userData = getUser(TOKEN);

    if (userData) {
      sucessfulBlock.textContent = `Поздравляем, ${userData.login}! Вы успешно зарегистрированы!`;
      sucessfulBlock.style.display = 'block';
      localStorage.removeItem('isRegister');
    }
  }
});

function getUser(token) {
  return axios
    .get('https://5966e44c806d7811.mokky.dev/auth_me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const userData = res.data;
      return userData;
    })
    .catch((error) => console.error(error));
}
