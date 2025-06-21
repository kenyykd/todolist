# Todo List 專案

這是一個使用 Node.js、Express 和 Supabase 搭建，並成功部署在 AWS EC2 上的 RESTful API 專案。

## 專案預覽圖

<!-- 在這裡貼上您的專案截圖 -->

![Image](https://github.com/user-attachments/assets/2aa3f60a-878f-41c0-aafa-41eef07194be)

## 線上部署網址

您可以透過以下網址，直接與部署在雲端的專案互動：

- **前端頁面**: [http://13.239.240.99:3000](http://13.239.240.99:3000)

## 功能特色

- ✅ 完整的 CRUD (創建、讀取、更新、刪除) 功能
- ✅ 使用 Supabase 作為雲端資料庫
- ✅ 成功部署於 AWS EC2 雲端伺服器
- ✅ 透過 PM2 進行程序管理，確保服務穩定運行

## 技術棧 (Technology Stack)

- **後端**: Node.js, Express.js
- **資料庫**: Supabase (PostgreSQL)
- **雲端平台**: AWS EC2 (Amazon Linux)
- **程序管理**: PM2
- **版本控制**: Git & GitHub

## API 端點

- `GET /api/todos` - 獲取所有 todos
- `POST /api/todos` - 創建新 todo
- `PATCH /api/todos/:id` - 更新 todo
- `DELETE /api/todos/:id` - 刪除 todo
