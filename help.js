import { requireAuth, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {

  // ===== 🔐 ตรวจ login กลาง =====
  const session = requireAuth();
  if (!session) return;

  // ===== element =====
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const homeBtn = document.getElementById("homeBtn");
  const profileArea = document.getElementById("profileArea");

  // ===== กัน error ถ้า element หาย =====
  if (!menuBtn || !sidebar || !logoutBtn || !homeBtn || !profileArea) {
    console.error("HTML element ไม่ครบ (help)");
    return;
  }

  // ===== sidebar =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // ===== navigation =====
  profileArea.addEventListener("click", () => {
    location.href = "profile.html";
  });

  homeBtn.addEventListener("click", () => {
    location.href = "loggedin.html";
  });

  // ===== logout (ใช้ auth.js เท่านั้น) =====
  logoutBtn.addEventListener("click", logout);

});
