document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("errorMsg");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอกข้อมูล";
      return;
    }

    localStorage.setItem("session", JSON.stringify({
      username,
      expireAt: Date.now() + 24 * 60 * 60 * 1000
    }));

    location.href = "loggedin.html";
  });
});
