const { createClient } = require("@supabase/supabase-js");
const config = require("./config");

// 創建 Supabase 客戶端
const supabase = createClient(config.supabase.url, config.supabase.anonKey);

// Todo 資料表名稱
const TODO_TABLE = "todos";

// 初始化資料表 (如果不存在)
async function initDatabase() {
  try {
    // 檢查資料表是否存在，如果不存在會自動創建
    const { data, error } = await supabase
      .from(TODO_TABLE)
      .select("*")
      .limit(1);

    if (error && error.code === "42P01") {
      // 資料表不存在，需要創建
      console.log("資料表不存在，請在 Supabase 控制台創建 todos 資料表");
      console.log("SQL 創建語句:");
      console.log(`
        CREATE TABLE todos (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          done BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
    } else if (error) {
      console.error("資料庫連接錯誤:", error);
    } else {
      console.log("資料庫連接成功");
    }
  } catch (err) {
    console.error("初始化資料庫失敗:", err);
  }
}

// 獲取所有 todos
async function getAllTodos() {
  try {
    const { data, error } = await supabase
      .from(TODO_TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("獲取 todos 失敗:", error);
    return [];
  }
}

// 創建新的 todo
async function createTodo(title) {
  try {
    const { data, error } = await supabase
      .from(TODO_TABLE)
      .insert([{ title, done: false }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("創建 todo 失敗:", error);
    throw error;
  }
}

// 更新 todo
async function updateTodo(id, updates) {
  try {
    const { data, error } = await supabase
      .from(TODO_TABLE)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("更新 todo 失敗:", error);
    throw error;
  }
}

// 刪除 todo
async function deleteTodo(id) {
  try {
    const { error } = await supabase.from(TODO_TABLE).delete().eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("刪除 todo 失敗:", error);
    throw error;
  }
}

module.exports = {
  initDatabase,
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
