console.log("effect.js loaded");

const spotlight = document.getElementById("spotlight");

window.addEventListener("mousemove", (e) => {
  spotlight.style.setProperty("--x", `${e.clientX}px`);
  spotlight.style.setProperty("--y", `${e.clientY}px`);
});
