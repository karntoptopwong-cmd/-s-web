
document.addEventListener("mousemove", (e) => {
  const light = document.getElementById("mouse-light");
  if (!light) return;

  light.style.background = `
    radial-gradient(
      circle at ${e.clientX}px ${e.clientY}px,
      rgba(255,255,255,0.2),
      rgba(0,0,0,0.6) 40%
    )
  `;
});
