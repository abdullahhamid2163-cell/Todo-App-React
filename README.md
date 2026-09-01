# 📝 React Todo App

A simple and responsive **Todo Management Application** built with React.js.  
The application includes user registration, login authentication, protected routes, and complete CRUD operations for managing personal tasks.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- Email validation
- Password validation
- Show/Hide Password
- Duplicate email checking
- Logout functionality
- User data stored in `localStorage`

### 🛡️ Protected Routes
- Dashboard is protected from unauthorized users
- Users who are not logged in are redirected to the Login page
- Only authenticated users can access their dashboard

### ✅ Todo Management
- Add new tasks
- View tasks
- Update tasks
- Delete tasks
- Tasks are associated with the logged-in user
- Each user can see only their own tasks

### 🎨 UI
- Clean and simple interface
- Responsive design
- Tailwind CSS styling
- User-friendly error messages

---

## 🛠️ Technologies Used

- **React.js**
- **JavaScript**
- **React Router DOM**
- **Tailwind CSS**
- **JSON Server**
- **LocalStorage**
- **Vite**
- **HTML5**
- **CSS3**

---

## 📂 Project Structure


src/
│
├── components/
│   ├── auth
│   │       ├── Registration.jsx
│   │       └── Login.jsx
│   │  
│   └── Dashboard.jsx
│
├── App.jsx
├── main.jsx
└── index.css
│
├── db.json
└── package.json
