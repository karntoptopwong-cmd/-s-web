import { requireAuth } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // 1️⃣ Auth (เหมือนของคุณ)
  // =============================
  const session = requireAuth();
  if (!session) return;

  const username = session.username;
  document.getElementById("usernameDisplay").textContent = username;

  // =============================
  // 2️⃣ Form + ปุ่ม (ชัดแบบคุณ)
  // =============================
  const profileForm = document.getElementById("profileForm");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");

  if (!profileForm || !editBtn || !saveBtn) {
    console.error("Profile element ไม่ครบ");
    return;
  }

  // =============================
  // 3️⃣ Inputs (ยืดหยุ่นแบบผม)
  // =============================
  const inputs = profileForm.querySelectorAll("input");

  // =============================
  // 4️⃣ Load ข้อมูล
  // =============================
  const key = `profile_${username}`;
  let data = {};

  try {
    data = JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    console.error("localStorage ไม่ใช่ JSON");
  }

  inputs.forEach(input => {
    input.value = data[input.id] || "";
    input.disabled = true; // 🔒 ล็อกตั้งแต่แรก
  });

  saveBtn.disabled = true;

  // =============================
  // 5️⃣ EDIT
  // =============================
  editBtn.addEventListener("click", () => {
    inputs.forEach(input => input.disabled = false);

    saveBtn.disabled = false;
    saveBtn.classList.add("active");
  });

  // =============================
  // 6️⃣ SAVE (พร้อมต่อ server)
  // =============================
  profileForm.addEventListener("submit", e => {
    e.preventDefault();

    const newData = {};

    inputs.forEach(input => {
      newData[input.id] = input.value;
      input.disabled = true; // 🔒 ล็อกกลับ
    });

    // localStorage (ตอนนี้)
    localStorage.setItem(key, JSON.stringify(newData));

    // 👉 อนาคตต่อ server ตรงนี้
    /*
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData)
    });
    */

    saveBtn.disabled = true;
    saveBtn.classList.remove("active");

    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  });
});
