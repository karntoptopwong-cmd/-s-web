// auth.js
export function getSession() {
  const raw = localStorage.getItem("session");
  if (!raw) return null;

  try {
    const session = JSON.parse(raw);

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

export function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = "index.html";
    return null;
  }
  return session;
}

export function logout() {
  localStorage.removeItem("session");
  window.location.href = "index.html";
}

// ใช้เวลาคุย backend
export function getAuthHeader() {
  const session = getSession();
  if (!session) return {};
  return {
    "Authorization": "Bearer " + session.token
  };
}
