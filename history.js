import { requireAuth, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {

  // ===== AUTH (ศูนย์กลาง) =====
  const session = requireAuth();
  if (!session) return;

  const username = session.username;

  // ===== element =====
  const historyList = document.getElementById("historyList");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileArea = document.getElementById("profileArea");
  const helpBtn = document.getElementById("helpBtn");

  if (!historyList || !menuBtn || !sidebar || !logoutBtn) {
    console.error("HTML element ไม่ครบ");
    return;
  }

  // ===== sidebar toggle =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // ===== navigation =====
  profileArea?.addEventListener("click", () => {
    location.href = "profile.html";
  });

  helpBtn?.addEventListener("click", () => {
    location.href = "help.html";
  });

  // ===== logout (ใช้ auth.js เท่านั้น) =====
  logoutBtn.addEventListener("click", logout);

  // ===== load history (localStorage ชั่วคราว) =====
  const historyKey = `history_${username}`;
  let historyData = [];

  try {
    historyData = JSON.parse(localStorage.getItem(historyKey)) || [];
  } catch {
    historyData = [];
  }

  if (historyData.length === 0) {
    historyList.innerHTML = "<p>ยังไม่มีประวัติ</p>";
    return;
  }

  historyList.innerHTML = "";

  historyData.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <strong>${item.date}</strong><br>
      คะแนน: ${item.points}
    `;
    historyList.appendChild(div);
  });

});
