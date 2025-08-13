import React, { useEffect, useState } from "react";
import API from "./api"; // <-- use API instead of axios

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>📋 Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
