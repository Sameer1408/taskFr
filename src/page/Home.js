import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import AllTask from "../components/AllTask";
import AddTask from "../components/AddTask";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTask } from "../state/action-creators";
import { setUser } from "../state/action-creators";
import { useNavigate } from "react-router-dom";

function Home() {

    const dispatch = useDispatch();

    const [addTask, setAddTask] = useState(false);
    const [allTask, setAllTask] = useState([]);
    const navigate = useNavigate();


    const getAllTask = async () => {
        setTimeout(async () => {
            const jwtToken = localStorage.getItem('SavedToken');
            const response = await axios.get('https://task-xjzf.onrender.com/allTasks',
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
        }, [2000])
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('SavedToken');
        if (!jwtToken) {
            navigate('/login')
        }else{
            getAllTask();
            dispatch(setUser());
        }
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