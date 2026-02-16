import { requireAuth, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // 🔐 ตรวจสอบ session
  const session = requireAuth();
  console.log("SESSION ON DASHBOARD:", session);

  if (!session) return;

  const username = session.username;

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const historyBtn = document.getElementById("historyBtn");
  const helpBtn = document.getElementById("helpBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!welcomeMsg || !pointsDisplay || !menuBtn || !sidebar || !logoutBtn) {
    console.error("❌ HTML element ไม่ครบ");
    return;
  }

  // ✅ แสดงข้อความต้อนรับ
  console.log("Session data loaded:", session);
  welcomeMsg.textContent = `Welcome to the home page, ${username}`;

  // ✅ โหลดคะแนนจาก session ก่อน (เร็ว + ไม่พัง)
  const userPoints = session.score ?? 0;
  pointsDisplay.textContent = `Points: ${userPoints}`;

  // 🎛 UI interactions
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  profileArea?.addEventListener("click", () => {
    location.href = "profile.html";
  });

  historyBtn?.addEventListener("click", () => {
    location.href = "history.html";
  });

  helpBtn?.addEventListener("click", () => {
    location.href = "help.html";
  });

  logoutBtn.addEventListener("click", logout);
});
