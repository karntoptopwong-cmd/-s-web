document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("currentUser");
  const historyList = document.getElementById("historyList");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!username) {
    window.location.href = "index.html";
    return;
  }

  // ===== Menu =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

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

  historyData.reverse().forEach(item => {
    const card = document.createElement("div");
    card.className = "history-card";

    card.innerHTML = `
      <p><strong>Date:</strong> ${item.date}</p>
      <p><strong>Time:</strong> ${item.time}</p>
      <p><strong>Points:</strong> ${item.points}</p>
    `;

    historyList.appendChild(card);
  });
});
