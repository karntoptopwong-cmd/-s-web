document.addEventListener("DOMContentLoaded", () => {

  console.log("profile.js loaded");

  // 🔐 ตรวจสอบการ login
  const session = window.requireAuth();
  if (!session) return;

  const username = session.username;
  document.getElementById("usernameDisplay").textContent = username;

  const profileForm = document.getElementById("profileForm");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");

  if (!editBtn || !profileForm || !saveBtn) {
    console.error("Profile elements missing");
    return;
  }

  const inputs = profileForm.querySelectorAll("input");

  // โหลดข้อมูลจาก localStorage
  const key = `profile_${username}`;
  const savedData = JSON.parse(localStorage.getItem(key)) || {};

  inputs.forEach(input => {
    input.value = savedData[input.id] || "";
    input.disabled = true;
  });

  saveBtn.disabled = true;

  // ✏️ EDIT
  editBtn.addEventListener("click", () => {
    console.log("EDIT CLICKED");

    inputs.forEach(input => input.disabled = false);

    saveBtn.disabled = false;
    saveBtn.classList.add("active");
  });

  // 💾 SAVE
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newData = {};

    inputs.forEach(input => {
      newData[input.id] = input.value;
      input.disabled = true;
    });

    localStorage.setItem(key, JSON.stringify(newData));

    saveBtn.disabled = true;
    saveBtn.classList.remove("active");

    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  });

});
