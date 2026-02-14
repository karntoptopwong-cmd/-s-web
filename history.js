document.addEventListener("DOMContentLoaded", () => {

  const session = getSession();
  if (!session) {
    location.href = "index.html";
    return;
  }

  const username = session.username;
  const historyList = document.getElementById("historyList");

  let history = [];
  try {
    history = JSON.parse(localStorage.getItem(`history_${username}`)) || [];
  } catch {
    history = [];
  }

  if (history.length === 0) {
    historyList.innerHTML = "<p>ยังไม่มีประวัติ</p>";
    return;
  }

  history.forEach(h => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `<b>${h.date}</b><br>คะแนน: ${h.points}`;
    historyList.appendChild(div);
  });
});
