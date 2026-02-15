document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("errorMsg");

  // ✅ [เพิ่ม] กัน element หาย
  if (!loginForm || !errorMsg) {
    console.error("HTML element ไม่ครบ (login)");
    return;
  }

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    errorMsg.textContent = "กรุณากรอกข้อมูล";
    return;
  }

  try {
    const res = await fetch(
      "https://arduino-api-sain.onrender.com/login?user=" +
      username +
      "&pass=" +
      password
    );

    const data = await res.json();

    // ❌ ล็อกอินไม่สำเร็จ
    if (data.error) {
      errorMsg.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
      return;
    }

    // ✅ เก็บ token
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user);

    // ✅ สร้าง session
    localStorage.setItem("session", JSON.stringify({
      username: data.user,
      expireAt: Date.now() + 86400000
    }));

    window.location.href = "loggedin.html";

  } catch (err) {
    errorMsg.textContent = "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้";
  }
});

});





