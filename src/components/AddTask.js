import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddTask({setAddTask,getAllTask}) {
  
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });
  const [err,setErr] = useState();
  const [btnShow,setBtnShow] = useState("Create Task");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        setBtnShow("Loading .. ")
        const jwtToken = localStorage.getItem('SavedToken');
        
        const response = await axios.post('http://localhost:4000/createTask',
         taskData,
         {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${jwtToken}`,
            },
          }
         );
        console.log(response,"res");
        if(response.data.success)
        {
            setTimeout(() => {
                setAddTask(false);
               }, 1800);
          getAllTask();
          setBtnShow(response.data.message) 
        }else{
            setBtnShow("Try again") 
          setErr(response.data.message);
        }
        setTaskData({ title: '', description: '' });
      } catch (error) {
        setBtnShow("Try again") 
        setErr('Some internal error occured')
        console.error('Login error:', error);
      }
      
  };

  return (
    <div className='addTask'>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Description:</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <p>{err}</p>
        <div>
          <button className="btn btn-outline-primary"
           type="submit">{btnShow}</button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
