document.addEventListener("DOMContentLoaded", () => {

  const session = getSession();

if (session) {
  document.getElementById("welcome").innerText =
    `Welcome ${session.username}`;
}


  const session = getSession();
  if (!session) {
    location.href = "index.html";
    return;
  }
  const mouseLight = document.getElementById("mouse-light");
  const username = session.username;

  document.getElementById("welcomeMsg").textContent =
    `Welcome, ${username}`;

  const pointKey = `points_${username}`;
  let points = Number(localStorage.getItem(pointKey)) || 0;
  localStorage.setItem(pointKey, points);

  document.getElementById("points").textContent =
    `Points: ${points}`;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("session");
    location.href = "index.html";
  });

  document.getElementById("historyBtn").addEventListener("click", () => {
    location.href = "history.html";
  });

  document.getElementById("profileArea").addEventListener("click", () => {
    location.href = "profile.html";
  });
  document.addEventListener("mousemove", (e) => {
  mouseLight.style.background = `
    radial-gradient(
      circle at ${e.clientX}px ${e.clientY}px,
      rgba(255, 255, 255, 0.2),
      rgba(0, 0, 0, 0.7) 40%
    )
  `;
});
});


