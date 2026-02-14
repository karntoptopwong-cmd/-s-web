document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("errorMsg");

  if (!loginForm) {
    console.error("loginForm not found");
    return;
  }

  loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    window.location.href = "loggedin.html";
});

});

