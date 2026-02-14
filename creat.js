document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById('signupForm');
  const errorMsg = document.getElementById('errorMsg');
  const mouseLight = document.getElementById("mouse-light");

  if (!form) return; // กัน error

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
      if (!username || !password || !confirmPassword) {
      errorMsg.textContent = "Please fill in all fields.";
      return;
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match.";
      return;
    }
      const existingUserRaw = localStorage.getItem(`user_${username}`);

    if (existingUserRaw) {
      // ✅ กัน JSON เสีย
      try {
        JSON.parse(existingUserRaw);
        errorMsg.textContent = "Username already exists.";
        return;
      } catch {
        // ข้อมูลพัง → ลบแล้วให้สมัครใหม่
        localStorage.removeItem(`user_${username}`);
      }
    }

    const userData = { username, password };
      try {
      localStorage.setItem(
        `user_${username}`,
        JSON.stringify(userData)
      );
    } catch (err) {
      console.error("Save failed:", err);
      errorMsg.textContent = "Cannot save account. Storage error.";
      return;
    }

    // ไม่ auto login
    window.location.href = "index.html";
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
