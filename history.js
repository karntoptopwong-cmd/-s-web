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
  /* sidebar */
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  profileBtn.addEventListener("click", () => {
    location.href = "profile.html";
  });

  helpBtn.addEventListener("click", () => {
    location.href = "help.html";
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.href = "index.html";
  });
  const historyKey = `history_${username}`;
  const historyData = JSON.parse(localStorage.getItem(historyKey)) || [];

  if (historyData.length === 0) {
    historyList.innerHTML = "<p>ยังไม่มีประวัติ</p>";
    } else {
    historyData.forEach(item => {
      const div = document.createElement("div");
      div.className = "history-item";
      div.innerHTML = `
        <strong>${item.date}</strong><br>
        คะแนน: ${item.points}
      `;
      historyList.appendChild(div);
    });
  }
  
