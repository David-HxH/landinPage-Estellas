const target = new Date("2025-12-20T09:00:00"); // Target: 21 December 2025, at 09:00:00 hora local

(function setEventLabel() {                   // Formatea fecha + hora (usa el mismo objeto `target`)
  const span = document.getElementById("eventDate");
  if (!span) return;
  const datePart = target.toLocaleDateString("es-CL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hh = target.getHours(); // 9
  const mm = String(target.getMinutes()).padStart(2, "0"); // "00"
  span.textContent = `${datePart} a las ${hh}:${mm}`;
})();

const d = document.getElementById("days"),
  h = document.getElementById("hours"),
  m = document.getElementById("minutes"),
  s = document.getElementById("seconds");
const pad = (n) => String(n).padStart(2, "0");
function tick() {
  const now = new Date();
  let diff = target - now;
  if (diff <= 0) {
    d.textContent = "0";
    h.textContent = "00";
    m.textContent = "00";
    s.textContent = "00";
    return;
  }
  const t = Math.floor(diff / 1000);
  d.textContent = Math.floor(t / 86400);
  h.textContent = pad(Math.floor((t % 86400) / 3600));
  m.textContent = pad(Math.floor((t % 3600) / 60));
  s.textContent = pad(t % 60);
}
tick();
setInterval(tick, 1000);