document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอก username และ password";
      return;
    }

    // 🔹 ตัวอย่างตรวจสอบแบบง่าย (localStorage / mock)
    const storedPassword = localStorage.getItem(`user_${username}`);

    if (storedPassword !== password) {
      errorMsg.textContent = "Username หรือ Password ไม่ถูกต้อง";
      return;
    }

    // ✅ สร้าง session (หน้าที่ของหน้า login)
    const session = {
      username: username,
      loginAt: Date.now()
      // จะเพิ่ม expireAt ทีหลังก็ได้
    };

    localStorage.setItem("session", JSON.stringify(session));
    localStorage.setItem("currentUser", username);

    // 👉 ไปหน้า logged in
    window.location.href = "loggedin.html";
  });

});
