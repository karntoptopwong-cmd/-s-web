document.addEventListener("DOMContentLoaded", () => {

  // ===== 1) ดึง session =====
  const sessionRaw = localStorage.getItem("session");

  if (!sessionRaw) {
    window.location.href = "index.html";
    return;
  }

  let session;
  try {
    session = JSON.parse(sessionRaw);
  } catch {
    localStorage.removeItem("session");
    window.location.href = "index.html";
    return;
  }

  // (ถ้าไม่มีระบบหมดอายุ ตัดส่วนนี้ทิ้งได้)
  if (session.expireAt && Date.now() > session.expireAt) {
    localStorage.removeItem("session");
    window.location.href = "index.html";
    return;
  }

  // ✅ ตัวตนผู้ใช้ (มาตรฐานเดียว)
  const username = session.username;

  // ===== 2) แจ้ง server ว่าผู้ใช้งานอยู่ =====
  fetch("https://arduino-api-sain.onrender.com/login?user=" + username)
    .catch(err => console.error("login notify failed", err));

  // ===== 3) ดึงคะแนน =====
  fetch("https://arduino-api-sain.onrender.com/score")
    .then(res => res.json())
    .then(data => {
      const scoreEl = document.getElementById("score");
      if (!scoreEl) return;

      scoreEl.textContent = data[username] ?? 0;
    })
    .catch(err => console.error("load score failed", err));

});
