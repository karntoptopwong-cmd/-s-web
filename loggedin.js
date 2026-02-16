document.addEventListener("DOMContentLoaded", () => {
const session = requireAuth();
console.log("SESSION ON DASHBOARD:", session);
  if (!session || !session.token) {
    console.warn("Session not found");
    return;
  }

  const username = session.username;
  const token = session.token;

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const historyBtn = document.getElementById("historyBtn");
  const helpBtn = document.getElementById("helpBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!welcomeMsg || !pointsDisplay || !menuBtn || !sidebar || !logoutBtn) {
    console.error("❌ HTML element ไม่ครบ");
    return;
  }
@@ -68,24 +70,25 @@
    }
  }

  loadPoints();

  // 🎛 UI interactions
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  profileArea?.addEventListener("click", () => {
    location.href = "profile.html";
  });

  historyBtn?.addEventListener("click", () => {
    location.href = "history.html";
  });

  helpBtn?.addEventListener("click", () => {
    location.href = "help.html";
  });

  logoutBtn.addEventListener("click", logout);
});
