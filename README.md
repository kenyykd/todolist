# Todo List 專案

這是一個使用 Express.js 和 Supabase 的 Todo List 應用程式。

## 功能特色

- ✅ 創建、讀取、更新、刪除 Todo 項目
- ✅ 雲端資料庫 (Supabase)
- ✅ RESTful API
- ✅ 環境變數配置

## 設置步驟

### 1. 安裝依賴

```bash
npm install
```

### 2. 設置 Supabase

1. 前往 [Supabase](https://supabase.com) 註冊帳號
2. 創建新專案
3. 在 SQL Editor 中執行以下 SQL 創建資料表：

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. 設置環境變數

創建 `.env` 檔案在專案根目錄：

```env
# Supabase 配置
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# 伺服器配置
PORT=3000
NODE_ENV=development
```

**如何獲取 Supabase 配置：**

1. 在 Supabase 專案控制台
2. 前往 Settings > API
3. 複製 Project URL 和 anon public key

### 4. 運行專案

```bash
npm run dev
```

## API 端點

- `GET /api/todos` - 獲取所有 todos
- `POST /api/todos` - 創建新 todo
- `PATCH /api/todos/:id` - 更新 todo
- `DELETE /api/todos/:id` - 刪除 todo

## 資料結構

```json
{
  "id": 1,
  "title": "學習 React",
  "done": false,
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

## 技術棧

- **後端**: Express.js
- **資料庫**: Supabase (PostgreSQL)
- **環境變數**: dotenv
- **CORS**: 支援跨域請求
