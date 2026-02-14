document.addEventListener("DOMContentLoaded", () => {

  // ===== ตรวจ login =====
  const username = localStorage.getItem("currentUser");
  if (!username) {
    location.href = "index.html";
    return;
  }

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

  // ===== logout =====
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("session"); // เผื่อใช้ระบบ session
    location.href = "index.html";
  });

});
