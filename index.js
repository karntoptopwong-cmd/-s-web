document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("errorMsg");

  if (!loginForm || !errorMsg) {
    console.error("HTML element ไม่ครบ (login)");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      errorMsg.textContent = "กรุณากรอกข้อมูล";
      return;
    }

    try {

      if (!window.supabaseClient) {
        errorMsg.textContent = "Supabase ยังไม่โหลด";
        return;
      }

      // 🔍 ตรวจสอบผู้ใช้
      const { data, error } = await window.supabaseClient
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error || !data) {
        errorMsg.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        return;
      }

      // ✅ สร้าง token
      const token = crypto.randomUUID();

      // ✅ บันทึก token ลงฐานข้อมูล
      await window.supabaseClient
        .from("users")
        .update({
          token: token,
          token_expire: new Date(Date.now() + 86400000) // 1 วัน
        })
        .eq("id", data.id);

      // ✅ บันทึก session ลงเครื่องผู้ใช้
      localStorage.setItem("session", JSON.stringify({
        username: data.username,
        score: data.score,
        token: token,
        expireAt: Date.now() + 86400000
      }));

      // ✅ ไปหน้า dashboard
      window.location.href = "loggedin.html";

    } catch (err) {
      console.error(err);
      errorMsg.textContent = "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้";
    }
  });

});
