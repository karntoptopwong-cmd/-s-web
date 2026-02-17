document.addEventListener("DOMContentLoaded", () => {

  // 🔐 ตรวจสอบการ login
  const session = window.requireAuth();
  if (!session) return;

  const username = session.username;
  document.getElementById("usernameDisplay").textContent = username;

  // ===== elements =====
  const profileForm = document.getElementById("profileForm");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");

  if (!profileForm || !editBtn || !saveBtn) {
    console.error("Profile element ไม่ครบ");
    return;
  }

  const inputs = profileForm.querySelectorAll("input");

  // ===== โหลดข้อมูล =====
  const key = `profile_${username}`;
  let data = {};

  try {
    data = JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    console.error("localStorage ไม่ใช่ JSON");
  }

  inputs.forEach(input => {
    input.value = data[input.id] || "";
    input.disabled = true;
  });

  saveBtn.disabled = true;

  // =========================
  // ✏️ EDIT MODE
  // =========================
  editBtn.addEventListener("click", () => {
    console.log("EDIT CLICKED"); // debug

    inputs.forEach(input => input.disabled = false);

    saveBtn.disabled = false;
    saveBtn.classList.add("active");
  });

  // =========================
  // 💾 SAVE
  // =========================
  profileForm.addEventListener("submit", e => {
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
