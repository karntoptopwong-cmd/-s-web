document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("errorMsg");

  if (!loginForm || !errorMsg) {
    console.error("HTML element ไม่ครบ (login)");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    console.log(username, password);

    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอกข้อมูล";
      return;
    }

    try {
      // ✅ ส่งไป login ที่ server
      const res = await fetch(
        `https://arduino-api-sain.onrender.com/login?user=${username}&pass=${password}`
      );

      const data = await res.json();

      // ❌ login ไม่สำเร็จ
      if (data.error) {
        errorMsg.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        return;
      }

      // ✅ บันทึก token
      localStorage.setItem("token", data.token);

      // ✅ บันทึก session
      localStorage.setItem("session", JSON.stringify({
        username: data.user,

        expireAt: Date.now() + 24 * 60 * 60 * 1000
      }));

      // ไปหน้า dashboard
      window.location.href = "loggedin.html";

    } catch (err) {
      console.error(err);
      errorMsg.textContent = "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้";
    }
  });

});





