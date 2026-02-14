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

    // 🔹 โหลด users ทั้งหมด
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // ❌ ไม่มีบัญชีนี้
    if (!users[username]) {
      errorMsg.textContent = "ไม่มีบัญชีผู้ใช้นี้";
      return;
    }

    // ❌ รหัสผ่านผิด
    if (users[username].password !== password) {
      errorMsg.textContent = "รหัสผ่านไม่ถูกต้อง";
      return;
    }

    // ✅ ผ่านจริง → ค่อยสร้าง session
    localStorage.setItem("session", JSON.stringify({
      username,
      expireAt: Date.now() + 24 * 60 * 60 * 1000
    }));

    location.href = "loggedin.html";
  });
});
