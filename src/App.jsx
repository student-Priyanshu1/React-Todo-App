import React, { useState, useEffect } from "react";

const App = () => {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Task
  const addTask = (e) => {
    e.preventDefault();

    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setTask("");
  };

  // Delete Task
  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-purple-500 flex justify-center items-start pt-20">

      <div className="bg-white shadow-xl rounded-xl p-6 w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          📝 My Todo List
        </h1>

        <form onSubmit={addTask} className="flex gap-2 mb-6">

          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border p-2 rounded focus:outline-none"
          />

          <button className="bg-indigo-500 text-white px-4 rounded hover:bg-indigo-600">
            Add
          </button>

        </form>

        <ul>

          {todos.length === 0 && (
            <p className="text-gray-500 text-center">
              No tasks yet
            </p>
          )}

          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
            >

              <div className="flex items-center gap-2">

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />

                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {todo.text}
                </span>

              </div>

              <button
                onClick={() => deleteTask(todo.id)}
                className="text-red-500 font-bold text-lg"
              >
                ✕
              </button>

            </li>
          ))}

        </ul>

      </div>
    </div>
  );
};

export default App;