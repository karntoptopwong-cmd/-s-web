document.addEventListener("DOMContentLoaded", () => {

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
