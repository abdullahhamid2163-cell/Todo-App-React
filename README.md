# 📝 React Todo App

A simple and responsive Todo application built with **React.js**, **Tailwind CSS**, and **JSON Server**.
This project demonstrates complete **CRUD operations** with data persistence using a local JSON database.

## 🚀 Features

* ✅ Add new todos
* ✏️ Update existing todos
* 🗑️ Delete todos
* 📋 Display all todos
* 💾 Store todos in JSON Server
* 🔄 Fetch todos when the application loads
* 📱 Responsive UI
* 🎨 Styled completely with Tailwind CSS
* ⚛️ Built with React Hooks

## 🛠️ Technologies Used

* React.js
* JavaScript
* Tailwind CSS
* JSON Server
* Fetch API
* Vite
* HTML5
* CSS

## 📂 Project Structure

```text
Todo App/
├── public/
├── src/
│   ├── components/
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── db.json
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project directory:

```bash
cd Todo-App
```

Install dependencies:

```bash
npm install
```

## ▶️ Run the Project

You need to run **React** and **JSON Server** separately.

### Start React

```bash
npm run dev
```

### Start JSON Server

Open another terminal and run:

```bash
npm run server
```

JSON Server will run on:

```text
http://localhost:3000
```

The Todo API is:

```text
http://localhost:3000/todos
```

## 🔄 CRUD Operations

This application performs all four CRUD operations:

| Operation   | HTTP Method | Endpoint     |
| ----------- | ----------- | ------------ |
| Create Todo | POST        | `/todos`     |
| Read Todos  | GET         | `/todos`     |
| Update Todo | PUT         | `/todos/:id` |
| Delete Todo | DELETE      | `/todos/:id` |

## 💾 Data Storage

Todos are stored locally inside `db.json`.

Example:

```json
{
  "todos": [
    {
      "id": "1",
      "title": "Learn React"
    },
    {
      "id": "2",
      "title": "Learn TypeScript"
    }
  ]
}
```

## 🎨 Tailwind CSS

The application uses Tailwind CSS for styling instead of traditional CSS classes.

Example:

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Add
</button>
```

## 📸 Screenshots

Add screenshots of your application here:

```text
![Todo App Screenshot](screenshot.png)
```

## 📚 What I Learned

Through this project, I practiced:

* React components
* `useState`
* `useEffect`
* Event handling
* Controlled inputs
* Array methods such as `map()` and `filter()`
* REST API requests
* Fetch API
* CRUD operations
* JSON Server
* Tailwind CSS
* Working with Git and GitHub

## 👨‍💻 Author

**Abdullah**

Built as a React.js practice project.
