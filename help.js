document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("currentUser");
  if (!username) {
    location.href = "index.html";
    return;
  }

  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const logoutBtn = document.getElementById("logoutBtn");
  const homeBtn = document.getElementById("homeBtn");
  const profileArea = document.getElementById("profileArea");
  

  // sidebar
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  profileArea.addEventListener("click", () => {
    location.href = "profile.html";
  });

  homeBtn.addEventListener("click", () => {
    location.href = "loggedin.html";
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.href = "index.html";
  });

});
