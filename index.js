const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config");
const {
  initDatabase,
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./database");

const app = express();
const port = config.server.port;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// 初始化資料庫
initDatabase();

// 獲取所有 todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error("獲取 todos 失敗:", error);
    res.status(500).json({ error: "獲取資料失敗" });
  }
});

// 創建新的 todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "title不能為空" });
    }

    const newTodo = await createTodo(title);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("創建 todo 失敗:", error);
    res.status(500).json({ error: "創建失敗" });
  }
});

// 更新 todo
app.patch("/api/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    const updates = {};
    if (typeof title === "string") updates.title = title;
    if (typeof done === "boolean") updates.done = done;

    const updatedTodo = await updateTodo(id, updates);
    res.json(updatedTodo);
  } catch (error) {
    console.error("更新 todo 失敗:", error);
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "Todo不存在" });
    }
    res.status(500).json({ error: "更新失敗" });
  }
});

// 刪除 todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteTodo(id);
    res.status(204).end();
  } catch (error) {
    console.error("刪除 todo 失敗:", error);
    res.status(500).json({ error: "刪除失敗" });
  }
});

app.listen(port, () => {
  console.log(`伺服器運行在 port ${port}`);
});
