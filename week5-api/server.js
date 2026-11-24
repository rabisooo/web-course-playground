const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Örnek veri dizisi
let events = [
  { id: 1, title: "Coding Night", date: "2026-11-20" },
  { id: 2, title: "Career Talk", date: "2026-11-27" }
];

// GET all
app.get("/api/events", (req, res) => {
  res.json(events);
});

// GET one
app.get("/api/events/:id", (req, res) => {
  const id = Number(req.params.id);
  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
});

// POST create
app.post("/api/events", (req, res) => {
  const { title, date } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: "title and date are required" });
  }
  const event = { id: Date.now(), title, date };
  events.push(event);
  res.status(201).json(event);
});

// PUT update (Part D - Step 1)
app.put("/api/events/:id", (req, res) => {
  const event = events.find(e => e.id === Number(req.params.id));
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  event.title = req.body.title ?? event.title;
  event.date = req.body.date ?? event.date;
  res.json(event);
});

// DELETE remove (Part D - Step 2)
app.delete("/api/events/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!events.some(e => e.id === id)) {
    return res.status(404).json({ error: "Event not found" });
  }
  events = events.filter(e => e.id !== id);
  res.status(204).end();
});

app.listen(3000, () =>
  console.log("Server on http://localhost:3000")
);