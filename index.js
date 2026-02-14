document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");
  const mouseLight = document.getElementById("mouse-light");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      errorMsg.textContent = "ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
      return;
    }

    createSession(username);
    location.href = "loggedin.html";
  });

  // mouse light
  document.addEventListener("mousemove", (e) => {
    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255,255,255,0.2),
        rgba(0,0,0,0.6) 40%
      )
    `;
  });
});
