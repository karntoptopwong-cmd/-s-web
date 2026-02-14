document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");
  const mouseLight = document.getElementById("mouse-light");

  // =======================
  // Mock Users Database
  // =======================
  const users = [
    { username: "admin", password: "1234" },
    { username: "user1", password: "abcd" }
  ];

  // =======================
  // Login
  // =======================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอกข้อมูลให้ครบ";
      return;
    }

    // 🔍 ตรวจสอบผู้ใช้
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (!foundUser) {
      errorMsg.textContent = "ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
      return;
    }

    // ✅ สร้าง session
    const session = {
      token: crypto.randomUUID(),
      userId: foundUser.username,
      username: foundUser.username,
      expireAt: Date.now() + 60 * 60 * 1000
    };

    localStorage.setItem("session", JSON.stringify(session));
    window.location.href = "loggedin.html";
  });

  // =======================
  // Mouse Light
  // =======================
  document.addEventListener("mousemove", (e) => {
    if (!mouseLight) return;

    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255, 255, 255, 0.25),
        rgba(0, 0, 0, 0.7) 40%
      )
    `;
  });
});
