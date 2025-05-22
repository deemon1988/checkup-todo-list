import axios from '../../node_modules/axios/dist/esm/axios.js';
import { formatDate } from './utils.js';
const token = localStorage.getItem('token');

async function getUserInfo(token) {
  const res = await fetch('https://5966e44c806d7811.mokky.dev/auth_me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => resp.json())
    .then((json) => console.log(json));

  const json = await res.json();
  console.log(json);
  return json;
}

axios
  .get('https://5966e44c806d7811.mokky.dev/auth_me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    const userData = res.data;
    console.log(userData);

    createUserElement(userData);
  });

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

axios.get('https://swapi-api.hbtn.io/api/films/1', {}).then((res) => {
  const jsonData = res.data;
  console.log(jsonData);
});

document.addEventListener('DOMContentLoaded', () => {
  // const token = localStorage.getItem("token")
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    const sucessfulBlock = document.getElementById('success-message');
    getUser(token).then((userData) => {
      sucessfulBlock.textContent = `Привет, ${userData.login}! Вы успешно авторизованы!`;
      sucessfulBlock.style.display = 'block';
      localStorage.removeItem('isLoggedIn');
      setTimeout(() => {
        sucessfulBlock.style.display = 'none';
      }, 5000);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const isRegister = localStorage.getItem('isRegister');
  if (isRegister === 'true') {
    const sucessfulBlock = document.getElementById('success-register');
    getUser(token).then((userData) => {
      sucessfulBlock.textContent = `Поздравляем, ${userData.login}! Вы успешно зарегистрированы!`;
      sucessfulBlock.style.display = 'block';
      localStorage.removeItem('isRegister');
    });
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
      console.log(userData);
      return userData;
    });
}
