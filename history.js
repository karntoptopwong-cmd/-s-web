document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("currentUser");

  if (!username) {
    window.location.href = "index.html"; // ยังไม่ login
    return;
  }

  // ถ้า login แล้ว ทำงานต่อ
  console.log("History page, user:", username);
});
