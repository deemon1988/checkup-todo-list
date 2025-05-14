// const deleteBtn = document.querySelector(".userDelete .event2");
// deleteBtn.addEventListener("click", async (event)=>{
//   event.preventDefault()
//   const userId = document.querySelector(".userDelete .userId").value
//   console.log(userId, typeof(userId))
//   try {
//     const res = await fetch(`https://5966e44c806d7811.mokky.dev/users/${userId}`, {
//       method: "DELETE",
//       headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     }
//     })
//     if (res.ok){
//       console.log(`User with id=${userId} was deleted.`)
//       getUsers()
//     }
//     else {
//       console.log("Ошибка при удалении пользователя:", await res.json())
//     }
//   } catch(error) {
//     console.log("Ошибка сети:", error)
//   }
// });


// async function getUsers() {
//   const res = await fetch("https://5966e44c806d7811.mokky.dev/users", {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     }
//   });

//   const jsonData = await res.json();
//   console.log(jsonData);

//   jsonData.forEach((element, index) => {
//     const div = document.createElement("div");
//     div.className = "user-card";
//     const id = element.id;
//     const login = element["login"];
//     const username = element["username"];
//     const surname = element["surname"];
//     const email = element["email"];
//     const age = element["age"];
//     const password = element["password"];
//     div.innerHTML = `
//     <p><strong>ID:</strong> ${id}</p>
//     <p><strong>Логин:</strong> ${login}</p>
//     <p><strong>Имя:</strong> ${username}</p>
//     <p><strong>Фамилия:</strong> ${surname}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Возраст:</strong> ${age}</p>
//     <p><strong>Пароль:</strong> ${password}</p>`;
//     getUsersBtn.after(div);
//   });
// }

// const getUsersBtn = document.querySelector(".event1");
// getUsersBtn.addEventListener("click", (event) => {
//   event.preventDefault()
//   getUsers()
// });