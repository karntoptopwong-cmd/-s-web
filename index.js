document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("errorMsg");

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
        `https://arduino-api-sain.onrender.com/login?user=${username}&pass=${password}`
      );

      const data = await res.json();

      if (data.error) {
        errorMsg.textContent = "ชื่อผู้ใช้หรือรหัสผ่านผิด";
        return;
      }

      // ✅ บันทึก token
      localStorage.setItem("token", data.token);

      // ✅ สร้าง session
      localStorage.setItem("session", JSON.stringify({
        username: data.user,
        expireAt: Date.now() + 86400000
      }));

      window.location.href = "loggedin.html";

    } catch (err) {
      errorMsg.textContent = "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้";
      console.error(err);
    }

  });

});
