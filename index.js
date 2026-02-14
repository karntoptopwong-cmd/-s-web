document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");
  const mouseLight = document.getElementById("mouse-light");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // ✅ ดึง user จาก localStorage (ที่สมัครจาก creat.html)
    const userData = localStorage.getItem(`user_${username}`);

    if (!userData) {
      errorMsg.textContent = "ไม่พบผู้ใช้";
      return;
    }

    const user = JSON.parse(userData);

    if (user.password !== password) {
      errorMsg.textContent = "รหัสผ่านไม่ถูกต้อง";
      return;
    }

    // ✅ สร้าง session
    const session = {
      userId: username,
      token: crypto.randomUUID(),
      expireAt: Date.now() + 60 * 60 * 1000 // 1 ชั่วโมง
    };

    localStorage.setItem("session", JSON.stringify(session));

    // ✅ ไปหน้า loggedin
    window.location.href = "loggedin.html";
  });

  // ===== Mouse Light Effect =====
  if (mouseLight) {
    document.addEventListener("mousemove", (e) => {
      mouseLight.style.background = `
        radial-gradient(
          circle at ${e.clientX}px ${e.clientY}px,
          rgba(255, 255, 255, 0.2),
          rgba(0, 0, 0, 0.6) 40%
        )
      `;
    });
  }

});
