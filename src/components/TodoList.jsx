import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([{ id: Date.now(), text: newTodo, completed: false }, ...todos]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (todoToDelete) => {
    const updatedTodos = todos.filter((todo) => todo !== todoToDelete);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else if (filter === "active") {
      return !todo.completed;
    }
    return true;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-blue-100 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded mr-2"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          className="text-white bg-gradient-to-r from-cyan-400
                    via-cyan-500 to-cyan-600 font-medium
                     hover:bg-gradient-to-br 
                      focus:ring-cyan-300 dark:focus:ring-cyan-800 
                    rounded-lg text-sm px-6 py-2.5 text-center me-2 "
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <div className="mb-4">
        <button
          className={`mr-2 p-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`mr-2 p-2 rounded ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </button>
        <button
          className={`p-2 rounded ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("active")}
        >
          Active
        </button>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between bg-blue-300
            items-center p-2 mb-2 border rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={todo.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
            </div>
            <button
              className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDeleteTodo(todo)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
