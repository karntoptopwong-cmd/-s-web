const helpBtn = document.getElementById("helpBtn");
  const mouseLight = document.getElementById("mouse-light");

  // ===== Sidebar =====
  /* sidebar */
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  profileBtn.addEventListener("click", () => {
    window.location.href = "profile.html";
    location.href = "profile.html";
  });

  helpBtn.addEventListener("click", () => {
    window.location.href = "help.html";
    location.href = "help.html";
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
    location.href = "index.html";
  });

  // ===== Load history =====
  /* load history */
  const historyKey = `history_${username}`;
  const historyRaw = localStorage.getItem(historyKey);
  const historyData = historyRaw ? JSON.parse(historyRaw) : [];
  const historyData = JSON.parse(localStorage.getItem(historyKey)) || [];

  if (historyData.length === 0) {
    historyList.innerHTML = "<p>ยังไม่มีประวัติ</p>";
    return;
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
  /* mouse light */
  document.addEventListener("mousemove", (e) => {
    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255,255,255,0.15),
        rgba(0,0,0,0.6) 40%
        rgba(255,255,255,0.18),
        rgba(0,0,0,0.65) 40%
      )
    `;
  });
