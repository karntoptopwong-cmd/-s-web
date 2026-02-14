document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // 🔥 ถ้าไม่มีบรรทัดนี้ = ไม่ไปแน่นอน

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    u => u.username === username && u.password === password
  );

  if (!foundUser) {
    error.textContent = "ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    return;
  }

  // ✅ สร้าง session
  sessionStorage.setItem("sessionUser", username);

  // ✅ ไปหน้า loggedin
  window.location.href = "loggedin.html";
});
