const express = require("express");
const app = express();

/* =========================
   釣果データ（仮）
========================= */
let posts = [
  {
    fish: "カジキ",
    area: "相模湾",
    date: "2026-07-03",
    size: "120kg",
    lure: "トップウォーター",
    condition: "晴れ・凪",
    time: "07:30"
  }
];

/* =========================
   API
========================= */
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

/* =========================
   スマホUI
========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>光 AI</title>
<style>
body { font-family: sans-serif; padding: 20px; background:#f5f5f5; }
.card { background:white; padding:12px; margin:10px 0; border-radius:10px; }
h1 { font-size: 22px; }
</style>
</head>
<body>

<h1>🎣 爆釣光AI</h1>
<div id="list">loading...</div>

<script>
async function load() {
  const res = await fetch('/api/posts');
  const data = await res.json();

  document.getElementById('list').innerHTML =
    data.map(p => \`
      <div class="card">
        <b>\${p.fish}</b><br>
        📍 \${p.area}<br>
        📅 \${p.date}<br>
        ⚖️ \${p.size}<br>
        🎣 \${p.lure}<br>
        ☀️ \${p.condition}<br>
        🕒 \${p.time}
      </div>
    \`).join('');
}

load();
setInterval(load, 60000);
</script>

</body>
</html>
  `);
});

/* =========================
   起動（Vercel用）
========================= */
module.exports = app;
