import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const getData = async () => {
      const url = `http://127.0.0.1:8000/api/tasks/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setTask(data);
      setEditTitle(data.title);
      setEditDescription(data.description);
    };
    getData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);  // Enable editing mode
  };

  const handleSaveClick = async () => {
    const updatedTask = {
      ...task,
      title: editTitle,
      description: editDescription,
      updated_at: new Date().toISOString(),  // Update the timestamp
    };

    // Send PUT request to update the task
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Update local state with the new task data
      setTask(updatedTask);
      setIsEditing(false);  // Disable editing mode
    } catch (error) {
      console.error("Error updating task:", error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Details</h1>
        <span className="text-sm font-medium text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
          ID: {task?.id}
        </span>
      </div>

      <div className="border-t border-gray-300 pt-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Title:</h2>
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            />
          ) : (
            <p className="text-gray-600 mt-1">{task?.title}</p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Description:</h2>
          {isEditing ? (
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
              rows={4}
            />
          ) : (
            <p className="text-gray-600 mt-1">{task?.description}</p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Created At:</h2>
          <p className="text-gray-500 mt-1">{new Date(task?.created_at).toLocaleString()}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Updated At:</h2>
          <p className="text-gray-500 mt-1">{new Date(task?.updated_at).toLocaleString()}</p>
        </div>

        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
