document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
      errorMsg.textContent = "Passwords do not match";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username === username)) {
      errorMsg.textContent = "Username already exists";
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    location.href = "index.html";
  });
});
