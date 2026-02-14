document.addEventListener("DOMContentLoaded", () => {
  const light = document.getElementById("mouse-light");
  if (!light) return;

  document.addEventListener("mousemove", (e) => {
    light.style.setProperty("--x", e.clientX + "px");
    light.style.setProperty("--y", e.clientY + "px");
  });
});
