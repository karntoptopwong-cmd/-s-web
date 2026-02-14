// =======================
// Auth
// =======================
const session = getSession();

// welcome username
document.getElementById("welcome").innerText =
  `Welcome ${session.username}`;

// =======================
// Sidebar Toggle
// =======================
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// =======================
// Logout
// =======================
document
  .getElementById("logoutBtn")
  .addEventListener("click", logout);

// =======================
// Mouse Light Effect
// =======================
const mouseLight = document.getElementById("mouse-light");

document.addEventListener("mousemove", (e) => {
  mouseLight.style.background = `
    radial-gradient(
      circle at ${e.clientX}px ${e.clientY}px,
      rgba(255,255,255,0.25),
      rgba(0,0,0,0.7) 40%
    )
  `;
});
