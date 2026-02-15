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

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // ✅ ต้องมี

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอกข้อมูล";
      return;
    }
    async function loginUser(username) {
  const res = await fetch("https://arduino-api-sain.onrender.com/login?user=" + username);
  const data = await res.json();

  localStorage.setItem("token", data.token);
}

    
    if (users[username].password !== password) {
      errorMsg.textContent = "รหัสผ่านไม่ถูกต้อง";
      return;
    }

    // ✅ [ถูกที่] สร้าง session
    localStorage.setItem("session", JSON.stringify({
      username,
      expireAt: Date.now() + 24 * 60 * 60 * 1000
    }));

    window.location.href = "loggedin.html";
  });

});




