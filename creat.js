document.addEventListener("DOMContentLoaded", () => {

  // ❌ [ตัดออก] loginForm (ไม่ใช่หน้าสมัคร)
  const form = document.getElementById("signupForm");
  const errorMsg = document.getElementById("errorMsg");

  // ✅ [เพิ่ม] กัน element หาย
  if (!form || !errorMsg) {
    console.error("HTML element ไม่ครบ (create)");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // ✅ ต้องมี

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // ✅ validation
    if (!username || !password || !confirmPassword) {
      errorMsg.textContent = "กรุณากรอกข้อมูลให้ครบ";
      return;
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = "รหัสผ่านไม่ตรงกัน";
      return;
    }

    // 🔹 โหลด users
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // ❌ username ซ้ำ
    if (users[username]) {
      errorMsg.textContent = "ชื่อผู้ใช้นี้ถูกใช้แล้ว";
      return;
    }

    // ✅ [เพิ่ม] บันทึก user ใหม่
    users[username] = { password };

    localStorage.setItem("users", JSON.stringify(users));

    // ✅ redirect กลับ login
    window.location.href = "index.html";
  });

});
