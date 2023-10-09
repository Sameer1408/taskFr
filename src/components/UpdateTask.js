import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';

function UpdateTask({ task, setUpdate ,getAllTask}) {

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [task])


    const [taskData, setTaskData] = useState({
        title: task?.title,
        description: task?.description,
    });
    const [err, setErr] = useState();
    const [btnShow,setBtnShow] = useState("Update task")

    // console.log(task, "task");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSave = async () => {
        try {
            // Send an Axios PUT request to update the task data
            setBtnShow("Loading .. ")
            const jwtToken = localStorage.getItem('SavedToken');
            
            const response = await axios.put(`http://localhost:4000/tasks/${task?._id}`,
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
                    setUpdate(false);
                    setTaskData({ title: '', description: '' });
                   }, 1800);
                   getAllTask();
              setBtnShow(response.data.message) 
            }else{
              setBtnShow("Try again") 
              setErr(response.data.message);
            }
            
        } catch (error) {
            // Handle update error (e.g., display an error message)
            console.error('Error updating task:', error);
            setBtnShow("Try again") 
            setErr("Some internal error");
        }
    };

    return (
        <div ref={ref} className='EditTask'>
            <h2>Edit Task</h2>
            <form>
                <div className='form-group'>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='updateCancel'>
                    <button type="button" 
                    className="btn btn-outline-primary btn1" 
                    onClick={handleSave}>{btnShow}</button>
                    <button type="button"
                        className="btn btn-outline-secondary btn2"
                        onClick={() => {
                            setUpdate(false)

                        }}
                    ><i class="ri-close-fill"></i></button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTask;
