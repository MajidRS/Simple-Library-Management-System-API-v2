# 📚 Books API

A RESTful API for managing a books collection, built with **Node.js**, **Express**, and **MongoDB**. Includes advanced querying features and an interactive documentation UI served as a static frontend.

---

## 🚀 Features

- Full **CRUD** operations for books
- **Advanced querying**: filtering, sorting, field selection, and pagination
- **Comparison operators**: `$gt`, `$gte`, `$lt`, `$lte`, `$in`
- Environment-based **error handling** (development vs. production)
- **Interactive API documentation** UI (served as static HTML)
- ESLint + Prettier for consistent code style

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Runtime      | Node.js (ESM)                       |
| Framework    | Express 5                           |
| Database     | MongoDB via Mongoose 9              |
| Query Parser | qs                                  |
| Dev Tools    | Nodemon, ESLint, Prettier           |
| Config       | dotenv                              |

---

## 📁 Project Structure

```
├── server.js                  # Entry point, DB connection, process error handlers
├── app.js                     # Express app setup, middleware, routes
├── config.env                 # Environment variables (not committed)
├── package.json
├── eslint.config.js
├── .gitignore
│
├── controllers/
│   ├── bookController.js      # CRUD handlers
│   └── errorController.js     # Global error handler (dev/prod modes)
│
├── models/
│   └── bookModel.js           # Mongoose Book schema
│
├── routes/
│   └── bookRoute.js           # Book router
│
├── utils/
│   ├── apiFeatures.js         # Filtering, sorting, field limiting, pagination
│   ├── appError.js            # Custom operational error class
│   └── catchAsync.js          # Async error wrapper
│
└── public/
    ├── index.html             # Interactive API docs UI
    ├── index.js               # Frontend fetch logic
    └── style.css              # UI styles
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB instance)

### Installation

```bash
git clone https://github.com/your-username/books-api.git
cd books-api
npm install
```

### Configuration

Create a `config.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/books
DATABASE_PASSWORD=your_password
```

### Running the App

```bash
# Development
npm start

# Production
npm run start:prod
```

The server starts on `http://localhost:3000` by default.

---

## 📖 API Reference

Base URL: `/api/v1/books`

### Endpoints

| Method   | Endpoint           | Description          |
|----------|--------------------|----------------------|
| `GET`    | `/api/v1/books`    | Get all books        |
| `GET`    | `/api/v1/books/:id`| Get a single book    |
| `POST`   | `/api/v1/books`    | Create a new book    |
| `PATCH`  | `/api/v1/books/:id`| Update a book        |
| `DELETE` | `/api/v1/books/:id`| Delete a book        |

---

### Query Features

#### Filtering

```
GET /api/v1/books?year=1960
GET /api/v1/books?year[gt]=1950
GET /api/v1/books?year[gte]=2000
GET /api/v1/books?year[lt]=1900
GET /api/v1/books?year[lte]=2000
GET /api/v1/books?year[in]=1960,2003
```

#### Sorting

```
GET /api/v1/books?sort=title
GET /api/v1/books?sort=-year        # descending
GET /api/v1/books?sort=author,year  # multi-field
```

Default sort: `year` (ascending).

#### Field Selection

```
GET /api/v1/books?fields=title,author,year
```

Default fields returned: `title`, `author`, `year`.

#### Pagination

```
GET /api/v1/books?page=2&limit=5
```

- Default: `page=1`, `limit=10`
- Maximum limit: `20`

---

### Request Body (POST / PATCH)

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": ["fiction", "classic"],
  "year": 1925,
  "available": true
}
```

### Book Schema

| Field       | Type       | Required | Notes                          |
|-------------|------------|----------|--------------------------------|
| `title`     | String     | ✅       | Trimmed, lowercased            |
| `author`    | String     | ✅       | Trimmed, lowercased            |
| `genre`     | [String]   | ❌       | Array of genre strings         |
| `year`      | Number     | ❌       | Publication year               |
| `available` | Boolean    | ❌       | Defaults to `true`             |
| `createdAt` | Date       | auto     | Mongoose timestamp             |
| `updatedAt` | Date       | auto     | Mongoose timestamp             |

---

### Response Format

**Success**
```json
{
  "status": "success",
  "result": 10,
  "data": {
    "books": [...]
  }
}
```

**Error (development)**
```json
{
  "status": "fail",
  "message": "No book found with that ID",
  "error": {},
  "stack": "..."
}
```

**Error (production)**
```json
{
  "status": "fail",
  "message": "No book found with that ID"
}
```

---

## 🧩 Error Handling

- **`AppError`** — custom error class with `statusCode`, `status`, and `isOperational` flag
- **`catchAsync`** — wraps async route handlers to forward errors to Express
- **`globalErrorsHandler`** — Express error middleware with two modes:
  - `development`: returns full error object + stack trace
  - `production`: returns clean message for operational errors; generic `500` for unexpected ones
- Handles `CastError` (invalid MongoDB ID) and duplicate key errors (`code 11000`)

---

## 🎨 Interactive Docs UI

The project serves a built-in interactive documentation page at:

```
http://localhost:3000
```

It lets you try every endpoint directly from the browser — including filtering, pagination, creating, updating, and deleting books — with live JSON responses.

---

## 🧹 Linting & Formatting

```bash
npm run lint        # Check for ESLint issues
npm run lint:fix    # Auto-fix ESLint issues
npm run format      # Format with Prettier
```

---

## 📝 License

ISC
