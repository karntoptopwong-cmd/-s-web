const session = requireAuth();
console.log("SESSION ON DASHBOARD:", session);

  // 🔐 ตรวจสอบ session
  if (!session || !session.token) {
    console.warn("Session not found");
    return;
  }
  console.log("SESSION ON DASHBOARD:", session);

  if (!session) return;

  const username = session.username;
  const token = session.token;

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
@@ -28,49 +24,10 @@ console.log("SESSION ON DASHBOARD:", session);

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
        data?.points ??
        data?.score ??
        data?.[username] ??
        0;

      pointsDisplay.textContent = `Points: ${userPoints}`;

    } catch (err) {
      console.error("❌ โหลดคะแนนไม่ได้:", err);
      pointsDisplay.textContent = "Points: unavailable";
    }
  }

  loadPoints();
  // ✅ โหลดคะแนนจาก session ก่อน (เร็ว + ไม่พัง)
  const userPoints = session.score ?? 0;
  pointsDisplay.textContent = `Points: ${userPoints}`;

  // 🎛 UI interactions
  menuBtn.addEventListener("click", () => {
@@ -91,4 +48,3 @@ console.log("SESSION ON DASHBOARD:", session);

  logoutBtn.addEventListener("click", logout);
});
