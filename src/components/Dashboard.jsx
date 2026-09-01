import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const getTodos = async () => {
    const response = await fetch("http://localhost:3000/todos");
    const data = await response.json();

    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (task.trim() === "") return;

    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task,
      }),
    });

    const newTodo = await response.json();

    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id) => {
    const newTask = prompt("Enter new task:");

    if (newTask === null || newTask.trim() === "") return;

    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTask,
      }),
    });

    const updatedTodo = await response.json();

    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };
  const handleLogOut = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Log Out
          </button>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 flex-1 rounded"
          />

          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
            >
              <span>{todo.title}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => updateTodo(todo.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
