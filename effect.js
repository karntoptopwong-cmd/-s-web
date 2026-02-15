console.log("effect.js loaded");

document.addEventListener("mousemove", (e) => {
  const light = document.getElementById("mouse-light");
  if (!light) return;

  light.style.setProperty("--x", `${e.clientX}px`);
  light.style.setProperty("--y", `${e.clientY}px`);
});
