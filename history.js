document.addEventListener("DOMContentLoaded", () => {

  console.log("history.js loaded");

  // 🔐 ตรวจสอบ login
  const session = window.requireAuth();
  if (!session) return;

  const username = session.username;

  // ===== elements =====
  const historyList = document.getElementById("historyList");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileArea = document.getElementById("profileArea");
  const helpBtn = document.getElementById("helpBtn");

  if (!menuBtn || !sidebar || !logoutBtn || !historyList) {
    console.error("HTML element ไม่ครบ (history)");
    return;
  }

  // ☰ เปิด/ปิด sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // navigation
  profileArea?.addEventListener("click", () => {
    location.href = "profile.html";
  });

  helpBtn?.addEventListener("click", () => {
    location.href = "help.html";
  });

  logoutBtn.addEventListener("click", window.logout);

  // ===== โหลด history =====
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
