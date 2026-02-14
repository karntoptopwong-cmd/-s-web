document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signupForm");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !password || !confirmPassword) {
      errorMsg.textContent = "กรุณากรอกข้อมูลให้ครบ";
      return;
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match";
      return;
    }

    // ✅ ใช้ users ตัวเดียวทั้งเว็บ
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
