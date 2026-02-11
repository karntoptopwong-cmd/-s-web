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
