document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signupForm");
  const errorMsg = document.getElementById("errorMsg");

  if (!form || !errorMsg) {
    console.error("HTML element ไม่ครบ (create)");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;

    // ===== validation =====
    if (!username || !password || !confirmPassword) {
      errorMsg.textContent = "Please fill in all fields.";
      return;
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match.";
      return;
    }

    const userKey = `user_${username}`;
    const existingUserRaw = localStorage.getItem(userKey);

    if (existingUserRaw) {
      try {
        JSON.parse(existingUserRaw);
        errorMsg.textContent = "Username already exists.";
        return;
      } catch {
        // ข้อมูลพัง → ลบทิ้ง
        localStorage.removeItem(userKey);
      }
    }

    // ===== save =====
    try {
      localStorage.setItem(
        userKey,
        JSON.stringify({ username, password })
      );
    } catch (err) {
      console.error("Save failed:", err);
      errorMsg.textContent = "Cannot save account. Storage error.";
      return;
    }

    // ===== redirect =====
    window.location.href = "index.html";
  });

});
