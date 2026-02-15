document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signupForm");
  const errorMsg = document.getElementById("errorMsg");

  if (!form || !errorMsg) {
    console.error("HTML element ไม่ครบ (create)");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !password || !confirmPassword) {
      errorMsg.textContent = "กรุณากรอกข้อมูลให้ครบ";
      return;
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = "รหัสผ่านไม่ตรงกัน";
      return;
    }

    if (!window.supabaseClient) {
      errorMsg.textContent = "Supabase ยังไม่โหลด";
      return;
    }

    try {
      // 🔎 ตรวจ username ซ้ำ
      const { data: existingUser } = await window.supabaseClient
        .from("users")
        .select("username")
        .eq("username", username)
        .single();

      if (existingUser) {
        errorMsg.textContent = "ชื่อผู้ใช้นี้ถูกใช้แล้ว";
        return;
      }

      // ✅ เพิ่มผู้ใช้ใหม่
      const { error } = await window.supabaseClient
        .from("users")
        .insert([
          {
            username: username,
            password: password,
            score: 0
          }
        ]);

      if (error) {
        errorMsg.textContent = "สมัครไม่ได้: " + error.message;
        return;
      }

      alert("สมัครสำเร็จ!");
      window.location.href = "index.html";

    } catch (err) {
      console.error(err);
      errorMsg.textContent = "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้";
    }
  });
});
