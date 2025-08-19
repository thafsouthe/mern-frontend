import React, { useEffect, useState } from "react";
import API from "./api"; // axios instance

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from backend
  useEffect(() => {
    API.get("/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle adding new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await API.post("/api/tasks", { title: newTask });
      setTasks([...tasks, res.data]); // update UI
      setNewTask(""); // clear input
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>📋 Task List</h1>
      
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
