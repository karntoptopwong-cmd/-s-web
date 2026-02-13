document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("currentUser");
  if (!username) {
    window.location.href = "index.html";
    return;
  }

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const historyList = document.getElementById("historyList");

  // ☰ toggle menu
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

  // ===== Load history =====
  const historyKey = `history_${username}`;
  const historyRaw = localStorage.getItem(historyKey);
  const historyData = historyRaw ? JSON.parse(historyRaw) : [];

  if (historyData.length === 0) {
    historyList.innerHTML = "<p>ยังไม่มีประวัติ</p>";
    return;
  }

  historyData.forEach(item => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <p>Date: ${item.date}</p>
      <p>Time: ${item.time}</p>
      <p>Points: ${item.points}</p>
    `;
    historyList.appendChild(card);
  });

});
