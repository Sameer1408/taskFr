import React, { useState } from 'react';

function CreateTask() {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setTaskData({ title: '', description: '' });
  };

  return (
    <div>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create Task</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
