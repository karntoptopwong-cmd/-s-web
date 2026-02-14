document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอกข้อมูลให้ครบ";
      return;
    }

    const users = getUsers();

    const exists = users.find(u => u.username === username);
    if (exists) {
      errorMsg.textContent = "ชื่อผู้ใช้นี้ถูกใช้แล้ว";
      return;
    }

    users.push({ username, password });
    saveUsers(users);

    window.location.href = "index.html";
  });
});
