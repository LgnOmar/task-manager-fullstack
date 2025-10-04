import { useState } from "react";
import apiClient from "../api";

// revieve the onTaskAdded function as a prop
function AddTaskForm({ onTaskAdded }){
    // State to manage the title of the new task
    const [title, setTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation: do not submit if title is empty
        if (!title.trim()) {
            return;
        }

        try {
            // Use our apiClient to send a POST request
            const response = await apiClient.post('/tasks/', {
                title: title,
            });

            // call the function passed down from the parent to notify it that a new task has been created.
            // we pass the new task object from the API response
            onTaskAdded(response.data);

            setTitle('');

        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
            Add Task
        </button>
        </form>
    );
}

export default AddTaskForm;