import { useEffect, useState } from "react";
import Task from "./Task"
import { useSelector } from "react-redux";

function AllTasks({ getAllTask }) {

  const allTask = useSelector(state=>state.reducer.allTask);

  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrenTask] = useState([]);
  const [page, setPage] = useState(4);

  var limit = allTask?.length;

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      if (currentTask.length != allTask.length) {
        setPage(page + 3);
        setLoading(true)
  }}}

  useEffect(() => {
    setTimeout(() => {
      setCurrenTask(allTask?.slice(0, page));
      setLoading(false);
    }, [1500])

  }, [page])


useEffect(() => {
  setCurrenTask(allTask.slice(0, page));
}, [allTask])


return (
  <div className="tasks" onScroll={handleScroll}>

    {currentTask.length==0?
    <h4>Loading..</h4>:
      currentTask.map((task, index) => {
        return <Task getAllTask={getAllTask} task={task} index={index}/>
      })
    }
    {loading && <h4 style={{margin:"20px"}}>Loading .. </h4>}
  </div>
)
}

export default AllTasks;
