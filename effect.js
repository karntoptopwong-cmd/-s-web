console.log("effect.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  const spotlight = document.getElementById("spotlight");

  if (!spotlight) {
    console.error("❌ spotlight not found");
    return;
  }

  window.addEventListener("mousemove", (e) => {
    spotlight.style.setProperty("--x", e.clientX + "px");
    spotlight.style.setProperty("--y", e.clientY + "px");
  });
});
