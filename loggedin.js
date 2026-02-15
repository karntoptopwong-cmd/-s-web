import { requireAuth, logout, getAuthHeader } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // 1) ตรวจสอบ session
  // =============================
  const session = requireAuth();
  if (!session) return;

  const username = session.username;

  // =============================
  // 2) DOM elements
  // =============================
  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const historyBtn = document.getElementById("historyBtn");
  const helpBtn = document.getElementById("helpBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!welcomeMsg || !pointsDisplay || !menuBtn || !sidebar || !logoutBtn) {
    console.error("HTML element ไม่ครบ");
    return;
  }

  // =============================
  // 3) UI เริ่มต้น
  // =============================
  welcomeMsg.textContent = `Welcome to the home page, ${username}`;
  pointsDisplay.textContent = "Points: loading...";

  // =============================
  // 4) โหลดคะแนนจาก server
  // =============================
  async function loadPoints() {
    try {
      const res = await fetch(
        "https://arduino-api-sain.onrender.com/score",
        {
          headers: {
            ...getAuthHeader() // Bearer token
          }
        }
      );

      if (!res.ok) throw new Error("โหลดคะแนนไม่สำเร็จ");

      const data = await res.json();
      const userPoints = data[username] ?? 0;

      pointsDisplay.textContent = `Points: ${userPoints}`;
    } catch (err) {
      console.error(err);
      pointsDisplay.textContent = "Points: error";
    }
  }

  loadPoints();

  // =============================
  // 5) UI events
  // =============================
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
