import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ addTask, setAddTask }) {
    const user = useSelector(state => state.reducer.user)
    const navigate = useNavigate();
    const [showWelcom, setShowWelcome] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowWelcome(false);
        }, 5000);
    })

    const handleLogOut = () => {
        localStorage.removeItem('SavedToken');
        navigate('/login');
    }
    console.log(user, "user")
    return (
        <div className="navbar">
            {showWelcom ?
                <h4>
                    Hello {user?.name},
                    welcome to task managment app
                </h4>
                :
                <>
                    <h4>Hello {user?.name} !</h4>
                    <div>
                        {
                            addTask ?
                                <button type="button" class="btn btn-danger" onClick={() => { setAddTask(false) }}>
                                    Cancel
                                </button> :
                                <button type="button" class="btn btn-danger" onClick={() => { setAddTask(true) }}>
                                    Add Task
                                </button>
                        }
                        <button type="button"
                            class="btn btn-outline-dark"
                            onClick={handleLogOut}
                        >Log out
                        </button>
                    </div>
                </>
            }

        </div>
    )
}

export default Navbar