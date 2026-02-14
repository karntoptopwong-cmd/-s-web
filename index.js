document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอกข้อมูลให้ครบ";
      return;
    }

    const userRaw = localStorage.getItem(`user_${username}`);
    if (!userRaw) {
      errorMsg.textContent = "ไม่พบผู้ใช้";
      return;
    }

    let user;
    try {
      user = JSON.parse(userRaw);
    } catch {
      errorMsg.textContent = "ข้อมูลผู้ใช้เสีย";
      return;
    }

    if (user.password !== password) {
      errorMsg.textContent = "รหัสผ่านไม่ถูกต้อง";
      return;
    }

    // ✅ CREATE SESSION
    const session = {
      username,
      token: crypto.randomUUID(),
      expireAt: Date.now() + 1000 * 60 * 60 // 1 ชั่วโมง
    };

    localStorage.setItem("session", JSON.stringify(session));
    window.location.href = "loggedin.html";
  });
});
