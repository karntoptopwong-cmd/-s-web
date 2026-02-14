document.addEventListener("DOMContentLoaded", () => {

  // ===== ตรวจ login =====
  const username = localStorage.getItem("currentUser");
  if (!username) {
    location.href = "index.html";
    return;
  }

  // ===== element =====
  const historyList = document.getElementById("historyList");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileArea = document.getElementById("profileArea");
  const helpBtn = document.getElementById("helpBtn");

  // ===== sidebar toggle =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // ===== navigation =====
  profileArea.addEventListener("click", () => {
    location.href = "profile.html";
  });

  helpBtn.addEventListener("click", () => {
    location.href = "help.html";
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("session"); // เผื่อใช้ระบบ session
    location.href = "index.html";
  });

  // ===== load history =====
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
