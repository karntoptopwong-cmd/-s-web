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

    if (localStorage.getItem(`user_${username}`)) {
      errorMsg.textContent = "Username already exists.";
      return;
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

    localStorage.setItem(
      `user_${username}`,
      JSON.stringify(userData)
    );
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
