-auth.js
// ===== อ่าน session =====
function getSession() {
  const raw = localStorage.getItem("session");
  if (!raw) return null;

  try {
    const session = JSON.parse(raw);

    // เช็คหมดอายุ
    if (session.expireAt && Date.now() > session.expireAt) {
      localStorage.removeItem("session");
      return null;
    }

    return session;
  } catch {
    localStorage.removeItem("session");
    return null;
  }
}

// ===== บังคับให้ login ก่อนเข้า =====
function requireAuth() {
  const session = getSession();

  if (!session) {
    window.location.href = "index.html";
    return null;
  }

  return session;
}

// ===== logout =====
function logout() {
  localStorage.removeItem("session");
  window.location.href = "index.html";
}

// ===== ใช้กับ API (ถ้ามี token) =====
function getAuthHeader() {
  const session = getSession();
  if (!session || !session.token) return {};

  return {
    Authorization: `Bearer ${session.token}`
  };
}

// ทำให้เรียกใช้จาก HTML ได้
window.getSession = getSession;
window.requireAuth = requireAuth;
window.logout = logout;
window.getAuthHeader = getAuthHeader;


