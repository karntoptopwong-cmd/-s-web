import { requireAuth } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // 1️⃣ Auth (ของเดิม — ไม่แก้)
  // =============================
  const session = requireAuth();
  if (!session) return;

  const username = session.username;

  // =============================
  // 2️⃣ DOM Elements (เพิ่ม editBtn, saveBtn)
  // =============================
  const usernameDisplay = document.getElementById("usernameDisplay");

  const profileForm = document.getElementById("profileForm");
  const fullname = document.getElementById("fullname");
  const classInput = document.getElementById("class");
  const numberInput = document.getElementById("number");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  // 🔹 เพิ่มใหม่
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");

  if (
    !profileForm ||
    !fullname ||
    !classInput ||
    !numberInput ||
    !email ||
    !phone ||
    !editBtn ||   // 🔹 เพิ่ม
    !saveBtn     // 🔹 เพิ่ม
  ) {
    console.error("Profile HTML element ไม่ครบ");
    return;
  }

  if (usernameDisplay) {
    usernameDisplay.textContent = username;
  }

  // =============================
  // 3️⃣ Load ข้อมูลจาก localStorage (ของเดิม — ไม่แก้)
  // =============================
  const key = `profile_${username}`;
  let data = {};

  try {
    data = JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    console.error("ข้อมูลใน localStorage ไม่ใช่ JSON");
  }

  fullname.value = data.fullname || "";
  classInput.value = data.class || "";
  numberInput.value = data.number || "";
  email.value = data.email || "";
  phone.value = data.phone || "";

  // =============================
  // 4️⃣ EDIT BUTTON (เพิ่มใหม่ทั้งก้อน)
  // =============================
  editBtn.addEventListener("click", () => {
    console.log("EDIT CLICKED");

    fullname.disabled = false;
    classInput.disabled = false;
    numberInput.disabled = false;
    email.disabled = false;
    phone.disabled = false;

    saveBtn.disabled = false;
    saveBtn.classList.add("active");
  });

  // =============================
  // 5️⃣ SAVE (เพิ่มล็อกกลับหลังบันทึก)
  // =============================
  profileForm.addEventListener("submit", e => {
    e.preventDefault();

    localStorage.setItem(
      key,
      JSON.stringify({
        fullname: fullname.value,
        class: classInput.value,
        number: numberInput.value,
        email: email.value,
        phone: phone.value
      })
    );

    alert("บันทึกข้อมูลเรียบร้อยแล้ว");

    // 🔹 เพิ่มใหม่: ล็อกกลับ
    fullname.disabled = true;
    classInput.disabled = true;
    numberInput.disabled = true;
    email.disabled = true;
    phone.disabled = true;

    saveBtn.disabled = true;
    saveBtn.classList.remove("active");
  });
});
