const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;
const DB_FILE = path.join(__dirname, "data.json");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

let todos = [{ id: 1, title: "react", done: true }];

let nextId = 0;

function loadTodos() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE);
      todos = JSON.parse(raw);
      nextId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    } catch (e) {
      console.log("讀取data.json失敗");
      todos = [];
    }
  }
}
loadTodos();

function saveTodos() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
  } catch (e) {
    console.log("保存資料失敗", e);
  }
}

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title不能為空" });
  }
  const newTodo = { id: nextId++, title, done: false };
  todos.push(newTodo);
  saveTodos();
  res.status(201).json(newTodo);
});

app.patch("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo不存在" });
  }
  const { title, done } = req.body;
  if (typeof title === "string") todo.title = title;
  if (typeof done === "boolean") todo.done = done;

  saveTodos();
  res.json(todo);
});

app.delete("api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ err: "Todo 不存在" });
  }
  todos.splice(index, 1);
  saveTodos();
  res.status(204).end();
});

app.listen(port, () => {
  console.log("sever is run on 3000");
});
