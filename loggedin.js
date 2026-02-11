// ===== Auth Guard =====
function checkAuth() {
  const sessionRaw = localStorage.getItem("session");
  if (!sessionRaw) return null;

  let session;
  try {
    session = JSON.parse(sessionRaw);
  } catch {
    localStorage.removeItem("session");
    return null;
  }

  if (!session.token || Date.now() > session.expireAt) {
    localStorage.removeItem("session");
    return null;
  }

  return session;
}

document.addEventListener("DOMContentLoaded", () => {

  const session = checkAuth();
  if (!session) {
    window.location.href = "index.html";
    return;
  }

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const historyArea = document.getElementById("historyArea");
  const mouseLight = document.getElementById("mouse-light");

  if (!welcomeMsg || !pointsDisplay || !logoutBtn || !menuBtn || !sidebar) {
    console.error("HTML element ไม่ครบ");
    return;
  }

  // ===== โหลดข้อมูล user จาก session =====
  const userRaw = localStorage.getItem(`user_${session.userId}`);
  if (!userRaw) {
    window.location.href = "index.html";
    return;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch {
    window.location.href = "index.html";
    return;
  }

  const username = user.username;

  welcomeMsg.textContent = `Welcome, ${username}!`;

  // ===== Points =====
  const pointKey = `points_${session.userId}`;
  let points = localStorage.getItem(pointKey);

  if (points === null) {
    points = 0;
    localStorage.setItem(pointKey, points);
  }

  pointsDisplay.textContent = `Points: ${points}`;

  // ===== Menu =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  profileArea.addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  // ===== Logout =====
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "index.html";
  });

  // ===== Mouse Light =====
  document.addEventListener("mousemove", (e) => {
    if (!mouseLight) return;

    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255, 255, 255, 0.2),
        rgba(0, 0, 0, 0.6) 40%
      )
    `;
  });

});
