const res = await fetch("https://9303851354d5e8f0.mokky.dev/register", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    fullName: "Вася Пупкин",
    email: "user@test.com",
    password: "123456"
  })
});