import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";

// Task Component: Clicking on the task opens the detail page
const Task = ({ todo, handleDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between border border-gray-300 hover:bg-gray-100 transition">
      <Link to={`task/${todo.id}`} className="flex items-center space-x-4 flex-grow">
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{todo.title}</span>
          <span className="text-sm text-gray-500">{todo.description}</span>
        </div>
      </Link>
      <button
        onClick={() => handleDelete(todo.id)}
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm"
      >
        Delete
      </button>
    </div>
  );
};

// Task List Component with "Create New Task" functionality
const TaskList1 = () => {
  const [allTodo, setAllTodo] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Fetch all tasks on load
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("http://127.0.0.1:8000/api/tasks/", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => data);
      setAllTodo(data);
    };
    getData();
  }, []);

  // Handle form input for creating new task
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (newTask.title && newTask.description) {
      const createdTask = await fetch("http://127.0.0.1:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then((data) => data);
      
      // Update task list after creating new task
      setAllTodo([...allTodo, createdTask]);
      setNewTask({ title: "", description: "" }); // Reset form
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: "DELETE",
    });

    // Update task list after deletion
    setAllTodo(allTodo.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-[1000px] mx-auto bg-gray-100 py-10 px-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">To Do</h1>

      {/* New Task Form */}
      <form
        onSubmit={handleCreateTask}
        className="mb-8 bg-white shadow-md rounded-lg p-6 border border-gray-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Create New Task</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Task title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Task description"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full font-medium transition"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {allTodo.map((todo) => (
          <Task key={todo.id} todo={todo} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default TaskList1;
