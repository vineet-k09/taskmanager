'use client'
import axios from "axios";
import { useState } from "react";
import { useUser } from "../context/UserProvider";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`

export default function CreateTask() {
    const { user } = useUser()
    const [task, setTask] = useState({
        task_name: "",
        username: user?.username,
        task_description: ""
    })


    async function handleSubmit() {
        const res = await axios.post(baseUrl, task, { withCredentials: true })
        alert(res.data)
    }

    if (user == null || user?.username == "") return null

    return (
        <div className="flex flex-col">
            <main className="flex-grow flex items-center justify-center">
                <form action="POST" onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 p-4 min-w-2md rounded-md">
                    <h1 className="bold mx-auto text-2xl font-bold">Add more task?</h1>
                    <label className="flex justify-between items-center" htmlFor="task_name">
                        Task Name:
                        <input className="px-2 py-1" id="task_name" type="text"
                            value={task.task_name}
                            onChange={(e) => setTask({ ...task, task_name: e.target.value })} />
                    </label>
                    <label className="flex justify-between items-center" htmlFor="description">
                        Description:
                        <input className="px-2 py-1" type="text" id="description"
                            value={task.task_description}
                            onChange={(e) => setTask({ ...task, task_description: e.target.value })} />
                    </label>
                    <button type="submit" className="bg-emerald-800 py-2 px-3 my-2 rounded-md hover:bg-emerald-700">Add Task</button>
                </form>
            </main>
        </div>
    )
}