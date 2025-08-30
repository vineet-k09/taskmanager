'use client'
import 'axios'
import axios from 'axios';
import { useEffect, useState } from 'react';

// const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`
const baseUrl = "http://localhost:8000/api/tasks/"

type Task = {
  id: number
  username: string
  task_name: string
  task_description: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[] | null>(null)

  useEffect(()=>{
    (async ()=>{
      const res = await axios.get<Task[]>(baseUrl,{withCredentials:true})
      setTasks(res.data)
    })()
  },[])

  return (
    <div className="min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className='grid grid-cols-2 gap-6'>
        {tasks &&
        tasks.map((t)=>{
          return <div key={t.id} className='border-white border-1 rounded-md p-2'>
            <h2>{t.task_name}</h2>
            <em>{t.username}</em>
            <p>{t.task_description}</p>
          </div>
        })
        }
      </div>
    </div>
  );
}
