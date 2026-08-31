import { useEffect, useState } from "react";

const Dashboard = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // GET TODOS
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();

      setTodos(data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  // GET DATA WHEN COMPONENT LOADS
  useEffect(() => {
    getTodos();
  }, []);

  // ADD TODO
  const addTodo = async () => {
    if (task.trim() === "") return;

    const newTodo = {
      title: task,
    };

    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const data = await response.json();

      setTodos([...todos, data]);
      setTask("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  // UPDATE TODO
  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);

    const newTask = prompt("Update your task:", todo.title);

    if (!newTask || newTask.trim() === "") return;

    const updatedTodo = {
      title: newTask,
    };

    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      const data = await response.json();

      setTodos(
        todos.map((todo) => (todo.id === id ? data : todo))
      );
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-6">
          Todo App
        </h3>

        <div className="flex gap-2 mb-4">
          <input
            className="border border-gray-300 p-2 flex-1 rounded outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter Task..."
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />

          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            onClick={addTodo}
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
              <span className="break-all">
                {todo.title}
              </span>

              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={() => updateTodo(todo.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Update
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
