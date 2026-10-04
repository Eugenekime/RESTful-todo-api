# Todo REST API

A RESTful API for managing todos built with **Node.js, TypeScript and Express**.

## 🚀 Tech Stack

- Node.js
- TypeScript
- Express
- Helmet
- CORS
- Morgan
- In-memory data storage

## 📁 Project Structure

```text
src/
├── controller/
│   └── todoController.ts
├── middleware/
│   ├── validation.ts
│   ├── errorHandler.ts
│   └── notFoundHandler.ts
├── routes/
│   ├── index.ts
│   └── todos.ts
├── services/
│   └── todoService.ts
├── types/
│   └── todo.types.ts
└── index.ts
```

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Eugenekime/RESTful-todo-api
cd RESTful-todo-api
npm install
```

## ▶️ Running the API

### Development

```bash
npm run dev
```

The server will start at:

```text
http://localhost:3001
```

### Production

Build the project:

```bash
npm run build
```

Then start the compiled application:

```bash
npm start
```

### Type checking

```bash
npm run type-check
```

## 🔗 API

### API information

```http
GET /
```

Returns basic information about the API.

### Health check

```http
GET /api/health
```

Returns the current API status.

### Get all todos

```http
GET /api/todos
```

Supports filtering and pagination.

Query parameters:

```text
page
limit
completed
priority
search
```

Example:

```http
GET /api/todos?page=1&limit=10
```

### Get todo by ID

```http
GET /api/todos/:id
```

Example:

```http
GET /api/todos/1
```

### Create a todo

```http
POST /api/todos
```

Request body:

```json
{
  "text": "Learn TypeScript",
  "priority": "high",
  "category": "study"
}
```

### Update a todo

```http
PUT /api/todos/:id
```

Example:

```json
{
  "text": "Learn TypeScript deeply",
  "priority": "high",
  "category": "study"
}
```

### Partially update a todo

```http
PATCH /api/todos/:id
```

Example:

```json
{
  "completed": true
}
```

### Delete a todo

```http
DELETE /api/todos/:id
```

Example:

```http
DELETE /api/todos/1
```

### Get todo statistics

```http
GET /api/todos/stats
```

Returns statistics such as:

- total todos
- completed todos
- pending todos
- todos grouped by priority

## 📦 Todo structure

A todo has the following structure:

```json
{
  "id": 1,
  "text": "Learn TypeScript",
  "completed": false,
  "priority": "high",
  "category": "study",
  "createdAt": "2026-10-01T10:00:00.000Z"
}
```

`priority` can be:

```text
low
medium
high
```

`category` is optional.

## 🛡️ Error Handling

The API returns structured error responses.

Example:

```json
{
  "success": false,
  "error": "Validation failed",
  "details": []
}
```

Unknown routes return:

```json
{
  "success": false,
  "error": "Not Found",
  "message": "Route not found"
}
```

## 🔧 Environment

The server uses port `3001` by default.

You can specify another port using the `PORT` environment variable:

```bash
PORT=4000 npm run dev
```

## 📜 Available Scripts

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Start development server                |
| `npm run build`      | Compile TypeScript                      |
| `npm start`          | Start compiled application              |
| `npm run type-check` | Check TypeScript types without building |

## 📝 Notes

This project currently uses **in-memory storage**, so todos are reset whenever the server restarts.

The project uses **ES Modules (ESM)** and TypeScript.
