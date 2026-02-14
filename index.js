// index.js
loginForm.addEventListener("submit", async e => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  const res = await fetch("https://your-backend/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    errorMsg.textContent = "Login failed";
    return;
  }

  const data = await res.json();

  localStorage.setItem("session", JSON.stringify({
    username: data.username,
    token: data.token,
    expireAt: Date.now() + 24 * 60 * 60 * 1000
  }));

  location.href = "loggedin.html";
});
