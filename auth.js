
function getSession() {
  const raw = localStorage.getItem("session");
  if (!raw) return null;

  try {
    const session = JSON.parse(raw);
    if (Date.now() > session.expireAt) {
      localStorage.removeItem("session");
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem("session");
    return null;
  }
}
