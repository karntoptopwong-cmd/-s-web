import { requireAuth, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const session = requireAuth();
  if (!session) return;

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const homeBtn = document.getElementById("homeBtn");
  const historyBtn = document.getElementById("historyBtn");
  const profileArea = document.getElementById("profileArea");

  if (!menuBtn || !sidebar || !logoutBtn) {
    console.error("Help elements missing");
    return;
  }

  // ☰ toggle sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // navigation
  homeBtn?.addEventListener("click", () => {
    location.href = "loggedin.html";
  });

  historyBtn?.addEventListener("click", () => {
    location.href = "history.html";
  });

  profileArea?.addEventListener("click", () => {
    location.href = "profile.html";
  });

  logoutBtn.addEventListener("click", logout);

});
