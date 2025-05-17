import axios from '../../node_modules/axios/dist/esm/axios.js';

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
  const userInfo = [login, username, email];
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.innerHTML = `<h3>Привет, ${login}!</h3>`;
  const div_profile = document.createElement('div');
  div_profile.innerHTML = '<strong>Профиль пользователя:</strong>';
  div_profile.classList.add('user-profile');
  div.appendChild(p);
  userInfo.forEach((elem) => {
    if (elem) {
      const p = document.createElement('p');
      p.textContent = `${elem}!`;
      div_profile.appendChild(p);
    }
  });

  const header = document.getElementById('header');
  header.after(div);
  div.after(div_profile);
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
