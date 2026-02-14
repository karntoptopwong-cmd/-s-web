import { requireAuth } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const session = requireAuth();
  if (!session) return;

  const username = session.username;

  const usernameDisplay = document.getElementById("usernameDisplay");
  if (usernameDisplay) {
    usernameDisplay.textContent = username;
  }

  const profileForm = document.getElementById("profileForm");
  const fullname = document.getElementById("fullname");
  const classInput = document.getElementById("class");
  const numberInput = document.getElementById("number");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  if (!profileForm || !fullname || !classInput || !numberInput || !email || !phone) {
    console.error("Profile HTML element ไม่ครบ");
    return;
  }

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
  });
});
