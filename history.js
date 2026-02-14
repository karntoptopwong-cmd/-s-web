document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("currentUser");
  if (!username) {
    window.location.href = "index.html";
    return;
  }

  const historyList = document.getElementById("historyList");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileBtn = document.getElementById("profileBtn");
  const helpBtn = document.getElementById("helpBtn");
  const mouseLight = document.getElementById("mouse-light");

  // ===== Sidebar =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  profileBtn.addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  helpBtn.addEventListener("click", () => {
    window.location.href = "help.html";
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

  historyData.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <strong>${item.date}</strong><br>
      คะแนน: ${item.points}
    `;
    historyList.appendChild(div);
  });

  // ===== Mouse light =====
  document.addEventListener("mousemove", (e) => {
    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255,255,255,0.15),
        rgba(0,0,0,0.6) 40%
      )
    `;
  });
});
