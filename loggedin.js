document.addEventListener("DOMContentLoaded", () => {
  // 🔐 ตรวจสอบ session
  const session = requireAuth();  // ประกาศตัวแปร session ที่นี่เพียงครั้งเดียว
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
    console.error("HTML element ไม่ครบ");
    return;
  }

  // ✅ แสดงข้อความต้อนรับ
  welcomeMsg.textContent = `Welcome to the home page, ${username}`;
  pointsDisplay.textContent = "Points: loading...";

  // ✅ โหลดคะแนนจาก API
  async function loadPoints() {
    try {
      const res = await fetch(
        "https://arduino-api-sain.onrender.com/score",
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (data.error || data.message === "Invalid token") {
        pointsDisplay.textContent = "Session expired";
        logout();
        return;
      }

      // ✅ รองรับหลายรูปแบบ response
      const userPoints =
        data?.points ?? data?.score ?? data?.[username] ?? 0;

      pointsDisplay.textContent = `Points: ${userPoints}`;

    } catch (err) {
      console.error("❌ โหลดคะแนนไม่ได้:", err);
      pointsDisplay.textContent = "Points: unavailable";
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
