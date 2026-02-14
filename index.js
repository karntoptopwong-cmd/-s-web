document.addEventListener("DOMContentLoaded", () => {
  const username = session.userId;
  // ✅ แจ้ง server ว่าผู้ใช้นี้กำลังใช้งาน
fetch("https://arduino-api-sain.onrender.com/login?user=" + username);


// ✅ ดึงคะแนนมาแสดง
fetch("https://arduino-api-sain.onrender.com/score")
  .then(res => res.json())
  .then(data => {

    const scoreEl = document.getElementById("score");

    if (!scoreEl) return;

    if (data[username] !== undefined) {
      scoreEl.textContent = data[username];
    } else {
      scoreEl.textContent = 0;
    }

  });

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

  if (Date.now() > session.expireAt) {
    localStorage.removeItem("session");
    window.location.href = "index.html";
    return;
  }

  const username = session.userId; // ✅ ตัวตนผู้ใช้จริง

  // แสดง Welcome
  const welcomeMsg = document.getElementById("welcomeMsg");
  if (welcomeMsg) {
    welcomeMsg.textContent = `Welcome ${username}`;
  }

});

