document.addEventListener("DOMContentLoaded", () => {

  const session = getSession();
  if (!session) {
    location.href = "index.html";
    return;
  }

  const username = session.username;
  document.getElementById("usernameDisplay").textContent = username;

  const key = `profile_${username}`;
  let data = {};

  try {
    data = JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    data = {};
  }

  fullname.value = data.fullname || "";
  classInput.value = data.class || "";
  number.value = data.number || "";
  email.value = data.email || "";
  phone.value = data.phone || "";

  // save
  profileForm.addEventListener("submit", e => {
    e.preventDefault();

    localStorage.setItem(key, JSON.stringify({
      fullname: fullname.value,
      class: classInput.value,
      number: number.value,
      email: email.value,
      phone: phone.value
    }));
  });
});
