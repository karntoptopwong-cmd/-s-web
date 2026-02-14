document.addEventListener("DOMContentLoaded", () => {

  const session = requireAuth();
  if (!session) return;

  const welcomeMsg = document.getElementById("welcomeMsg");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const historyBtn = document.getElementById("historyBtn");
  const mouseLight = document.getElementById("mouse-light");

  welcomeMsg.textContent = `Welcome ${session.username}`;

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  historyBtn.addEventListener("click", () => {
    location.href = "history.html";
  });

  logoutBtn.addEventListener("click", logout);

  document.addEventListener("mousemove", (e) => {
    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255,255,255,0.2),
        rgba(0,0,0,0.6) 40%
      )
    `;
  });
});
