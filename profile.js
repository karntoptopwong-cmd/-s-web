document.addEventListener("DOMContentLoaded", () => {

  const session = getSession();
  if (!session) {
    location.href = "index.html";
    return;
  }

  const username = session.username;
  document.getElementById("usernameDisplay").textContent = username;

  // 🔹 ดึง element จาก HTML ให้ครบ
  const profileForm = document.getElementById("profileForm");
  const fullname = document.getElementById("fullname");
  const classInput = document.getElementById("class");
  const numberInput = document.getElementById("number");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  // 🔹 กัน error ถ้า HTML ขาด
  if (!profileForm || !fullname || !classInput || !numberInput || !email || !phone) {
    console.error("Profile HTML element ไม่ครบ");
    return;
  }

  const key = `profile_${username}`;
  let data = {};

  try {
    data = JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    data = {};
  }

  // 🔹 ใส่ข้อมูลลงฟอร์ม
  fullname.value = data.fullname || "";
  classInput.value = data.class || "";
  numberInput.value = data.number || "";
  email.value = data.email || "";
  phone.value = data.phone || "";

  // 🔹 save
  profileForm.addEventListener("submit", e => {
    e.preventDefault();

    localStorage.setItem(key, JSON.stringify({
      fullname: fullname.value,
      class: classInput.value,
      number: numberInput.value,
      email: email.value,
      phone: phone.value
    }));

    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  });

});
