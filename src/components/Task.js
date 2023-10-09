import { useState } from "react";
import UpdateTask from "./UpdateTask";
import axios from 'axios';

function Task({ task ,getAllTask,index}) {

    const [update, setUpdate] = useState(false);

    const handleDelete = async()=>{
        
        const jwtToken = localStorage.getItem('SavedToken');
        const response = await axios.delete(`http://localhost:4000/tasks/${task?._id}`,
             
             {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${jwtToken}`,
                },
              }
             );
        
            getAllTask();
    }

    return (
        <div className="task">
            {
                update ? <UpdateTask task={task} getAllTask={getAllTask} setUpdate={setUpdate}/>
                    :
                    <div>
                        <h5>{task.title}</h5>
                        <p>{task.description}
                        </p>
                        <div className="update">
                            <button className="btn" onClick={() => {
                                setUpdate(true);
                            }}>
                                <i class="ri-edit-box-line"></i>
                            </button>
                            <button 
                            className="btn"
                            onClick={handleDelete}
                            >
                                <i class="ri-delete-bin-7-line"></i>
                            </button>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Task;
