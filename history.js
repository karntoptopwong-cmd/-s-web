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
  const mouseLight = document.getElementById("mouse-light");

  // ☰ menu
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

  // ===== Load History =====
  const historyKey = `history_${username}`;
  const raw = localStorage.getItem(historyKey);
  const historyData = raw ? JSON.parse(raw) : [];

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

  // mouse light
  document.addEventListener("mousemove", (e) => {
    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255,255,255,0.25),
        rgba(0,0,0,0.6) 40%
      )
    `;
  });

});
