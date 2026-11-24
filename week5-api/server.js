const express = require("express");
const app = express();

app.use(express.json());

// Logger (Part B - Step 1)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Örnek veri dizisi (Part B - Step 1)
let events = [
  { id: 1, title: "Coding Night", date: "2026-11-20" },
  { id: 2, title: "Career Talk", date: "2026-11-27" }
];

// Tüm etkinlikleri getir (Part B - Step 2)
app.get("/api/events", (req, res) => {
  res.json(events);
});

// ID'ye göre tek etkinlik getir (Part B - Step 3)
app.get("/api/events/:id", (req, res) => {
  const id = Number(req.params.id);
  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
});

// Yeni etkinlik oluştur (Part C - Step 1)
app.post("/api/events", (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: "title and date are required" });
  }
  const event = { id: Date.now(), title, date };
  events.push(event);
  res.status(201).json(event);
});

app.listen(3000, () =>
  console.log("Server on http://localhost:3000")
);