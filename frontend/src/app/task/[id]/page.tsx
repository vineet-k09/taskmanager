"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import type { Task } from "@/app/page";

const baseUrl = "http://localhost:8000/api/tasks/";

export default function Task() {
    const params = useParams();
    const { id } = params as { id: string };
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            const res = await axios.get<Task>(`${baseUrl}${id}/`, { withCredentials: true });
            setTask(res.data);
        };
        if (id) {
            fetchTask();
        }
    }, [id]);

    return (
        <div className="h-[100vh] flex justify-center items-center">
            {task && <div className="max-w-[80%] bg-green-950 p-5 rounded-md">
            <h1>Task Details</h1>
            <p>Task ID: {task?.id}</p>
            <h2>{task.task_name}</h2>
            <code>{task.task_description}</code>
            </div>
        }
        </div >
    );
}