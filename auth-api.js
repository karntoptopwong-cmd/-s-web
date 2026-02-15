// auth-api.js

export function register(user, pass) {
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user]) {
    return { error: "user exists" };
  }

  users[user] = { password: pass, points: 0 };
  localStorage.setItem("users", JSON.stringify(users));

  return { message: "registered" };
}

export function login(user, pass) {
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[user] || users[user].password !== pass) {
    return { error: "invalid login" };
  }

  const token = Math.random().toString(36).substring(2);

  localStorage.setItem("session", JSON.stringify({
    username: user,
    token: token,
    expireAt: Date.now() + 86400000
  }));

  return { token, user };
}
