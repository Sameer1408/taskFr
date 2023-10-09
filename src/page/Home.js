import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import AllTask from "../components/AllTask";
import AddTask from "../components/AddTask";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTask } from "../state/action-creators";
import { setUser } from "../state/action-creators";

function Home() {

    const dispatch = useDispatch();
    
    const [addTask, setAddTask] = useState(false);
    const [allTask, setAllTask] = useState([]);

    const getAllTask = async () => {
        setTimeout(async()=>{
            const jwtToken = localStorage.getItem('SavedToken');
            const response = await axios.get('http://localhost:4000/allTasks',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${jwtToken}`,
                },
            }
            );
            console.log(response.data);
            setAllTask(response.data);
            dispatch(setTask(response.data));
        },[2000])
    }

    useEffect(() => {
        getAllTask();
        dispatch(setUser());
    }, [])

    return (
        <div className="home">
            <Navbar addTask={addTask} setAddTask={setAddTask} />
            {
                addTask ?
                    <AddTask setAddTask={setAddTask} getAllTask={getAllTask} />
                    :
               
                        <AllTask getAllTask={getAllTask} allTask={allTask} />
         
               
            }

        </div>
    )
}

export default Home;