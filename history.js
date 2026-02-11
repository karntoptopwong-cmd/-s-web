// =======================
// Auth Guard
// =======================
function checkAuth() {
  const sessionRaw = localStorage.getItem("session");
  if (!sessionRaw) return null;

  let session;
  try {
    session = JSON.parse(sessionRaw);
  } catch {
    localStorage.removeItem("session");
    return null;
  }

  if (!session.token || Date.now() > session.expireAt) {
    localStorage.removeItem("session");
    return null;
  }

  return session;
}

// =======================
// Main
// =======================
document.addEventListener("DOMContentLoaded", () => {

  const session = checkAuth();

  if (!session) {
    window.location.href = "index.html";
    return;
  }

  const userId = session.userId; // ✅ สำคัญมาก

  // =======================
  // DOM
  // =======================
  const form = document.getElementById("profileForm");
  const fullname = document.getElementById("fullname");
  const classInput = document.getElementById("class");
  const number = document.getElementById("number");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const saveBtn = document.getElementById("saveBtn");
  const editBtn = document.getElementById("editBtn");
  const inputs = document.querySelectorAll("input");
  const mouseLight = document.getElementById("mouse-light");

  // =======================
  // Load Profile
  // =======================
  const savedProfile = localStorage.getItem(`profile_${userId}`);

  let data = {};
  if (savedProfile) {
    try {
      data = JSON.parse(savedProfile);
    } catch {
      data = {};
    }
  }

  fullname.value = data.fullname || "";
  classInput.value = data.class || "";
  number.value = data.number || "";
  email.value = data.email || "";
  phone.value = data.phone || "";

  // =======================
  // Form Control
  // =======================
  let isEditing = false;

  function checkForm() {
    if (!isEditing) return;

    const isValid =
      fullname.value.trim() !== "" &&
      classInput.value.trim() !== "" &&
      number.value.trim() !== "" &&
      email.value.trim() !== "";

    saveBtn.disabled = !isValid;

    if (isValid) {
      saveBtn.classList.add("active");
    } else {
      saveBtn.classList.remove("active");
    }
  }

  inputs.forEach(input => {
    input.disabled = true;
    input.addEventListener("input", checkForm);
  });

  saveBtn.disabled = true;

  editBtn.addEventListener("click", () => {
    isEditing = !isEditing;

    inputs.forEach(input => {
      input.disabled = !isEditing;
    });

    saveBtn.disabled = true;

    if (isEditing) checkForm();

    editBtn.textContent = isEditing ? "✖ Cancel" : "✎ Edit";
  });

  // =======================
  // Save
  // =======================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const profileData = {
      fullname: fullname.value,
      class: classInput.value,
      number: number.value,
      email: email.value,
      phone: phone.value
    };

    localStorage.setItem(
      `profile_${userId}`,
      JSON.stringify(profileData)
    );

    inputs.forEach(input => input.disabled = true);
    saveBtn.disabled = true;
    saveBtn.classList.remove("active");

    isEditing = false;
    editBtn.textContent = "✎ Edit";
  });

  // =======================
  // Mouse Light
  // =======================
  document.addEventListener("mousemove", (e) => {
    if (!mouseLight) return;

    mouseLight.style.background = `
      radial-gradient(
        circle at ${e.clientX}px ${e.clientY}px,
        rgba(255, 255, 255, 0.2),
        rgba(0, 0, 0, 0.6) 40%
      )
    `;
  });

});
