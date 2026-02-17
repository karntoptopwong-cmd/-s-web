document.addEventListener("DOMContentLoaded", () => {

  // 🔐 ตรวจสอบ session
  const session = requireAuth();
  if (!session) return;

  const username = session.username;

  const welcomeMsg = document.getElementById("welcomeMsg");
  const pointsDisplay = document.getElementById("points");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const profileArea = document.getElementById("profileArea");
  const historyBtn = document.getElementById("historyBtn");
  const helpBtn = document.getElementById("helpBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // ======================
  // แสดงข้อมูลผู้ใช้
  // ======================
  welcomeMsg.textContent = `Welcome to the home page, ${username}`;

  const userPoints = session.score ?? 0;
  pointsDisplay.textContent = `Points: ${userPoints}`;

  // ======================
  // Sidebar UI
  // ======================
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

  // ======================
  // ⭐ REALTIME SCORE UPDATE
  // ======================

  const SUPABASE_URL = "https://cbhfydsjuawdcgrzxzzu.supabase.co";

  // 🔴 ใส่ ANON KEY ของคุณตรงนี้
  const SUPABASE_KEY = "PUT_YOUR_ANON_KEY_HERE";

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  supabase
    .channel("score-update")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "users"
      },
      payload => {

        if (payload.new.username === username) {

          const newScore = payload.new.score ?? 0;

          // อัปเดตบนหน้าเว็บ
          pointsDisplay.textContent = `Points: ${newScore}`;

          // อัปเดต session
          const updatedSession = {
            ...session,
            score: newScore
          };

          localStorage.setItem("session", JSON.stringify(updatedSession));
        }
      }
    )
    .subscribe();

});
