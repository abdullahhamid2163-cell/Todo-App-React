import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const getTodos = async () => {
    if (!user || !user.id) return;

    const response = await fetch(`http://localhost:3000/todos`);
    const allTodos = await response.json();

    const userTodos = allTodos.filter(
      (todo) => String(todo.userId) === String(user.id),
    );

    setTodos(userTodos);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getTodos();
    }
  }, []);

  const addTodo = async () => {
    if (!task.trim()) {
      setError("Task title cannot be empty.");
      return;
    }
    setError("");

    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.trim(),
        userId: String(user.id), // Stored as a string to guarantee exact matching
      }),
    });

    const newTodo = await response.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTask("");
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id, currentTitle) => {
    const newTask = prompt("Enter new task:", currentTitle);

    if (newTask === null) return;
    if (!newTask.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTask.trim(),
      }),
    });

    const updatedTodo = await response.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
    );
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Welcome, {user?.name}</h1>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm text-center">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 flex-1 rounded focus:outline-blue-500"
          />

          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center text-sm py-4">
              No tasks found. Add your first task above!
            </p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
              >
                <span className="break-all">{todo.title}</span>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => updateTodo(todo.id, todo.title)}
                    className="bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600 transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
