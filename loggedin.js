import { requireAuth, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {

  // 🔐 เช็ก session กลาง
  const session = requireAuth();
  if (!session) return;

  const username = session.username;

  // ===== DOM =====
  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const historyBtn = document.getElementById("historyBtn");

  if (!welcomeMsg || !pointsDisplay || !logoutBtn || !menuBtn || !sidebar) {
    console.error("HTML element ไม่ครบ");
    return;
  }

  // ===== Welcome =====
  welcomeMsg.textContent = `Welcome to the home page, ${username}`;

  // ===== Points (local หรือ backend ก็ได้) =====
  const pointKey = `points_${username}`;
  let points = Number(localStorage.getItem(pointKey)) || 0;
  pointsDisplay.textContent = `Points: ${points}`;

  // ===== Menu =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // ===== Navigation =====
  profileArea?.addEventListener("click", () => {
    location.href = "profile.html";
  });

  historyBtn?.addEventListener("click", () => {
    location.href = "history.html";
  });

  // ===== Logout (ใช้ของ auth.js) =====
  logoutBtn.addEventListener("click", logout);

});
