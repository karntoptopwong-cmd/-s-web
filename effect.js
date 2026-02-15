console.log("effect.js loaded");

const light = document.getElementById("mouse-light");

if (light) {
  document.addEventListener("mousemove", (e) => {
    light.style.setProperty("--x", e.clientX + "px");
    light.style.setProperty("--y", e.clientY + "px");
  });
}
