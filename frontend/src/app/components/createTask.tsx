// import { useEffect, useState } from "react";
// import {Task} from "../page";



// const baseUrl = "http://localhost:8000/api/tasks/"

export default function CreateTask(){
    // const [task, setTask] = useState<Task[]>()

    // useEffect(()=>{

    // })

    function handlePost(){

    }
    return(
        <div>
            <form action="POST">
                <label htmlFor="task_name">
                    Task Name: 
                    <input id="task_name" type="text" placeholder="Task Name" />
                </label>
                <label htmlFor="username">
                    Username: 
                    <input id="username" type="text" placeholder="Username" />
                </label>
                <label>
                    Task Description: 
                    <input type="text" placeholder="Description" />
                </label>
                <button onClick={()=>handlePost}>Add Task</button>
            </form>
        </div>
    )
}