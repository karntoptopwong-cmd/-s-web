document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("currentUser");

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const logoutBtn = document.getElementById("logoutBtn");

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const historyBtn = document.getElementById("historyBtn");
  const mouseLight = document.getElementById("mouse-light");

  if (!welcomeMsg || !pointsDisplay || !logoutBtn || !menuBtn || !sidebar) {
    console.error("HTML element ไม่ครบ");
    return;
  }

  if (!username) {
    window.location.href = "index.html";
    return;
  }

  welcomeMsg.textContent = `Welcome to the home page, ${username}`;

  // ===== Points =====
  const pointKey = `points_${username}`;
  let pointsRaw = localStorage.getItem(pointKey);
  let points = 0;

  if (pointsRaw !== null) {
    const parsed = Number(pointsRaw);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      points = parsed;
    } else {
      // ข้อมูลพัง → reset
      localStorage.setItem(pointKey, 0);
      points = 0;
    }
  } else {
    localStorage.setItem(pointKey, 0);
  }

  pointsDisplay.textContent = `Points: ${points}`;

  // ===== Menu =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // ===== Navigation =====
  if (profileArea) {
    profileArea.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }

  if (historyBtn) {
    historyBtn.addEventListener("click", () => {
      window.location.href = "history.html";
    });
  }

  // ===== Logout =====
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });

  // ===== Mouse Light =====
  if (mouseLight) {
    document.addEventListener("mousemove", (e) => {
      mouseLight.style.background = `
        radial-gradient(
          circle at ${e.clientX}px ${e.clientY}px,
          rgba(255, 255, 255, 0.2),
          rgba(0, 0, 0, 0.6) 40%
        )
      `;
    });
      // ===== โหลดคะแนนของผู้ใช้ =====
  async function loadMyScore() {
    const res = await fetch("https://arduino-api-sain.onrender.com/score");
    const data = await res.json();

    const score = data[session.username] ?? 0;

    document.getElementById("myScore").innerText = score;
  }

  loadMyScore();
  setInterval(loadMyScore, 2000);

  }

});

