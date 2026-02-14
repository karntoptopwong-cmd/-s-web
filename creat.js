form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!username || !password || !confirmPassword) {
    errorMsg.textContent = "Please fill in all fields.";
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  // 🔹 โหลด users ทั้งหมด
  const users = JSON.parse(localStorage.getItem("users")) || {};

  // 🔹 เช็กซ้ำ
  if (users[username]) {
    errorMsg.textContent = "Username already exists.";
    return;
  }

  // 🔹 เพิ่ม user ใหม่
  users[username] = {
    password
  };

  localStorage.setItem("users", JSON.stringify(users));

  // 🔹 กลับไปหน้า login
  window.location.href = "index.html";
});
