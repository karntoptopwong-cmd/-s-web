document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");
  const mouseLight = document.getElementById("mouse-light");

  if (!form) return; 

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    errorMsg.textContent = ""; // ข้อ 7: clear error ทุกครั้ง

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const userData = localStorage.getItem(`user_${username}`);

    if (!userData) {
      errorMsg.textContent = "Account not found";
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(userData); 
    } catch (err) {
      console.error("User data corrupted:", err);
      errorMsg.textContent = "User data corrupted. Please register again.";
      localStorage.removeItem(`user_${username}`);
      return;
    }

    if (password !== parsedUser.password) {
      errorMsg.textContent = "Invalid username or password.";
      return;
    }

    const session = {
      userId: username,                
      token: crypto.randomUUID(),
      expireAt: Date.now() + 1000 * 60 * 60 // 1 ชั่วโมง
    };

    localStorage.setItem("session", JSON.stringify(session));
    localStorage.setItem("currentUser", username);

    window.location.href = "loggedin.html";
  });

  // ===== Mouse Light Effect =====
  if (mouseLight) {
    document.addEventListener("mousemove", (e) => {
      mouseLight.style.background = `
        radial-gradient(
          circle at ${e.clientX}px ${e.clientY}px,
          rgba(255, 255, 255, 0.2),
          rgba(0, 0, 0, 0.6) 40%
        )
      `;
    });
  }

});
