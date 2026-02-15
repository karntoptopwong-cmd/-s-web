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

      // 🔍 ตรวจสอบ username ซ้ำ
      const { data: existingUser } = await window.supabaseClient
        .from("users")
        .select("username")
        .eq("username", username)
        .single();

      if (existingUser) {
        errorMsg.textContent = "ชื่อผู้ใช้นี้ถูกใช้แล้ว";
        return;
      }

    } catch {
      // ไม่พบ user = ใช้งานได้
    }

    // ✅ บันทึกผู้ใช้ใหม่
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
      console.error(error);
      errorMsg.textContent = "สมัครสมาชิกไม่สำเร็จ";
      return;
    }

    alert("สมัครสมาชิกสำเร็จ!");

    // ไปหน้า login
    window.location.href = "index.html";
  });

});
